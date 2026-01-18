<template>
  <div class="confirmar-horario-wrapper">
    <HeaderApp />

    <main class="main-content">
      <section class="confirmation-section">
        <h2>Aceptacion de horario</h2>
        <!-- Tarjeta con mensaje y botones de confirmación -->
        <div class="confirmation-card">
          <p class="confirmation-text">
            Desea aceptar su horario creado, una vez aceptado el horario no se aceptaran cambios
          </p>
          
          <!-- Contenedor de botones de acción (SI/NO) -->
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

// Verifica que el usuario sea docente
if (authStore.tipoUsuario !== 'docente') {
  router.push('/login')
}

// Función para confirmar la aceptación del horario
const confirmarAceptacion = () => {
  alert('Horario aceptado')
  router.push('/docente')
}

// Función para cancelar la aceptación del horario
const cancelarAceptacion = () => {
  router.push('/docente')
}
</script>

<style scoped>
/* Wrapper de toda la página */
.confirmar-horario-wrapper {
    min-height: 100vh;
    background: #f5f5f5;
    display: flex;
    flex-direction: column;
}

/* Área principal centrada */
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

/* Contenedor de la tarjeta de confirmación */
.confirmation-section {
    background: white;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    max-width: 700px;
    margin: 50px auto;
    width: 100%;
}

/* Título de la sección */
.confirmation-section h2 {
    font-size: 22px;
    font-weight: bold;
    color: #333;
    margin-bottom: 30px;
    text-align: center;
}

/* Contenedor interno de la tarjeta */
.confirmation-card {
    text-align: center;
    padding: 30px 20px;
}

/* Texto del mensaje de advertencia */
.confirmation-text {
    font-size: 16px;
    color: #333;
    line-height: 1.6;
    margin-bottom: 40px;
}

/* Contenedor de los botones SI/NO */
.confirmation-buttons {
    display: flex;
    gap: 20px;
    justify-content: center;
}

/* Estilos base para ambos botones (SI y NO) */
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

/* Efectos hover para ambos botones */
.btn-confirm:hover,
.btn-cancel:hover {
    background: #b8b8b8;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>