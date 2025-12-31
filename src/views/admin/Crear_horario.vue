<template>
  <div class="crear-horario-wrapper">
    <HeaderApp />

    <main class="main-content">
      <!-- Sección XML Controls -->
      <section class="xml-controls">
        <h3>📄 Gestión de Horarios XML</h3>
        <div class="xml-buttons-row">
          <button class="xml-btn xml-btn-primary" @click="mostrarHorariosGuardados">
            📊 Mostrar Horarios Guardados
          </button>
          <button class="xml-btn xml-btn-primary" @click="descargarPDF">
            📄 Descargar PDF
          </button>
          <button class="xml-btn xml-btn-primary" @click="exportarXML">
            💾 Exportar XML (Backup)
          </button>
          <button class="xml-btn xml-btn-primary" @click="mostrarEstadisticas">
            📈 Ver Estadísticas
          </button>
          <button class="xml-btn xml-btn-danger" @click="limpiarTodo">
            🗑️ Limpiar Todo
          </button>
        </div>
        
        <!-- Mensaje de estado -->
        <div v-if="statusMessage.show" :class="['status-message', `status-${statusMessage.tipo}`]">
          {{ statusMessage.texto }}
        </div>

        <!-- Estadísticas -->
        <div v-if="mostrarStats" class="estadisticas">
          <h4>📊 Estadísticas del Sistema</h4>
          <p><strong>Total de Grupos:</strong> {{ stats.totalGrupos }}</p>
          <p><strong>Total de Horarios:</strong> {{ stats.totalHorarios }}</p>
          <p><strong>Docentes registrados:</strong> {{ stats.totalDocentes }}</p>
          <p><strong>Materias disponibles:</strong> {{ stats.totalMaterias }}</p>
          <hr>
          <h5>Horarios por día (todos los grupos):</h5>
          <p>Lunes: {{ stats.horariosPorDia.lunes }}</p>
          <p>Martes: {{ stats.horariosPorDia.martes }}</p>
          <p>Miércoles: {{ stats.horariosPorDia.miercoles }}</p>
          <p>Jueves: {{ stats.horariosPorDia.jueves }}</p>
          <p>Viernes: {{ stats.horariosPorDia.viernes }}</p>
        </div>
      </section>

      <!-- Sección Crear Horario -->
      <section class="create-schedule-section">
        <h2>Crear nuevos horarios</h2>
        
        <div class="form-container">
          <div class="form-row">
            <label>Seleccione al docente:</label>
            <select v-model="formData.docente" class="form-select">
              <option value="">-- Seleccione --</option>
              <option v-for="doc in docentes" :key="doc.id" :value="doc.id">
                {{ doc.nombre }}
              </option>
            </select>
          </div>

          <div class="form-row">
            <label>Seleccione la materia:</label>
            <select v-model="formData.materia" class="form-select">
              <option value="">-- Seleccione --</option>
              <option v-for="mat in materias" :key="mat.id" :value="mat.id">
                {{ mat.nombre }} ({{ mat.codigo }})
              </option>
            </select>
          </div>

          <div class="form-row">
            <label>Seleccione la especialidad:</label>
            <select v-model="formData.especialidad" class="form-select">
              <option value="">-- Seleccione --</option>
              <option value="Tecnología de la Información">Tecnología de la Información</option>
              <option value="Ingeniería de Software">Ingeniería de Software</option>
            </select>
          </div>

          <div class="form-row">
            <label>Seleccione el paralelo:</label>
            <select v-model="formData.paralelo" class="form-select">
              <option value="">-- Seleccione --</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>

          <div class="form-row">
            <label>Seleccione el curso:</label>
            <select v-model="formData.curso" class="form-select">
              <option value="">-- Seleccione --</option>
              <option value="101">101</option>
              <option value="102">102</option>
              <option value="201">201</option>
              <option value="202">202</option>
              <option value="301">301</option>
              <option value="302">302</option>
            </select>
          </div>

          <div class="form-row">
            <label>Seleccione el semestre:</label>
            <select v-model="formData.semestre" class="form-select">
              <option value="">-- Seleccione --</option>
              <option value="Primer semestre">Primer semestre</option>
              <option value="Segundo semestre">Segundo semestre</option>
              <option value="Tercer semestre">Tercer semestre</option>
              <option value="Cuarto semestre">Cuarto semestre</option>
              <option value="Quinto semestre">Quinto semestre</option>
              <option value="Sexto semestre">Sexto semestre</option>
              <option value="Septimo semestre">Septimo semestre</option>
              <option value="Octavo semestre">Octavo semestre</option>
            </select>
          </div>

          <div class="form-row">
            <label>Seleccione la hora:</label>
            <select v-model="formData.hora" class="form-select">
              <option value="">-- Seleccione --</option>
              <option value="08:00-09:00">08:00 - 09:00</option>
              <option value="09:00-10:00">09:00 - 10:00</option>
              <option value="10:00-11:00">10:00 - 11:00</option>
              <option value="11:00-12:00">11:00 - 12:00</option>
              <option value="13:00-14:00">13:00 - 14:00</option>
              <option value="14:00-15:00">14:00 - 15:00</option>
              <option value="15:00-16:00">15:00 - 16:00</option>
              <option value="16:00-17:00">16:00 - 17:00</option>
              <option value="17:00-18:00">17:00 - 18:00</option>
              <option value="18:00-19:00">18:00 - 19:00</option>
              <option value="19:00-20:00">19:00 - 20:00</option>
            </select>
          </div>

          <div class="form-row">
            <label>Seleccione el día:</label>
            <select v-model="formData.dia" class="form-select">
              <option value="">-- Seleccione --</option>
              <option value="lunes">LUNES</option>
              <option value="martes">MARTES</option>
              <option value="miercoles">MIERCOLES</option>
              <option value="jueves">JUEVES</option>
              <option value="viernes">VIERNES</option>
            </select>
          </div>

          <div class="form-buttons">
            <button class="btn-action" @click="guardarYVolver">GUARDAR</button>
            <button class="btn-action btn-add" @click="ingresarHorario">INGRESAR</button>
          </div>
        </div>
      </section>

      <!-- Tabla de horario -->
      <section class="calendar-section">
        <div class="calendar-container">
          <table class="schedule-table">
            <thead>
              <tr>
                <th>HORA</th>
                <th>LUNES</th>
                <th>MARTES</th>
                <th>MIERCOLES</th>
                <th>JUEVES</th>
                <th>VIERNES</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(slot, index) in timeSlots" :key="index">
                <td class="time-cell">{{ slot }}</td>
                <td v-for="dia in dias" :key="`${dia}-${slot}`" 
                    :class="getCellClass(dia, slot)"
                    @click="handleCellClick(dia, slot)">
                  <small v-if="getCellContent(dia, slot)" v-html="getCellContent(dia, slot)"></small>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import HeaderApp from '@/components/HeaderApp.vue'
