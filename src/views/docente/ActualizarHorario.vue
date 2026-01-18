<template>
  <div class="actualizar-horario-wrapper">
    <HeaderApp />

    <main class="main-content">
      <section class="report-section">
        <h2>Actualizar horario</h2>
        
        <div class="report-form">
          <!-- Seleccionar materia -->
          <!-- Selector de materia a actualizar -->
          <div class="filter-section">
            <h3>Seleccione la materia que sea actualizar:</h3>
            <select class="form-input" v-model="formulario.materia">
              <option value="">-- Seleccione una materia --</option>
              <option value="Gestion de proyecto">Gestion de proyecto</option>
              <option value="REDES DE COMPUTADORA">Redes de computadora</option>
              <option value="MINERIA DE DATO">Mineria de dato</option>
              <option value="Algebra">Algebra</option>
              <option value="Fisica">Fisica</option>
              <option value="POO">POO</option>
              <option value="Base de dato">Base de dato</option>
            </select>
          </div>

          <!-- Seleccionar paralelo -->
          <div class="filter-section">
            <h3>Seleccione el paralelo:</h3>
            <select class="form-input" v-model="formulario.paralelo">
              <option value="">-- Seleccione un paralelo --</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
          </div>

          <!-- Nuevo horario propuesto -->
          <div class="filter-section">
            <h3 style="margin-top: 20px;">Nuevo horario propuesto</h3>
          </div>

          <!-- Seleccionar día -->
          <div class="filter-section">
            <h3>Seleccione el dia:</h3>
            <select class="form-input" v-model="formulario.dia">
              <option value="">-- Seleccione un día --</option>
              <option value="Lunes">Lunes</option>
              <option value="Martes">Martes</option>
              <option value="Miércoles">Miércoles</option>
              <option value="Jueves">Jueves</option>
              <option value="Viernes">Viernes</option>
            </select>
          </div>

          <!-- Seleccionar hora -->
          <div class="filter-section">
            <h3>Seleccione la hora:</h3>
            <select class="form-input" v-model="formulario.hora">
              <option value="">-- Seleccione una hora --</option>
              <option value="08:00 - 09:00">08:00 - 09:00</option>
              <option value="09:00 - 10:00">09:00 - 10:00</option>
              <option value="10:00 - 11:00">10:00 - 11:00</option>
              <option value="11:00 - 12:00">11:00 - 12:00</option>
              <option value="12:00 - 13:00">12:00 - 13:00</option>
              <option value="13:00 - 14:00">13:00 - 14:00</option>
              <option value="14:00 - 15:00">14:00 - 15:00</option>
              <option value="15:00 - 16:00">15:00 - 16:00</option>
              <option value="16:00 - 17:00">16:00 - 17:00</option>
              <option value="17:00 - 18:00">17:00 - 18:00</option>
              <option value="18:00 - 19:00">18:00 - 19:00</option>
            </select>
          </div>

          <!-- Seleccionar aula (opcional) -->
          <div class="filter-section">
            <h3>Seleccione el aula:</h3>
            <select class="form-input" v-model="formulario.aula">
              <option value="">-- Seleccione un aula --</option>
              <option value="Aula 101">Aula 101</option>
              <option value="Aula 102">Aula 102</option>
              <option value="Aula 103">Aula 103</option>
              <option value="Aula 201">Aula 201</option>
              <option value="Aula 203">Aula 203</option>
              <option value="Aula 208">Aula 208</option>
              <option value="Aula 301">Aula 301</option>
              <option value="Aula 305">Aula 305</option>
              <option value="Aula 308">Aula 308</option>
            </select>
          </div>

          <!-- Motivo del cambio -->
          <div class="filter-section">
            <h3>Escriba el motivo del cambio</h3>
            <textarea 
              class="problema-textarea" 
              v-model="formulario.motivo"
              placeholder="Describa el motivo por el cual solicita el cambio de horario..."
            ></textarea>
          </div>

          <!-- Grupo de botones de acción -->
          <div class="button-group">
            <button class="btn-secondary" @click="cancelar">Cancelar</button>
            <button class="btn-primary" @click="enviarSolicitud">Enviar solicitud</button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HeaderApp from '@/components/HeaderApp.vue'

