<template>
  <div class="rechazar-horario-wrapper">
    <HeaderApp />

    <main class="main-content">
      <section class="report-section">
        <h2>Rechazar horario</h2>
        
        <div class="report-form">
          <div class="filter-section">
            <h3>Escriba el motivo del rechazo</h3>
            <textarea 
              class="problema-textarea" 
              v-model="motivoRechazo"
              placeholder="Escriba el motivo por el cual rechaza el horario..."
            ></textarea>
          </div>

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

if (authStore.tipoUsuario !== 'docente') {
  router.push('/login')
}

const motivoRechazo = ref('')

const validarTextoRechazo = (texto) => {
  const regexLongitudMin = /^.{15,}$/
  if (!regexLongitudMin.test(texto)) {
    alert('El motivo del rechazo debe tener al menos 15 caracteres')
    return false
  }
  
  if (texto.length > 500) {
    alert('El motivo no puede exceder los 500 caracteres')
    return false
  }
  
  const regexLetras = /[a-záéíóúñA-ZÁÉÍÓÚÑ]/
  if (!regexLetras.test(texto)) {
    alert('El motivo debe contener texto válido con letras')
    return false
  }
  
  const regexSoloEspacios = /^\s*$/
  if (regexSoloEspacios.test(texto)) {
    alert('El motivo no puede estar vacío o contener solo espacios')
    return false
  }
  
  return true
}

const enviarRechazo = () => {
  const motivoTexto = motivoRechazo.value.trim()
  
  if (motivoTexto === '') {
    alert('Por favor, escriba el motivo del rechazo antes de enviar')
    return
  }

  if (!validarTextoRechazo(motivoTexto)) {
    return
  }
  
  let rechazos = JSON.parse(localStorage.getItem('rechazos')) || []
  rechazos.push(motivoTexto)
  localStorage.setItem('rechazos', JSON.stringify(rechazos))

  alert('Solicitud de rechazo enviado')
  router.push('/docente')
}

const cancelar = () => {
  router.push('/docente')
}
</script>

<style scoped>
.rechazar-horario-wrapper {
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

.btn-primary {
    background: white;
    color: #333;
    border: 2px solid #d0d0d0;
}

.btn-primary:hover {
    background: #f5f5f5;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.btn-secondary {
    background: white;
    color: #333;
    border: 2px solid #d0d0d0;
}

.btn-secondary:hover {
    background: #f5f5f5;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>