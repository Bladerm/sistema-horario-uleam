<template>
  <div class="docente-wrapper">
    <HeaderApp />

    <main class="main-content">
      <!-- Sección de Calendario/Horario -->
      <section class="calendar-section">
        <h2>Calendario</h2>
        <div class="calendar-container">
          <table class="schedule-table">
            <!-- Encabezado de la tabla con los días de la semana -->
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
            <!-- Cuerpo de la tabla con todas las franjas horarias -->
            <tbody>
              <!-- v-for crea una fila por cada hora en el array 'horarios' -->
              <tr v-for="(hora, indexHora) in horarios" :key="indexHora">
                <td class="time-cell">{{ hora.tiempo }}</td>
                <!-- Crea una celda por cada día (lunes, martes, etc.) -->
                <td 
                  v-for="dia in dias" 
                  :key="dia"
                  :class="obtenerClasesCelda(dia, indexHora)"
                  @click="clickMateria(dia, indexHora)"
                >
                  <!-- Mostrar información de la materia si existe y el v-if verifica si hay ima cclase asignada -->
                  <div v-if="obtenerMateria(dia, indexHora)">
                    <strong>{{ obtenerMateria(dia, indexHora).materia }}</strong><br>
                    <small>
                      {{ obtenerMateria(dia, indexHora).curso }}<br>
                      {{ obtenerMateria(dia, indexHora).aula }}
                    </small>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Sección de Acciones -->
      <!-- Botones para gestionar el horario asignado -->
      <section class="schedule-actions-section">
        <h2>Aceptacion o actualizacion de horario</h2>
        <div class="schedule-actions-container">

          <!-- Botón para aceptar el horario asignado -->
          <button class="schedule-action-btn" @click="aceptarHorario">
            Aceptar horario
          </button>

          <!-- Botón para rechazar el horario asignado -->
          <button class="schedule-action-btn" @click="rechazarHorario">
            Rechazar horario
          </button>
          
          <!-- Botón para solicitar actualización del horario -->
          <button class="schedule-action-btn" @click="actualizarHorario">
            Actualizar horario
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HeaderApp from '@/components/HeaderApp.vue'

const router = useRouter()
const authStore = useAuthStore()

// Si el usuario no es docente, redirigir al login
if (authStore.tipoUsuario !== 'docente') {
  router.push('/login')
}

// Array con los días de la semana para iterar en la tabla
const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes']