import xmlManager from '@/utils/manejadorXML'

const router = useRouter()

// Inicializar el manager
xmlManager.inicializar()

const docentes = ref(xmlManager.obtenerDocentes())
const materias = ref(xmlManager.obtenerMaterias())

const formData = ref({
  docente: '',
  materia: '',
  especialidad: '',
  paralelo: '',
  curso: '',
  semestre: '',
  hora: '',
  dia: ''
})

const statusMessage = ref({
  show: false,
  texto: '',
  tipo: 'info'
})

const mostrarStats = ref(false)
const stats = ref({
  totalGrupos: 0,
  totalHorarios: 0,
  totalDocentes: 0,
  totalMaterias: 0,
  horariosPorDia: {
    lunes: 0,
    martes: 0,
    miercoles: 0,
    jueves: 0,
    viernes: 0
  }
})

// Horarios temporales visibles en la tabla (solo para esta sesión)
const horariosTemporales = ref([])

const timeSlots = [
  '08:00 - 09:00',
  '09:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '13:00 - 14:00',
  '14:00 - 15:00',
  '15:00 - 16:00',
  '16:00 - 17:00',
  '17:00 - 18:00',
  '18:00 - 19:00',
  '19:00 - 20:00'
]

const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes']

// Funciones de utilidad
const mostrarEstado = (texto, tipo = 'info') => {
  statusMessage.value = {
    show: true,
    texto,
    tipo
  }
  
  setTimeout(() => {
    statusMessage.value.show = false
  }, 4000)
}

