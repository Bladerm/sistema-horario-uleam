<template>
  <div class="materia-info-wrapper">
    <HeaderApp />

    <main class="main-content">
      <section class="subject-info-section">
        <!-- Mostrar mientras se carga la información -->
        <div v-if="cargando">Cargando...</div>
        
        <!-- Mostrar si no se encuentra la materia -->
        <div v-else-if="!materia">
          <h2 class="subject-title">No se encontró información de la materia</h2>
          <button class="btn-calendar" @click="volverCalendario">Volver al calendario</button>
        </div>

        <!-- Mostrar cuando la materia se carga correctamente -->
        <div v-else>
          <h2 class="subject-title">{{ materia.nombre }}</h2>
          
          <!-- Contiene todos los datos básicos de la materia -->
          <div class="info-card">
            <div class="info-row">
              <span class="info-label">Aulas:</span>
              <span class="info-value">{{ materia.aulas }}</span>
            </div>

            <div class="info-row">
              <span class="info-label">Horario:</span>
              <span class="info-value">{{ materia.horario }}</span>
              <button class="btn-calendar" @click="volverCalendario">Ver calendario</button>
            </div>

            <div class="info-row">
              <span class="info-label">Alumnos:</span>
              <span class="info-value">{{ materia.alumnos }}</span>
            </div>

            <div class="info-row">
              <span class="info-label">Semestre:</span>
              <span class="info-value">{{ materia.semestre }}</span>
            </div>

            <div class="info-row">
              <span class="info-label">Paralelo:</span>
              <span class="info-value">{{ materia.paralelo }}</span>
            </div>
          </div>

          <!-- Lista de todos los profesores que imparten la materia -->
          <div class="professor-section">
            <div class="professor-header">
              <h3>Profesor a cargo</h3>
              <span class="total-badge">{{ materia.profesores.length }}<br>Total</span>
            </div>
            
            <!-- v-for crea una tarjeta por cada profesor en el array -->
            <div
              v-for="(profesor, index) in materia.profesores"
              :key="index"
              class="professor-card"
            >
              <p class="professor-name">{{ profesor.nombre }}</p>
              <div class="professor-contacts">
                <template v-for="(email, i) in profesor.emails" :key="i">
                  <a :href="`mailto:${email}`" class="contact-link">{{ email }}</a>
                  <span v-if="i < profesor.emails.length - 1" class="separator">;</span>
                </template>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
// Importar ref para variables reactivas y onMounted para el lifecycle hook
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HeaderApp from '@/components/HeaderApp.vue'
// Importar datos JSON con información de las materias
import materiasData from '@/data/info_materiaestu.json'

const router = useRouter()
const authStore = useAuthStore()

// Si el usuario no es estudiante, redirigir al login
if (authStore.tipoUsuario !== 'estudiante') {
  router.push('/login')
}

// Indica si la información de la materia está cargando
const cargando = ref(true)
// Contiene toda la información de la materia seleccionada, null si no se encuetra la materia
const materia = ref(null)

// Llama a cargarInfoMateria para obtener los datos de la materia
onMounted(() => {
  cargarInfoMateria()
})

// Carga la información de la materia desde localStorage y el archivo JSON
const cargarInfoMateria = () => {
  try {
    const materiaActual = JSON.parse(localStorage.getItem('materiaActual'))
    
    if (materiaActual && materiasData.materias[materiaActual.nombre]) {
      materia.value = materiasData.materias[materiaActual.nombre]
    }
  } catch (error) {
    console.error('Error al cargar la materia:', error)
  } finally {
    cargando.value = false
  }
}

const volverCalendario = () => {
  router.push('/estudiante')
}
</script>

/* Wrapper para toda la página de información de materia */
<style scoped>
.materia-info-wrapper {
    min-height: 100vh;
    background: #f5f5f5;
    display: flex;
    flex-direction: column;
}

/* Área principal donde se muestra la información */
.main-content {
    padding: 30px;
    overflow-y: auto;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    flex: 1;
}

/* Contenedor principal de la información de la materia */
.subject-info-section {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    max-width: 800px;
    margin: 0 auto;
}

/* Título principal mostrando el nombre de la materia */
.subject-title {
    font-size: 18px;
    color: #333;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid #e0e0e0;
    font-weight: 600;
}

/* Contenedor de la información general de la materia */
.info-card {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 25px;
}

/* Cada fila de información (label + value) */
.info-row {
    display: flex;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #e0e0e0;
    gap: 15px;
}

/* Quitar la línea divisoria de la última fila */
.info-row:last-child {
    border-bottom: none;
}

/* Etiqueta de cada campo (Aulas, Horario, etc.) */
.info-label {
    font-weight: 600;
    color: #333;
    min-width: 100px;
}

/* Valor de cada campo */
.info-value {
    flex: 1;
    color: #555;
    font-size: 14px;
}

/* Botón para volver al calendario */
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
}

/* Hover del botón de calendario */
.btn-calendar:hover {
    background: #b8b8b8;
    transform: translateY(-2px);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
}

/* Contenedor de la lista de profesores */
.professor-section {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
}

/* Encabezado de la sección de profesores */
.professor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

/* Título de la sección de profesores */
.professor-header h3 {
    font-size: 16px;
    color: #333;
    font-weight: 600;
}

/* Badge mostrando el número total de profesores */
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

/* Tarjeta individual de cada profesor */
.professor-card {
    background: white;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 10px;
}

/* Quitar margen de la última tarjeta */
.professor-card:last-child {
    margin-bottom: 0;
}

/* Nombre del profesor */
.professor-name {
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
    font-size: 14px;
}

/* Contenedor de los emails del profesor */
.professor-contacts {
    font-size: 13px;
    color: #667eea;
}

/* Enlaces de email (mailto) */
.contact-link {
    color: #667eea;
    text-decoration: none;
    transition: color 0.3s;
}

/* Hover de los enlaces de email */
.contact-link:hover {
    color: #764ba2;
    text-decoration: underline;
}

/* Separador entre emails (punto y coma) */
.separator {
    margin: 0 5px;
    color: #333;
}
</style>