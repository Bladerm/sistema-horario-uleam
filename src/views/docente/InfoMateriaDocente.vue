<template>
  <div class="materia-docente-wrapper">
    <HeaderApp />

    <main class="main-content">
      <section class="subject-info-section">
        <div v-if="cargando">Cargando...</div>
        
        <div v-else-if="!materia">
          <h2 class="subject-title">No se encontró información de la materia</h2>
          <button class="btn-calendar" @click="volverCalendario">Volver al calendario</button>
        </div>

        <div v-else>
          <h2 class="subject-title">{{ materia.nombre }}</h2>
          
          <div class="info-card">
            <div class="info-row">
              <span class="info-label">Aulas:</span>
              <span class="info-value">{{ materia.aulas }}</span>
            </div>

            <div class="info-row">
              <span class="info-label">Alumnos:</span>
              <span class="info-value">{{ materia.alumnos }}</span>
            </div>

            <div class="info-row">
              <span class="info-label">Semestre:</span>
              <span class="info-value">{{ materia.semestre }}</span>
            </div>

            <div class="info-row" style="border-bottom: none;">
              <button class="btn-calendar" @click="volverCalendario">Ver calendario</button>
              <button class="btn-calendar" @click="descargarLista" style="background: #d0d0d0;">Descargar lista</button>
              <button class="btn-calendar btn-danger" @click="informarProblema">Informar problema</button>
            </div>
          </div>

          <!-- Sección de Estudiantes -->
          <div class="professor-section">
            <div class="professor-header">
              <h3>Estudiantes</h3>
              <span class="total-badge">{{ materia.estudiantes.length }}<br>Total</span>
            </div>
            
            <div 
              v-for="(estudiante, index) in materia.estudiantes" 
              :key="index"
              class="professor-card"
            >
              <p class="professor-name">{{ estudiante.nombre }}</p>
              <div class="professor-contacts">
                <a :href="`mailto:${estudiante.email}`" class="contact-link">{{ estudiante.email }}</a>
              </div>
            </div>
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

const router = useRouter()
const authStore = useAuthStore()

if (authStore.tipoUsuario !== 'docente') {
  router.push('/login')
}

const cargando = ref(true)
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
  } finally {
    cargando.value = false
  }
}

const volverCalendario = () => {
  router.push('/docente')
}

const descargarLista = () => {
  router.push('/docente/descargar-lista')
}

const informarProblema = () => {
  router.push('/docente/informar-problema')
}
</script>

<style scoped>
.materia-docente-wrapper {
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

.subject-info-section {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    max-width: 800px;
    margin: 0 auto;
}

.subject-title {
    font-size: 18px;
    color: #333;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid #e0e0e0;
    font-weight: 600;
}

.info-card {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 25px;
}

.info-row {
    display: flex;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #e0e0e0;
    gap: 15px;
}

.info-row:last-child {
    border-bottom: none;
}

.info-label {
    font-weight: 600;
    color: #333;
    min-width: 100px;
}

.info-value {
    flex: 1;
    color: #555;
    font-size: 14px;
}

.btn-calendar {
    padding: 8px 20px;
    background: #d0d0d0;
    color: #333;
    border: none;
    border-radius: 5px;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.3s;
    white-space: nowrap;
    margin-right: 10px;
}

.btn-calendar:hover {
    background: #b8b8b8;
    transform: translateY(-2px);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
}

.btn-danger {
    background: #e74c3c;
    color: white;
}

.btn-danger:hover {
    background: #c0392b;
}

.professor-section {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
}

.professor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.professor-header h3 {
    font-size: 16px;
    color: #333;
    font-weight: 600;
}

.total-badge {
    background: white;
    padding: 8px 15px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 600;
    color: #333;
    text-align: center;
    line-height: 1.3;
}

.professor-card {
    background: white;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 10px;
}

.professor-card:last-child {
    margin-bottom: 0;
}

.professor-name {
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
    font-size: 14px;
}

.professor-contacts {
    font-size: 13px;
    color: #667eea;
}

.contact-link {
    color: #667eea;
    text-decoration: none;
    transition: color 0.3s;
}

.contact-link:hover {
    color: #764ba2;
    text-decoration: underline;
}
</style>