// Array reactivo con todas las franjas horarias del docente
const horarios = ref([
  { tiempo: '08:00 - 09:00', lunes: { materia: 'Gestion de proyecto', curso: 'TI Quinto Semestre "A"', aula: 'Aula 305' }, martes: { materia: 'REDES DE COMPUTADORA', curso: 'TI Quinto Semestre "A"', aula: 'Aula 102' }, miercoles: { materia: 'MINERIA DE DATO', curso: 'TI Quinto Semestre "A"', aula: 'Aula 301' }, jueves: null, viernes: { materia: 'MINERIA DE DATO', curso: 'TI Quinto Semestre "A"', aula: 'Aula 301' } },
  { tiempo: '09:00 - 10:00', lunes: { materia: 'Gestion de proyecto', curso: 'TI Quinto Semestre "A"', aula: 'Aula 305' }, martes: { materia: 'REDES DE COMPUTADORA', curso: 'TI Quinto Semestre "A"', aula: 'Aula 102' }, miercoles: { materia: 'MINERIA DE DATO', curso: 'TI Quinto Semestre "A"', aula: 'Aula 301' }, jueves: { materia: 'Algebra', curso: 'TI Primer Semestre "A"', aula: 'Aula 103' }, viernes: { materia: 'MINERIA DE DATO', curso: 'TI Quinto Semestre "A"', aula: 'Aula 301' } },
  { tiempo: '10:00 - 11:00', lunes: { materia: 'Fisica', curso: 'TI Primer Semestre "A"', aula: 'Aula 208' }, martes: { materia: 'Gestion de proyecto', curso: 'TI Quinto Semestre "A"', aula: 'Aula 305' }, miercoles: { materia: 'REDES DE COMPUTADORA', curso: 'TI Quinto Semestre "A"', aula: 'Aula 102' }, jueves: { materia: 'Fisica', curso: 'TI Primer Semestre "A"', aula: 'Aula 208' }, viernes: { materia: 'Algebra', curso: 'TI Primer Semestre "A"', aula: 'Aula 103' } },
  { tiempo: '11:00 - 12:00', lunes: { materia: 'Fisica', curso: 'TI Primer Semestre "A"', aula: 'Aula 208' }, martes: { materia: 'Gestion de proyecto', curso: 'TI Quinto Semestre "A"', aula: 'Aula 305' }, miercoles: { materia: 'REDES DE COMPUTADORA', curso: 'TI Quinto Semestre "A"', aula: 'Aula 102' }, jueves: { materia: 'Fisica', curso: 'TI Primer Semestre "A"', aula: 'Aula 208' }, viernes: { materia: 'Algebra', curso: 'TI Primer Semestre "A"', aula: 'Aula 103' } },
  { tiempo: '12:00 - 13:00', lunes: null, martes: null, miercoles: null, jueves: null, viernes: null },
  { tiempo: '13:00 - 14:00', lunes: null, martes: null, miercoles: null, jueves: null, viernes: null },
  { tiempo: '14:00 - 15:00', lunes: { materia: 'Algebra', curso: 'TI Tercer Semestre "B"', aula: 'Aula 103' }, martes: { materia: 'POO', curso: 'TI Tercer Semestre "B"', aula: 'Aula 103' }, miercoles: { materia: 'POO', curso: 'TI Tercer Semestre "B"', aula: 'Aula 103' }, jueves: { materia: 'MINERIA DE DATO', curso: 'TI Quinto Semestre "B"', aula: 'Aula 301' }, viernes: { materia: 'Algebra', curso: 'TI Primer Semestre "B"', aula: 'Aula 103' } },
  { tiempo: '15:00 - 16:00', lunes: { materia: 'Algebra', curso: 'TI Tercer Semestre "B"', aula: 'Aula 103' }, martes: { materia: 'POO', curso: 'TI Tercer Semestre "B"', aula: 'Aula 103' }, miercoles: { materia: 'POO', curso: 'TI Tercer Semestre "B"', aula: 'Aula 103' }, jueves: { materia: 'MINERIA DE DATO', curso: 'TI Quinto Semestre "B"', aula: 'Aula 301' }, viernes: { materia: 'Algebra', curso: 'TI Primer Semestre "B"', aula: 'Aula 103' } },
  { tiempo: '16:00 - 17:00', lunes: { materia: 'Base de dato', curso: 'TI Cuarto Semestre "B"', aula: 'Aula 203' }, martes: { materia: 'Base de dato', curso: 'TI Cuarto Semestre "B"', aula: 'Aula 203' }, miercoles: { materia: 'REDES DE COMPUTADORA', curso: 'TI Quinto Semestre "B"', aula: 'Aula 102' }, jueves: { materia: 'Base de dato', curso: 'TI Cuarto Semestre "B"', aula: 'Aula 203' }, viernes: { materia: 'REDES DE COMPUTADORA', curso: 'TI Quinto Semestre "B"', aula: 'Aula 102' } },
  { tiempo: '17:00 - 18:00', lunes: { materia: 'Base de dato', curso: 'TI Cuarto Semestre "B"', aula: 'Aula 203' }, martes: { materia: 'Base de dato', curso: 'TI Cuarto Semestre "B"', aula: 'Aula 203' }, miercoles: { materia: 'REDES DE COMPUTADORA', curso: 'TI Quinto Semestre "B"', aula: 'Aula 102' }, jueves: { materia: 'Base de dato', curso: 'TI Cuarto Semestre "B"', aula: 'Aula 203' }, viernes: { materia: 'REDES DE COMPUTADORA', curso: 'TI Quinto Semestre "B"', aula: 'Aula 102' } },
  { tiempo: '18:00 - 19:00', lunes: null, martes: null, miercoles: null, jueves: null, viernes: null }
])

