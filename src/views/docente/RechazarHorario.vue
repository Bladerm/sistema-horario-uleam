<template>
  <div class="rechazar-horario-wrapper">
    <HeaderApp />

    <main class="main-content">
      <section class="report-section">
        <h2>Rechazar horario</h2>
        
        <!-- Formulario para escribir el motivo del rechazo -->
        <div class="report-form">
          <div class="filter-section">
            <h3>Escriba el motivo del rechazo</h3>
            <textarea 
              class="problema-textarea" 
              v-model="motivoRechazo"
              placeholder="Escriba el motivo por el cual rechaza el horario..."
            ></textarea>
          </div>

          <!-- Grupo de botones de acción -->
          <div class="button-group">
            <button class="btn-secondary" @click="cancelar">Cancelar</button>
            <button class="btn-primary" @click="enviarRechazo">Rechazar</button>
          </div>
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

// Verifica que el usuario sea docente
if (authStore.tipoUsuario !== 'docente') {
  router.push('/login')
}

// Variable reactiva que almacena el texto del motivo del rechazo
const motivoRechazo = ref('')

// Valida el texto del motivo de rechazo
const validarTextoRechazo = (texto) => {
  // Validación 1: Longitud mínima de 15 caracteres
  const regexLongitudMin = /^.{15,}$/
  if (!regexLongitudMin.test(texto)) {
    alert('El motivo del rechazo debe tener al menos 15 caracteres')
    return false
  }
  
  // Validación 2: Longitud máxima de 500 caracteres
  if (texto.length > 500) {
    alert('El motivo no puede exceder los 500 caracteres')
    return false
  }
  
  // Validación 3: Debe contener al menos una letra (incluye acentos y ñ)
  const regexLetras = /[a-záéíóúñA-ZÁÉÍÓÚÑ]/
  if (!regexLetras.test(texto)) {
    alert('El motivo debe contener texto válido con letras')
    return false
  }
  
  // Validación 4: No puede estar vacío o contener solo espacios en blanco
  const regexSoloEspacios = /^\s*$/
  if (regexSoloEspacios.test(texto)) {
    alert('El motivo no puede estar vacío o contener solo espacios')
    return false
  }
  
  return true
}

// Función para enviar el rechazo del horario, el rechazo se guarda en el localStorage
const enviarRechazo = () => {
  const motivoTexto = motivoRechazo.value.trim()
  
  // Verifica que el campo no esté vacío después de limpiar espacios
  if (motivoTexto === '') {
    alert('Por favor, escriba el motivo del rechazo antes de enviar')
    return
  }

  // Valida el texto usando la función de validación
  if (!validarTextoRechazo(motivoTexto)) {
    return
  }
  
  // Obtiene el array de rechazos existentes de localStorage, si no la tiene inicializa un array vacio
  let rechazos = JSON.parse(localStorage.getItem('rechazos')) || []
  rechazos.push(motivoTexto)
  localStorage.setItem('rechazos', JSON.stringify(rechazos))

  alert('Solicitud de rechazo enviado')
  router.push('/docente')
}

// Función para cancelar el rechazo
const cancelar = () => {
  router.push('/docente')
}
</script>

<style scoped>
/* Wrapper de toda la página */
.rechazar-horario-wrapper {
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

/* Contenedor de la sección de rechazo */
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
    gap: 25px;
}

/* Contenedor de la sección de filtros/textarea */
.filter-section {
    margin-top: 10px;
}

/* Subtítulo de la sección */
.filter-section h3 {
    font-size: 16px;
    color: #666;
    margin-bottom: 15px;
    font-weight: 500;
}

/* Textarea para escribir el motivo del rechazo */
.problema-textarea {
    width: 100%;
    min-height: 200px;
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

/* Botón primario (Rechazar) */
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