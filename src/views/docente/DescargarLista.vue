<template>
  <div class="descargar-lista-wrapper">
    <HeaderApp />
    
    <main class="main-content">
      <section class="report-section">
        <h2>Descargar lista de estudiantes</h2>
        
        <div v-if="materia" class="materia-info">
          <p><strong>Materia:</strong> {{ materia.nombre }}</p>
          <p><strong>Total de estudiantes:</strong> {{ materia.estudiantes.length }}</p>
        </div>
        
        <div class="report-form">
          <!-- Sección de selección de formato -->
          <div class="format-section">
            <h3>Seleccione el tipo de documento:</h3>
            <select class="form-input" v-model="tipoDocumento">
              <option value="">-- Seleccione una opción --</option>
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
            </select>
          </div>

          <!-- Vista previa de estudiantes -->
          <div v-if="materia && materia.estudiantes.length > 0" class="preview-section">
            <h3>Vista previa de estudiantes:</h3>
            <div class="estudiantes-preview">
              <div v-for="(estudiante, index) in materia.estudiantes.slice(0, 3)" :key="index" class="estudiante-item">
                {{ index + 1 }}. {{ estudiante.nombre }} - {{ estudiante.email }}
              </div>
              <p v-if="materia.estudiantes.length > 3" class="more-students">
                ... y {{ materia.estudiantes.length - 3 }} estudiantes más
              </p>
            </div>
          </div>

          <!-- Botones de descargar y cancelar -->
          <div class="button-group">
            <button class="btn-primary" @click="descargar" :disabled="!tipoDocumento">
              Descargar {{ tipoDocumento.toUpperCase() }}
            </button>
            <button class="btn-secondary" @click="cancelar">Cancelar</button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HeaderApp from '@/components/HeaderApp.vue'
import materiasDocenteData from '@/data/info_materia_docen.json'

// Cargar jsPDF y jspdf-autotable desde CDN
const cargarJsPDF = () => {
  return new Promise((resolve, reject) => {
    if (window.jspdf) {
      resolve()
      return
    }
    
    const script1 = document.createElement('script')
    script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
    script1.onload = () => {
      const script2 = document.createElement('script')
      script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js'
      script2.onload = () => resolve()
      script2.onerror = () => reject(new Error('Error al cargar jspdf-autotable'))
      document.head.appendChild(script2)
    }
    script1.onerror = () => reject(new Error('Error al cargar jsPDF'))
    document.head.appendChild(script1)
  })
}

const router = useRouter()
const authStore = useAuthStore()

if (authStore.tipoUsuario !== 'docente') {
  router.push('/login')
}

const tipoDocumento = ref('')
const materia = ref(null)

onMounted(() => {
  cargarInfoMateria()
})

const cargarInfoMateria = () => {
  try {
    const materiaActual = JSON.parse(localStorage.getItem('materiaDocenteActual'))
    
    if (materiaActual && materiasDocenteData.materias[materiaActual.nombre]) {
      materia.value = materiasDocenteData.materias[materiaActual.nombre]
    }
  } catch (error) {
    console.error('Error al cargar la materia:', error)
  }
}

const descargar = () => {
  if (tipoDocumento.value === '') {
    alert('Por favor, seleccione un tipo de documento')
    return
  }

  if (!materia.value) {
    alert('No se encontró información de la materia')
    return
  }

  if (tipoDocumento.value === 'pdf') {
    descargarPDF()
  } else if (tipoDocumento.value === 'excel') {
    descargarExcel()
  }
}