// Obtiene la información de la materia para una celda específica
const obtenerMateria = (dia, indexHora) => {
  return horarios.value[indexHora][dia]
}

// Determina la clase CSS para una celda según si tiene materia o está vacía
const obtenerClasesCelda = (dia, indexHora) => {
  return obtenerMateria(dia, indexHora) ? 'class-cell' : 'empty-cell'
}

// Maneja el clic en una celda con materia asignada
const clickMateria = (dia, indexHora) => {
  const materia = obtenerMateria(dia, indexHora)
  if (materia) {
    localStorage.setItem('materiaDocenteActual', JSON.stringify({
      nombre: materia.materia,
      curso: materia.curso,
      aula: materia.aula
    }))
    
    router.push('/docente/materia')
  }
}

// Navega a las paginas que se selecciono 
const aceptarHorario = () => {
  router.push('/docente/confirmar-horario')
}

const rechazarHorario = () => {
  router.push('/docente/rechazar-horario')
}

const actualizarHorario = () => {
  router.push('/docente/actualizar-horario')
}
</script>

<style scoped>
/* Wrapper para toda la página del docente */
.docente-wrapper {
    min-height: 100vh;
    background: #f5f5f5;
    display: flex;
    flex-direction: column;
}

/* Área principal donde se muestra el calendario y acciones */
.main-content {
    padding: 30px;
    overflow-y: auto;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
    flex: 1;
}

/* Contenedor de la sección del calendario */
.calendar-section {
    background: white;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    max-width: 1400px;
    margin: 0 auto;
}

/* Título de la sección */
.calendar-section h2 {
    font-size: 20px;
    color: #333;
    margin-bottom: 20px;
}

/* Contenedor con scroll horizontal si la tabla es muy ancha */
.calendar-container {
    overflow-x: auto;
}

/* Tabla principal del calendario semanal */
.schedule-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    font-size: 14px;
}

/* Encabezado de la tabla */
.schedule-table thead {
    background: #f8f9fa;
}

/* Celdas del encabezado (HORA, LUNES, MARTES, etc.) */
.schedule-table th {
    padding: 12px;
    text-align: center;
    font-weight: 600;
    border: 1px solid #dee2e6;
    color: #333;
}

/* Todas las celdas de datos de la tabla */
.schedule-table td {
    padding: 10px;
    text-align: center;
    border: 1px solid #dee2e6;
    min-height: 50px;
}

/* Celda de tiempo (primera columna con las horas) */
.time-cell {
    background: #f8f9fa;
    font-weight: 500;
    color: #555;
    white-space: nowrap;
}

/* Celda con clase asignada (clickeable) */
.class-cell {
    background: white;
    cursor: pointer;
    transition: all 0.3s;
    color: #333;
}

/* Efecto hover en celdas con clase */
.class-cell:hover {
    background: #667eea;
    color: white;
    transform: scale(1.02);
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

/* Texto pequeño dentro de las celdas (curso y aula) */
.class-cell small {
    display: block;
    margin-top: 4px;
    opacity: 0.8;
    font-size: 11px;
    line-height: 1.3;
}

/* Nombre de la materia en negrita */
.class-cell strong {
    display: block;
    margin-bottom: 2px;
}

/* Celda vacía (sin clase asignada) */
.empty-cell {
    background: #fafafa;
}

/* Contenedor de los botones de aceptar/rechazar/actualizar */
.schedule-actions-section {
    background: #f8f9fa;
    padding: 25px;
    border-radius: 10px;
    margin-top: 25px;
    text-align: center;
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
}

/* Título de la sección de acciones */
.schedule-actions-section h2 {
    font-size: 18px;
    color: #333;
    margin-bottom: 20px;
}

/* Contenedor de los botones */
.schedule-actions-container {
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
}

/* Estilo de los botones de acción (aceptar, rechazar, actualizar) */
.schedule-action-btn {
    padding: 12px 30px;
    border: none;
    border-radius: 6px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
    background: #9e9e9e;
    color: white;
}

/* Hover de los botones de acción */
.schedule-action-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
</style>