const limpiarFormulario = () => {
  formData.value = {
    docente: '',
    materia: '',
    especialidad: '',
    paralelo: '',
    curso: '',
    semestre: '',
    hora: '',
    dia: ''
  }
}

const getDocenteNombre = (id) => {
  const doc = docentes.value.find(d => d.id === id)
  return doc ? doc.nombre : ''
}

const getMateriaNombre = (id) => {
  const mat = materias.value.find(m => m.id === id)
  return mat ? mat.nombre : ''
}

// Convertir slot a franja horaria
const slotToFranja = (slot) => {
  return slot.replace(/\s/g, '').replace('-', '-')
}

// Funciones de la tabla - SOLO MUESTRAN horariosTemporales
const getCellClass = (dia, slot) => {
  const franjaHoraria = slotToFranja(slot)
  const horario = horariosTemporales.value.find(h => 
    h.dia === dia && h.franjaHoraria === franjaHoraria
  )
  return horario ? 'class-cell' : 'empty-cell'
}

const getCellContent = (dia, slot) => {
  const franjaHoraria = slotToFranja(slot)
  const horario = horariosTemporales.value.find(h => 
    h.dia === dia && h.franjaHoraria === franjaHoraria
  )
  
  if (horario) {
    return `
      ${horario.docenteNombre}<br>
      ${horario.materiaNombre}<br>
      ${horario.especialidad}<br>
      ${horario.semestre} "${horario.paralelo}"<br>
      ${horario.curso}
    `
  }
  return null
}

const handleCellClick = (dia, slot) => {
  const franjaHoraria = slotToFranja(slot)
  const horario = horariosTemporales.value.find(h => 
    h.dia === dia && h.franjaHoraria === franjaHoraria
  )
  
  if (horario) {
    if (confirm('¿Desea eliminar esta clase del horario temporal?')) {
      const index = horariosTemporales.value.findIndex(h => 
        h.dia === dia && h.franjaHoraria === franjaHoraria
      )
      if (index !== -1) {
        horariosTemporales.value.splice(index, 1)
        mostrarEstado('🗑️ Horario temporal eliminado', 'success')
      }
    }
  }
}

// Funciones principales
const ingresarHorario = () => {
  console.log('Intentando ingresar horario...', formData.value)
  
  // Validaciones
  if (!formData.value.docente) {
    mostrarEstado('⚠️ Por favor seleccione un docente', 'error')
    return
  }
  if (!formData.value.materia) {
    mostrarEstado('⚠️ Por favor seleccione una materia', 'error')
    return
  }
  if (!formData.value.hora) {
    mostrarEstado('⚠️ Por favor seleccione una hora', 'error')
    return
  }
  if (!formData.value.dia) {
    mostrarEstado('⚠️ Por favor seleccione un día', 'error')
    return
  }

  const franjaHoraria = formData.value.hora

  // Verificar si ya existe en la tabla temporal (sesión actual)
  const existeEnTemporal = horariosTemporales.value.some(h => 
    h.dia === formData.value.dia && h.franjaHoraria === franjaHoraria
  )
  
  if (existeEnTemporal) {
    mostrarEstado('⚠️ Ya existe un horario en esta celda. Elimínelo primero.', 'error')
    return
  }

  // Preparar datos
  const [horaInicio, horaFin] = formData.value.hora.split('-')
  const datosClase = {
    docenteId: formData.value.docente,
    docenteNombre: getDocenteNombre(formData.value.docente),
    materiaId: formData.value.materia,
    materiaNombre: getMateriaNombre(formData.value.materia),
    especialidad: formData.value.especialidad || 'Sin especificar',
    semestre: formData.value.semestre || 'Sin especificar',
    paralelo: formData.value.paralelo || '-',
    curso: formData.value.curso || 'Sin asignar',
    dia: formData.value.dia,
    horaInicio,
    horaFin,
    franjaHoraria: formData.value.hora
  }

  console.log('Datos a agregar temporalmente:', datosClase)

  // Agregar a la tabla temporal (solo visual)
  horariosTemporales.value.push(datosClase)
  
  mostrarEstado(`✅ Horario ingresado en la tabla temporal`, 'success')
  limpiarFormulario()
}

