<template>
  <div class="descargar-lista-wrapper">
    <HeaderApp />

    <main class="main-content">
      <section class="report-section">
        <h2>Descargar lista</h2>
        
        <div class="report-form">
          <!-- Sección de selección de formato -->
          <div class="format-section">
            <h3>Seleccione el tipo de documento:</h3>
            <select class="form-input" v-model="tipoDocumento">
              <option value="">-- Seleccione una opción --</option>
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
            </select>
          </div>

          <!-- Botones de descargar y cancelar -->
          <div class="button-group">
            <button class="btn-primary" @click="descargar">Descargar</button>
            <button class="btn-secondary" @click="cancelar">Cancelar</button>
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

const tipoDocumento = ref('')

const descargar = () => {
  if (tipoDocumento.value === '') {
    alert('Por favor, seleccione un tipo de documento')
    return
  }

  alert('Lista descargada exitosamente')
  router.push('/docente/materia')
}

const cancelar = () => {
  const confirmar = confirm('¿Seguro que desea cancelar?')
  
  if (confirmar) {
    router.push('/docente/materia')
  }
}
</script>

<style scoped>
.descargar-lista-wrapper {
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
    max-width: 600px;
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

.format-section {
    margin-top: 10px;
}

.format-section h3 {
    font-size: 16px;
    color: #666;
    margin-bottom: 15px;
    font-weight: 500;
}

.form-input {
    width: 100%;
    padding: 10px 15px;
    border: 2px solid #d0d0d0;
    border-radius: 6px;
    font-size: 14px;
    background: white;
    transition: all 0.3s;
}

.form-input:focus {
    outline: none;
    border-color: #667eea;
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