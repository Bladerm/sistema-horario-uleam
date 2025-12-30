<template>
  <div class="estudiante-wrapper">
    <HeaderApp />

    <main class="main-content">
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
              <tr>
                <td class="time-cell">08:00 - 09:00</td>
                <td class="class-cell" @click="mostrarInfoMateria('Gestion de proyecto')">Gestion de proyecto</td>
                <td class="class-cell" @click="mostrarInfoMateria('Redes de computadora')">Redes de computadora</td>
                <td class="class-cell" @click="mostrarInfoMateria('Mineria de dato')">Mineria de dato</td>
                <td class="empty-cell"></td>
                <td class="class-cell" @click="mostrarInfoMateria('Mineria de dato')">Mineria de dato</td>
              </tr>
              <tr>
                <td class="time-cell">09:00 - 10:00</td>
                <td class="class-cell" @click="mostrarInfoMateria('Gestion de proyecto')">Gestion de proyecto</td>
                <td class="class-cell" @click="mostrarInfoMateria('Redes de computadora')">Redes de computadora</td>
                <td class="class-cell" @click="mostrarInfoMateria('Mineria de dato')">Mineria de dato</td>
                <td class="class-cell" @click="mostrarInfoMateria('Ingenieria de software')">Ingenieria de software</td>
                <td class="class-cell" @click="mostrarInfoMateria('Mineria de dato')">Mineria de dato</td>
              </tr>
              <tr>
                <td class="time-cell">10:00 - 11:00</td>
                <td class="class-cell" @click="mostrarInfoMateria('Aplicacion web 1')">Aplicacion web 1</td>
                <td class="class-cell" @click="mostrarInfoMateria('Redes de computadora')">Redes de computadora</td>
                <td class="class-cell" @click="mostrarInfoMateria('Redes de computadora')">Redes de computadora</td>
                <td class="class-cell" @click="mostrarInfoMateria('Ingenieria de software')">Ingenieria de software</td>
                <td class="class-cell" @click="mostrarInfoMateria('Mineria de dato')">Mineria de dato</td>
              </tr>
              <tr>
                <td class="time-cell">11:00 - 12:00</td>
                <td class="class-cell" @click="mostrarInfoMateria('Aplicacion web 1')">Aplicacion web 1</td>
                <td class="class-cell" @click="mostrarInfoMateria('Gestion de proyecto')">Gestion de proyecto</td>
                <td class="class-cell" @click="mostrarInfoMateria('Redes de computadora')">Redes de computadora</td>
                <td class="class-cell" @click="mostrarInfoMateria('Aplicacion web 1')">Aplicacion web 1</td>
                <td class="class-cell" @click="mostrarInfoMateria('Aplicacion web 1')">Aplicacion web 1</td>
              </tr>
              <tr>
                <td class="time-cell">12:00 - 13:00</td>
                <td class="empty-cell"></td>
                <td class="class-cell" @click="mostrarInfoMateria('Gestion de proyecto')">Gestion de proyecto</td>
                <td class="empty-cell"></td>
                <td class="class-cell" @click="mostrarInfoMateria('Aplicacion web 1')">Aplicacion web 1</td>
                <td class="class-cell" @click="mostrarInfoMateria('Aplicacion web 1')">Aplicacion web 1</td>
              </tr>
              <tr>
                <td class="time-cell">13:00 - 14:00</td>
                <td class="empty-cell"></td>
                <td class="empty-cell"></td>
                <td class="empty-cell"></td>
                <td class="empty-cell"></td>
                <td class="empty-cell"></td>
              </tr>
              <tr>
                <td class="time-cell">14:00 - 15:00</td>
                <td class="class-cell" @click="mostrarInfoMateria('Ingenieria de software')">Ingenieria de software</td>
                <td class="empty-cell"></td>
                <td class="empty-cell"></td>
                <td class="empty-cell"></td>
                <td class="empty-cell"></td>
              </tr>
              <tr>
                <td class="time-cell">15:00 - 16:00</td>
                <td class="class-cell" @click="mostrarInfoMateria('Ingenieria de software')">Ingenieria de software</td>
                <td class="empty-cell"></td>
                <td class="empty-cell"></td>
                <td class="empty-cell"></td>
                <td class="empty-cell"></td>
              </tr>
              <tr>
                <td class="time-cell">16:00 - 17:00</td>
                <td class="empty-cell"></td>
                <td class="empty-cell"></td>
                <td class="empty-cell"></td>
                <td class="empty-cell"></td>
                <td class="empty-cell"></td>
              </tr>
              <tr>
                <td class="time-cell">17:00 - 18:00</td>
                <td class="empty-cell"></td>
                <td class="empty-cell"></td>
                <td class="empty-cell"></td>
                <td class="empty-cell"></td>
                <td class="empty-cell"></td>
              </tr>
              <tr>
                <td class="time-cell">18:00 - 19:00</td>
                <td class="empty-cell"></td>
                <td class="empty-cell"></td>
                <td class="empty-cell"></td>
                <td class="empty-cell"></td>
                <td class="empty-cell"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HeaderApp from '@/components/HeaderApp.vue'

const router = useRouter()
const authStore = useAuthStore()

if (authStore.tipoUsuario !== 'estudiante') {
  router.push('/login')
}

const mostrarInfoMateria = (nombreMateria) => {
  localStorage.setItem('materiaActual', JSON.stringify({
    nombre: nombreMateria
  }))
  router.push('/estudiante/materia')
}
</script>

<style scoped>
.estudiante-wrapper {
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

.empty-cell {
    background: #fafafa;
}
</style>