const guardarYVolver = () => {
  if (horariosTemporales.value.length === 0) {
    mostrarEstado('⚠️ No hay horarios para guardar', 'error')
    return
  }
  
  // Solicitar nombre para el grupo
  const nombreGrupo = prompt(
    `Ingrese un nombre para este grupo de horarios (${horariosTemporales.value.length} clases):`, 
    `Grupo ${xmlManager.obtenerGrupos().length + 1}`
  )
  
  if (!nombreGrupo || nombreGrupo.trim() === '') {
    mostrarEstado('⚠️ Debe ingresar un nombre para el grupo', 'error')
    return
  }
  
  // Guardar como grupo en el xmlManager
  xmlManager.agregarGrupoHorarios(nombreGrupo.trim(), horariosTemporales.value)
  
  mostrarEstado(`✅ Grupo "${nombreGrupo}" guardado con ${horariosTemporales.value.length} horario(s)`, 'success')
  
  setTimeout(() => {
    router.push('/admin')
  }, 1000)
}

const mostrarHorariosGuardados = () => {
  const grupos = xmlManager.obtenerGrupos()
  
  if (grupos.length === 0) {
    mostrarEstado('ℹ️ No hay grupos de horarios guardados', 'info')
    return
  }
  
  console.log('Grupos cargados desde localStorage:', grupos)
  
  // Crear mensaje con lista de grupos
  let mensaje = `📚 Tiene ${grupos.length} grupo(s) de horarios guardados:\n\n`
  
  grupos.forEach((grupo, index) => {
    const fecha = new Date(grupo.fechaCreacion).toLocaleDateString()
    mensaje += `${index + 1}. "${grupo.nombre}" - ${grupo.horarios.length} clase(s) - ${fecha}\n`
  })
  
  mensaje += '\n📋 Ingrese el número del grupo que desea ver\n'
  mensaje += '(o escriba "cancelar")'
  
  const seleccion = prompt(mensaje)
  
  if (!seleccion || seleccion.toLowerCase() === 'cancelar') {
    return
  }
  
  const numSeleccion = parseInt(seleccion) - 1
  
  if (numSeleccion >= 0 && numSeleccion < grupos.length) {
    const grupo = grupos[numSeleccion]
    
    // Cargar horarios del grupo en la tabla
    horariosTemporales.value = [...grupo.horarios]
    
    mostrarEstado(`📊 Grupo "${grupo.nombre}" cargado: ${grupo.horarios.length} clase(s)`, 'success')
  } else {
    mostrarEstado('⚠️ Número no válido', 'error')
  }
}

const exportarXML = () => {
  const grupos = xmlManager.obtenerGrupos()
  
  if (grupos.length === 0) {
    mostrarEstado('⚠️ No hay grupos para exportar', 'error')
    return
  }
  
  let mensaje = `📚 Seleccione qué exportar:\n\n`
  mensaje += `0. TODOS LOS GRUPOS (${grupos.length} grupos)\n\n`
  
  grupos.forEach((grupo, index) => {
    mensaje += `${index + 1}. "${grupo.nombre}" - ${grupo.horarios.length} clase(s)\n`
  })
  
  mensaje += '\n(Escriba el número o "cancelar")'
  
  const seleccion = prompt(mensaje)
  
  if (!seleccion || seleccion.toLowerCase() === 'cancelar') {
    return
  }
  
  const num = parseInt(seleccion)
  
  if (num === 0) {
    // Exportar todos
    xmlManager.descargarXML()
    mostrarEstado('💾 XML con todos los grupos descargado', 'success')
  } else if (num >= 1 && num <= grupos.length) {
    // Exportar grupo específico
    xmlManager.descargarXML(`horarios_${grupos[num - 1].nombre.replace(/\s+/g, '_')}.xml`, num - 1)
    mostrarEstado(`💾 XML del grupo "${grupos[num - 1].nombre}" descargado`, 'success')
  } else {
    mostrarEstado('⚠️ Número no válido', 'error')
  }
}

