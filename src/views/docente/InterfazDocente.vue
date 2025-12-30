<template>
  <div class="docente-wrapper">
    <HeaderApp />

    <main class="main-content">
      <!-- Sección de Calendario/Horario -->
      <section class="calendar-section">
        <h2>Calendario</h2>
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
              <tr v-for="(hora, indexHora) in horarios" :key="indexHora">
                <td class="time-cell">{{ hora.tiempo }}</td>
                <td 
                  v-for="dia in dias" 
                  :key="dia"
                  :class="obtenerClasesCelda(dia, indexHora)"
                  @click="clickMateria(dia, indexHora)"
                >
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
      <section class="schedule-actions-section">
        <h2>Aceptacion o actualizacion de horario</h2>
        <div class="schedule-actions-container">
          <button class="schedule-action-btn" @click="aceptarHorario">
            Aceptar horario
          </button>

          <button class="schedule-action-btn" @click="rechazarHorario">
            Rechazar horario
          </button>
          
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

if (authStore.tipoUsuario !== 'docente') {
  router.push('/login')
}

const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes']

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

const obtenerMateria = (dia, indexHora) => {
  return horarios.value[indexHora][dia]
}

const obtenerClasesCelda = (dia, indexHora) => {
  return obtenerMateria(dia, indexHora) ? 'class-cell' : 'empty-cell'
}

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
.docente-wrapper {
    min-height: 100vh;
    background: #f5f5f5;
    display: flex;
    flex-direction: column;
}

.main-content {
    padding: 30px;
    overflow-y: auto;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
    flex: 1;
}

.calendar-section {
    background: white;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    max-width: 1400px;
    margin: 0 auto;
}

.calendar-section h2 {
    font-size: 20px;
    color: #333;
    margin-bottom: 20px;
}

.calendar-container {
    overflow-x: auto;
}

.schedule-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    font-size: 14px;
}

.schedule-table thead {
    background: #f8f9fa;
}

.schedule-table th {
    padding: 12px;
    text-align: center;
    font-weight: 600;
    border: 1px solid #dee2e6;
    color: #333;
}

.schedule-table td {
    padding: 10px;
    text-align: center;
    border: 1px solid #dee2e6;
    min-height: 50px;
}

.time-cell {
    background: #f8f9fa;
    font-weight: 500;
    color: #555;
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
    transform: scale(1.02);
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.class-cell small {
    display: block;
    margin-top: 4px;
    opacity: 0.8;
    font-size: 11px;
    line-height: 1.3;
}

.class-cell strong {
    display: block;
    margin-bottom: 2px;
}

.empty-cell {
    background: #fafafa;
}

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

.schedule-actions-section h2 {
    font-size: 18px;
    color: #333;
    margin-bottom: 20px;
}

.schedule-actions-container {
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
}

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

.schedule-action-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
</style>