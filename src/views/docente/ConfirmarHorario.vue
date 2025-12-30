<template>
  <div class="confirmar-horario-wrapper">
    <HeaderApp />

    <main class="main-content">
      <section class="confirmation-section">
        <h2>Aceptacion de horario</h2>
        
        <div class="confirmation-card">
          <p class="confirmation-text">
            Desea aceptar su horario creado, una vez aceptado el horario no se aceptaran cambios
          </p>
          
          <div class="confirmation-buttons">
            <button class="btn-confirm" @click="confirmarAceptacion">SI</button>
            <button class="btn-cancel" @click="cancelarAceptacion">NO</button>
          </div>
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

if (authStore.tipoUsuario !== 'docente') {
  router.push('/login')
}

const confirmarAceptacion = () => {
  alert('Horario aceptado')
  router.push('/docente')
}

const cancelarAceptacion = () => {
  router.push('/docente')
}
</script>

<style scoped>
.confirmar-horario-wrapper {
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
    display: flex;
    align-items: center;
    justify-content: center;
}

.confirmation-section {
    background: white;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    max-width: 700px;
    margin: 50px auto;
    width: 100%;
}

.confirmation-section h2 {
    font-size: 22px;
    font-weight: bold;
    color: #333;
    margin-bottom: 30px;
    text-align: center;
}

.confirmation-card {
    text-align: center;
    padding: 30px 20px;
}

.confirmation-text {
    font-size: 16px;
    color: #333;
    line-height: 1.6;
    margin-bottom: 40px;
}

.confirmation-buttons {
    display: flex;
    gap: 20px;
    justify-content: center;
}

.btn-confirm,
.btn-cancel {
    padding: 12px 50px;
    background: #d0d0d0;
    color: #333;
    border: none;
    border-radius: 25px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    min-width: 120px;
}

.btn-confirm:hover,
.btn-cancel:hover {
    background: #b8b8b8;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>