const mostrarEstadisticas = () => {
  stats.value = xmlManager.obtenerEstadisticas()
  mostrarStats.value = true
  mostrarEstado('📈 Estadísticas actualizadas', 'info')
}

const limpiarTodo = () => {
  const grupos = xmlManager.obtenerGrupos()
  
  if (grupos.length === 0) {
    mostrarEstado('ℹ️ No hay grupos para eliminar', 'info')
    return
  }
  
  let mensaje = `⚠️ Tiene ${grupos.length} grupo(s) guardado(s):\n\n`
  
  grupos.forEach((grupo, index) => {
    mensaje += `${index + 1}. "${grupo.nombre}" - ${grupo.horarios.length} clase(s)\n`
  })
  
  mensaje += `\n📋 Opciones:\n`
  mensaje += `0 - Eliminar TODOS los grupos\n`
  mensaje += `1-${grupos.length} - Eliminar grupo específico\n`
  mensaje += `\n(Escriba el número o "cancelar")`
  
  const confirmacion = prompt(mensaje)
  
  if (!confirmacion || confirmacion.toLowerCase() === 'cancelar') {
    return
  }
  
  const num = parseInt(confirmacion)
  
  if (num === 0) {
    if (confirm('¿CONFIRMA eliminar TODOS los grupos? No se puede deshacer')) {
      xmlManager.limpiarTodosLosGrupos()
      horariosTemporales.value = []
      mostrarEstado('🗑️ Todos los grupos eliminados', 'success')
    }
  } else if (num >= 1 && num <= grupos.length) {
    const grupo = grupos[num - 1]
    if (confirm(`¿Eliminar el grupo "${grupo.nombre}" con ${grupo.horarios.length} clase(s)?`)) {
      xmlManager.eliminarGrupo(num - 1)
      
      // Si el grupo eliminado está en la tabla, limpiarla
      if (horariosTemporales.value.length > 0) {
        const primerHorario = horariosTemporales.value[0]
        const esGrupoActual = grupo.horarios.some(h => 
          h.dia === primerHorario.dia && 
          h.franjaHoraria === primerHorario.franjaHoraria
        )
        if (esGrupoActual) {
          horariosTemporales.value = []
        }
      }
      
      mostrarEstado(`🗑️ Grupo "${grupo.nombre}" eliminado`, 'success')
    }
  } else {
    mostrarEstado('⚠️ Número no válido', 'error')
  }
}

const descargarPDF = () => {
  window.print()
  mostrarEstado('📄 Abriendo vista de impresión/PDF', 'info')
}
</script>

<style scoped>
/* Wrapper */
.crear-horario-wrapper {
    min-height: 100vh;
    background: #f5f5f5;
    display: flex;
    flex-direction: column;
}

/* Main Content */
.main-content {
    padding: 30px;
    overflow-y: auto;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    flex: 1;
}

/* Sección de gestión XML */
.xml-controls {
    background: #e8f4f8;
    padding: 20px 25px;
    margin: 20px auto;
    border-radius: 10px;
    border: 2px solid #4a90e2;
    max-width: 1200px;
}

.xml-controls h3 {
    margin: 0 0 15px 0;
    color: #2c5aa0;
    font-size: 18px;
    font-weight: 600;
}