const router = useRouter()
const authStore = useAuthStore()

if (authStore.tipoUsuario !== 'docente') {
  router.push('/login')
}

// Formulario reactivo que contiene todos los campos de la solicitud
const formulario = reactive({
  materia: '',
  paralelo: '',
  dia: '',
  hora: '',
  aula: '',
  motivo: ''
})

// Función para enviar la solicitud de actualización de horario
const enviarSolicitud = () => {
  if (!formulario.materia || !formulario.paralelo || !formulario.dia || !formulario.hora || !formulario.motivo) {
    alert('Por favor, complete todos los campos obligatorios')
    return
  }

  // Obtiene el array de solicitudes existentes de localStorage
  let solicitudes = JSON.parse(localStorage.getItem('solicitudesActualizacion')) || []
  
  // Crea el objeto de solicitud con todos los datos del formulario
  const solicitud = {
    materia: formulario.materia,
    paralelo: formulario.paralelo,
    dia: formulario.dia,
    hora: formulario.hora,
    aula: formulario.aula,
    motivo: formulario.motivo
  }
  
  solicitudes.push(solicitud)
  localStorage.setItem('solicitudesActualizacion', JSON.stringify(solicitudes))

  alert('Solicitud de actualizacion enviada')
  router.push('/docente')
}

const cancelar = () => {
  router.push('/docente')
}
</script>

<style scoped>
/* Wrapper de toda la página */
.actualizar-horario-wrapper {
    min-height: 100vh;
    background: #f5f5f5;
    display: flex;
    flex-direction: column;
}

/* Área principal de contenido */
.main-content {
    padding: 30px;
    overflow-y: auto;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    flex: 1;
}

/* Contenedor de la sección de actualización */
.report-section {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    max-width: 700px;
    margin: 0 auto;
}

/* Título de la sección */
.report-section h2 {
    font-size: 22px;
    font-weight: bold;
    color: #333;
    margin-bottom: 30px;
    text-align: left;
}

/* Contenedor del formulario */
.report-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

/* Contenedor de cada sección de campo (label + input/select/textarea) */
.filter-section {
    margin-top: 5px;
}

/* Etiquetas (h3) de cada campo */
.filter-section h3 {
    font-size: 16px;
    color: #666;
    margin-bottom: 10px;
    font-weight: 500;
}

/* Estilo base para todos los select del formulario */
.form-input {
    width: 100%;
    padding: 10px 15px;
    border: 2px solid #d0d0d0;
    border-radius: 6px;
    font-size: 14px;
    background: white;
    transition: all 0.3s;
}

/* Efecto focus de los select (cuando están seleccionados) */
.form-input:focus {
    outline: none;
    border-color: #667eea;
}

/* Textarea para el motivo del cambio */
.problema-textarea {
    width: 100%;
    min-height: 150px;
    padding: 15px;
    border: 2px solid #d0d0d0;
    border-radius: 6px;
    font-size: 14px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    resize: vertical;
    background: white;
    transition: all 0.3s;
}

/* Efecto focus del textarea (cuando está seleccionado) */
.problema-textarea:focus {
    outline: none;
    border-color: #667eea;
}

/* Estilo del placeholder (texto de ejemplo) */
.problema-textarea::placeholder {
    color: #999;
}

/* Contenedor del grupo de botones */
.button-group {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-top: 20px;
}

/* Estilos base compartidos para ambos botones */
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

/* Botón primario (Enviar solicitud) */
.btn-primary {
    background: white;
    color: #333;
    border: 2px solid #d0d0d0;
}

/* Efecto hover del botón primario */
.btn-primary:hover {
    background: #f5f5f5;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Botón secundario (Cancelar) */
.btn-secondary {
    background: white;
    color: #333;
    border: 2px solid #d0d0d0;
}

/* Efecto hover del botón secundario */
.btn-secondary:hover {
    background: #f5f5f5;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>