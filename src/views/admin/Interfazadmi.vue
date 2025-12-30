<template>
  <div class="admin-wrapper">
    <HeaderApp />

    <main class="main-content">
      <section class="alerts-section">
        <h2>Alertas</h2>
        <div class="alerts-container">
          <div class="alert alert-danger">
            <span class="alert-icon">⚠️</span>
            <p>Conflicto: Ing. Hernandez esta asignado a dos cursos diferentes</p>
          </div>

          <div class="alert alert-info">
            <span class="alert-icon">ℹ️</span>
            <p>Nuevo período académico, asignar horarios a los docentes</p>
          </div>
        </div>
      </section>

      <section class="quick-actions-section">
        <h2>Acciones rápidas</h2>
        <div class="actions-container">
          <button 
            class="action-btn action-primary" 
            @click="irACrearHorarios"
            type="button"
          >
            Crear nuevos horarios
          </button>

          <button 
            class="action-btn action-primary" 
            @click="irAGenerarReporte"
            type="button"
          >
            Generar reporte
          </button>
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

if (authStore.tipoUsuario !== 'admin') {
  router.push('/login')
}

const irACrearHorarios = () => {
  router.push('/admin/crear-horario')
}

const irAGenerarReporte = () => {
  router.push('/admin/generar-reporte')
}
</script>

<style scoped>
/* Wrapper para toda la interfaz admin */
.admin-wrapper {
    min-height: 100vh;
    background: #f5f5f5;
    display: flex;
    flex-direction: column;
}

/* Main Content */
.main-content {
    padding: 30px;
    overflow-y: auto;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    flex: 1;
}

/* Sección de Alertas */
.alerts-section {
    background: white;
    padding: 25px;
    border-radius: 10px;
    margin-bottom: 25px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 25px;
}

.alerts-section h2 {
    font-size: 20px;
    color: #333;
    margin-bottom: 20px;
}

.alerts-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

/* Estilo base para cada alerta */
.alert {
    padding: 15px 20px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 14px;
}

/* Ícono de la alerta */
.alert-icon {
    font-size: 24px;
}

/* Alerta de peligro (roja) */
.alert-danger {
    background: #ffe5e5;
    color: #c33;
    border-left: 4px solid #e74c3c;
}

/* Alerta informativa (azul) */
.alert-info {
    background: #e3f2fd;
    color: #1976d2;
    border-left: 4px solid #2196f3;
}

/* Párrafo dentro de alerta */
.alert p {
    margin: 0;
    flex: 1;
}

/* Sección de Acciones Rápidas */
.quick-actions-section {
    background: white;
    padding: 25px;
    border-radius: 10px;
    margin-bottom: 25px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 25px;
}

/* Título de acciones rápidas */
.quick-actions-section h2 {
    font-size: 20px;
    color: #333;
    margin-bottom: 20px;
}

/* Contenedor de botones de acción */
.actions-container {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    justify-content: center;
    pointer-events: auto !important;
}

/* Estilo base para botones de acción */
.action-btn {
    padding: 15px 30px;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer !important;
    transition: all 0.3s;
    display: inline-block;
    text-align: center;
    pointer-events: auto !important;
    position: relative;
    z-index: 10;
}

/* Botón de acción primaria */
.action-primary {
    background: #a8b7ff;
    color: #333;
    pointer-events: auto !important;
}

/* Hover en botón primario */
.action-primary:hover {
    background: #8fa3ff;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.action-primary:active {
    transform: translateY(0);
}
</style>