/* Botones XML en fila horizontal */
.xml-buttons-row {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.xml-btn {
    padding: 10px 18px;
    border: none;
    border-radius: 6px;
    cursor: pointer !important;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;
    pointer-events: auto !important;
    display: inline-block;
    color: white;
}

.xml-btn-primary {
    background: #4a90e2;
}

.xml-btn-primary:hover {
    background: #357abd;
}

.xml-btn-danger {
    background: #dc3545;
}

.xml-btn-danger:hover {
    background: #c82333;
}

/* Mensaje de estado */
.status-message {
    margin-top: 15px;
    padding: 12px;
    border-radius: 5px;
    font-weight: 500;
}

.status-info {
    background: #d1ecf1;
    color: #0c5460;
    border: 1px solid #bee5eb;
}

.status-success {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}

.status-error {
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}

/* Estadísticas */
.estadisticas {
    margin-top: 20px;
    padding: 15px;
    background: white;
    border-radius: 8px;
    border: 1px solid #ccc;
}

.estadisticas h4, .estadisticas h5 {
    margin: 10px 0;
    color: #333;
}

.estadisticas p {
    margin: 5px 0;
}

.estadisticas hr {
    margin: 15px 0;
    border: none;
    border-top: 1px solid #ddd;
}

/* Sección de crear horario */
.create-schedule-section {
    background: white;
    padding: 25px 30px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    max-width: 1200px;
    margin: 25px auto;
}

.create-schedule-section h2 {
    font-size: 20px;
    color: #333;
    margin-bottom: 20px;
    font-weight: 600;
}

/* Formulario más compacto, todo en línea */
.form-container {
    display: block;
    margin: 0;
}

.form-row {
    display: block;
    margin-bottom: 8px;
    font-size: 15px;
    color: #333;
}

.form-row label {
    display: inline;
    font-weight: normal;
    margin-right: 5px;
}

.form-select {
    display: inline-block;
    padding: 4px 8px;
    border: 1px solid #999;
    border-radius: 3px;
    font-size: 14px;
    background: white;
    cursor: pointer;
    min-width: 150px;
}

.form-select:focus {
    outline: none;
    border-color: #4a90e2;
}

/* Botones GUARDAR e INGRESAR */
.form-buttons {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 15px;
    width: 120px;
}

.btn-action {
    padding: 8px 20px;
    border: 1px solid #999;
    border-radius: 3px;
    font-size: 13px;
    font-weight: normal;
    cursor: pointer !important;
    transition: all 0.2s ease;
    pointer-events: auto !important;
    background: white;
    color: #333;
    text-align: center;
}

.btn-action:hover {
    background: #f0f0f0;
}

.btn-add {
    background: white;
    border: 1px solid #999;
}

.btn-add:hover {
    background: #f0f0f0;
}

/* Tabla de horario */
.calendar-section {
    background: white;
    padding: 0;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    max-width: 1200px;
    margin: 25px auto;
    overflow: hidden;
}

.calendar-container {
    overflow-x: auto;
    padding: 20px;
}

.schedule-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    font-size: 13px;
}

.schedule-table thead {
    background: #f8f9fa;
}

.schedule-table th {
    padding: 10px;
    text-align: center;
    font-weight: 600;
    border: 1px solid #dee2e6;
    color: #333;
    font-size: 13px;
}

.schedule-table td {
    padding: 12px 8px;
    text-align: center;
    border: 1px solid #dee2e6;
    min-height: 45px;
    font-size: 13px;
}

.time-cell {
    background: #f8f9fa;
    font-weight: normal;
    color: #333;
    white-space: nowrap;
}

.class-cell {
    background: white;
    cursor: pointer;
    transition: all 0.3s;
    color: #333;
}

.class-cell:hover {
    background: #667eea;
    color: white;
}

.empty-cell {
    background: white;
}

/* ESTILOS PARA IMPRESIÓN/PDF */
@media print {
  /* Ocultar todo excepto la tabla */
  .xml-controls,
  .create-schedule-section,
  .header,
  button {
    display: none !important;
  }

  /* Mostrar solo la tabla del horario */
  .calendar-section {
    margin: 0;
    padding: 0;
    box-shadow: none;
    page-break-inside: avoid;
  }

  .calendar-container {
    padding: 10px;
  }

  /* Ajustar tamaño de la tabla para que quepa en una página */
  .schedule-table {
    width: 100%;
    font-size: 10px;
  }

  .schedule-table th,
  .schedule-table td {
    padding: 8px 4px;
    border: 1px solid #000;
  }

  .time-cell {
    background: #f0f0f0 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .class-cell {
    background: white !important;
  }

  /* Ajustar el tamaño de página */
  @page {
    size: landscape;
    margin: 1cm;
  }

  /* Título para el PDF */
  .calendar-section::before {
    content: "Horario ULEAM";
    display: block;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
  }
}
</style>