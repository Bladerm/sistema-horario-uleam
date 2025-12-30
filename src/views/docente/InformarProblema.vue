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

if (authStore.tipoUsuario !== 'docente') {
  router.push('/login')
}

const problemaTexto = ref('')

const validarTextoProblema = (texto) => {
  const regexLongitudMin = /^.{10,}$/
  if (!regexLongitudMin.test(texto)) {
    alert('El problema debe tener al menos 10 caracteres')
    return false
  }
  
  if (texto.length > 500) {
    alert('El problema no puede exceder los 500 caracteres')
    return false
  }
  
  const regexLetras = /[a-záéíóúñA-ZÁÉÍÓÚÑ]/
  if (!regexLetras.test(texto)) {
    alert('El problema debe contener texto válido con letras')
    return false
  }
  
  const regexSoloEspacios = /^\s*$/
  if (regexSoloEspacios.test(texto)) {
    alert('El problema no puede estar vacío o contener solo espacios')
    return false
  }
  
  return true
}

const enviarProblema = () => {
  const texto = problemaTexto.value.trim()
  
  if (texto === '') {
    alert('Por favor, escriba el problema antes de enviar')
    return
  }

  if (!validarTextoProblema(texto)) {
    return
  }

  let problemas = JSON.parse(localStorage.getItem('problemas')) || []
  problemas.push(texto)
  localStorage.setItem('problemas', JSON.stringify(problemas))

  alert('Informe enviado al administrador')
  router.push('/docente/materia')
}
</script>

<style scoped>
.informar-problema-wrapper {
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
    margin-bottom: 30px;
    text-align: left;
}

.report-form {
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.filter-section {
    margin-top: 10px;
}

.filter-section h3 {
    font-size: 16px;
    color: #666;
    margin-bottom: 15px;
    font-weight: 500;
}

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

.problema-textarea:focus {
    outline: none;
    border-color: #667eea;
}

.problema-textarea::placeholder {
    color: #999;
}

.button-group {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-top: 20px;
}

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

.btn-enviar:hover {
    background: #b8b8b8;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>