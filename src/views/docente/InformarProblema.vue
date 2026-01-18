<template>
  <div class="informar-problema-wrapper">
    <HeaderApp />

    <main class="main-content">
      <section class="report-section">
        <h2>Informar problema</h2>
        
        <div class="report-form">
          <div class="filter-section">
            <h3>Escriba el problema:</h3>
            <textarea 
              class="problema-textarea" 
              v-model="problemaTexto"
              placeholder="Describa detalladamente el problema que desea reportar..."
            ></textarea>
          </div>

          <!-- Botones de acción -->
          <!-- Botones de envio -->
          <div class="button-group">
            <button class="btn-enviar" @click="enviarProblema">Enviar</button>
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

// Si el usuario no es docente, redirigir al login
if (authStore.tipoUsuario !== 'docente') {
  router.push('/login')
}

// Texto del problema ingresado por el docente
const problemaTexto = ref('')

// Valida que el texto del problema cumpla con los requisitos
const validarTextoProblema = (texto) => {
  const regexLongitudMin = /^.{10,}$/
  if (!regexLongitudMin.test(texto)) {
    alert('El problema debe tener al menos 10 caracteres')
    return false
  }
  
  // Verificar que no exceda 500 caracteres
  if (texto.length > 500) {
    alert('El problema no puede exceder los 500 caracteres')
    return false
  }
  
  // Regex que verifica que el texto contenga al menos una letra (español)
  const regexLetras = /[a-záéíóúñA-ZÁÉÍÓÚÑ]/
  if (!regexLetras.test(texto)) {
    alert('El problema debe contener texto válido con letras')
    return false
  }
  // Regex que verifica si el texto solo contiene espacios en blanco
  const regexSoloEspacios = /^\s*$/
  if (regexSoloEspacios.test(texto)) {
    alert('El problema no puede estar vacío o contener solo espacios')
    return false
  }
  
  // Si todas las validaciones pasan, retornar true
  return true
}

// Envía el problema reportado al sistema
const enviarProblema = () => {
  // Limpiar espacios en blanco al inicio y final del texto
  const texto = problemaTexto.value.trim()
  
  if (texto === '') {
    alert('Por favor, escriba el problema antes de enviar')
    return
  }

  if (!validarTextoProblema(texto)) {
    return
  }

  // Obtener array de problemas existentes o crear uno nuevo si no existe
  let problemas = JSON.parse(localStorage.getItem('problemas')) || []
  problemas.push(texto)
  // Guardar el array actualizado en localStorage
  localStorage.setItem('problemas', JSON.stringify(problemas))

  // Mostrar mensaje de éxito
  alert('Informe enviado al administrador')
  router.push('/docente/materia')
}
</script>

<style scoped>
/* Wrapper para toda la página */
.informar-problema-wrapper {
    min-height: 100vh;
    background: #f5f5f5;
    display: flex;
    flex-direction: column;
}

/* Área principal donde se muestra el formulario */
.main-content {
    padding: 30px;
    overflow-y: auto;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    flex: 1;
}

/* Contenedor principal del formulario de reporte */
.report-section {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    max-width: 700px;
    margin: 0 auto;
}

/* Título principal */
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

/* Contenedor de la sección de texto */
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

/* Campo de texto grande para escribir el problema */
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

/* Efecto focus en el textarea */
.problema-textarea:focus {
    outline: none;
    border-color: #667eea;
}

/* Estilo del placeholder (texto de ayuda) */
.problema-textarea::placeholder {
    color: #999;
}

/* Grupo de botones */
.button-group {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-top: 20px;
}

/* Botón de enviar */
.btn-enviar {
    padding: 12px 40px;
    border: none;
    border-radius: 25px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    background: #d0d0d0;
    color: #333;
}

/* Hover del botón de enviar */
.btn-enviar:hover {
    background: #b8b8b8;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>