const descargarPDF = async () => {
  try {
    // Cargar jsPDF si no está disponible
    await cargarJsPDF()
    
    const { jsPDF } = window.jspdf
    const doc = new jsPDF()
    
    // Título principal
    doc.setFontSize(18)
    doc.setFont(undefined, 'bold')
    doc.text('LISTA DE ESTUDIANTES', 105, 20, { align: 'center' })
    
    // Línea separadora
    doc.setLineWidth(0.5)
    doc.line(20, 25, 190, 25)
    
    // Información de la materia
    doc.setFontSize(11)
    doc.setFont(undefined, 'normal')
    let yPos = 35
    
    doc.setFont(undefined, 'bold')
    doc.text('Materia:', 20, yPos)
    doc.setFont(undefined, 'normal')
    doc.text(materia.value.nombre, 50, yPos)
    
    yPos += 7
    doc.setFont(undefined, 'bold')
    doc.text('Aulas:', 20, yPos)
    doc.setFont(undefined, 'normal')
    doc.text(materia.value.aulas, 50, yPos)
    
    yPos += 7
    doc.setFont(undefined, 'bold')
    doc.text('Semestre:', 20, yPos)
    doc.setFont(undefined, 'normal')
    doc.text(materia.value.semestre, 50, yPos)
    
    yPos += 7
    doc.setFont(undefined, 'bold')
    doc.text('Total de alumnos:', 20, yPos)
    doc.setFont(undefined, 'normal')
    doc.text(String(materia.value.alumnos), 50, yPos)
    
    yPos += 7
    doc.setFont(undefined, 'bold')
    doc.text('Fecha:', 20, yPos)
    doc.setFont(undefined, 'normal')
    doc.text(new Date().toLocaleDateString(), 50, yPos)
    
    // Tabla de estudiantes
    const tableData = materia.value.estudiantes.map((estudiante, index) => [
      index + 1,
      estudiante.nombre,
      estudiante.email
    ])
    
    doc.autoTable({
      startY: yPos + 10,
      head: [['No.', 'Nombre', 'Email']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [102, 126, 234],
        textColor: 255,
        fontStyle: 'bold',
        halign: 'center'
      },
      columnStyles: {
        0: { cellWidth: 15, halign: 'center' },
        1: { cellWidth: 80 },
        2: { cellWidth: 85 }
      },
      styles: {
        fontSize: 10,
        cellPadding: 5
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      }
    })
    
    // Guardar el PDF
    doc.save(`Lista_${materia.value.nombre.replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`)
    
    alert('Lista descargada exitosamente en formato PDF')
    router.push('/docente/materia')
  } catch (error) {
    console.error('Error al descargar PDF:', error)
    alert('Error al descargar el archivo PDF: ' + error.message)
  }
}

const descargarExcel = () => {
  try {
    // Crear contenido CSV
    let csv = '\ufeff' // BOM para UTF-8
    csv += 'LISTA DE ESTUDIANTES\n\n'
    csv += `Materia:,${materia.value.nombre}\n`
    csv += `Aulas:,${materia.value.aulas}\n`
    csv += `Semestre:,${materia.value.semestre}\n`
    csv += `Total de alumnos:,${materia.value.alumnos}\n`
    csv += `Fecha:,${new Date().toLocaleDateString()}\n\n`
    
    csv += 'No.,Nombre,Email\n'
    
    materia.value.estudiantes.forEach((estudiante, index) => {
      csv += `${index + 1},"${estudiante.nombre}","${estudiante.email}"\n`
    })

    // Crear blob y descargar
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `Lista_${materia.value.nombre.replace(/\s+/g, '_')}_${new Date().getTime()}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)

    alert('Lista descargada exitosamente en formato Excel (CSV)')
    router.push('/docente/materia')
  } catch (error) {
    console.error('Error al descargar Excel:', error)
    alert('Error al descargar el archivo')
  }
}

const cancelar = () => {
  const confirmar = confirm('¿Seguro que desea cancelar?')
  if (confirmar) {
    router.push('/docente/materia')
  }
}
</script>

<style scoped>
.descargar-lista-wrapper {
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.main-content {
  padding: 30px;
  overflow-y: auto;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  flex: 1;
}

.report-section {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  max-width: 700px;
  margin: 0 auto;
}

.report-section h2 {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: left;
}

.materia-info {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 25px;
  border-left: 4px solid #667eea;
}

.materia-info p {
  margin: 8px 0;
  color: #555;
  font-size: 14px;
}

.materia-info strong {
  color: #333;
}

.report-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.format-section {
  margin-top: 10px;
}

.format-section h3 {
  font-size: 16px;
  color: #666;
  margin-bottom: 15px;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 10px 15px;
  border: 2px solid #d0d0d0;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  transition: all 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
}

.preview-section {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

.preview-section h3 {
  font-size: 15px;
  color: #666;
  margin-bottom: 15px;
  font-weight: 500;
}

.estudiantes-preview {
  background: white;
  padding: 15px;
  border-radius: 6px;
  max-height: 200px;
  overflow-y: auto;
}

.estudiante-item {
  padding: 8px 0;
  border-bottom: 1px solid #e0e0e0;
  font-size: 14px;
  color: #555;
}

.estudiante-item:last-child {
  border-bottom: none;
}

.more-students {
  padding-top: 10px;
  color: #667eea;
  font-style: italic;
  font-size: 13px;
  text-align: center;
}

.button-group {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 20px;
}

.btn-primary,
.btn-secondary {
  padding: 12px 40px;
  border: none;
  border-radius: 25px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: #667eea;
  color: white;
  border: 2px solid #667eea;
}

.btn-primary:hover:not(:disabled) {
  background: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-primary:disabled {
  background: #d0d0d0;
  border-color: #d0d0d0;
  cursor: not-allowed;
  opacity: 0.6;
}

.btn-secondary {
  background: white;
  color: #333;
  border: 2px solid #d0d0d0;
}

.btn-secondary:hover {
  background: #f5f5f5;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>