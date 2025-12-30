<template>
  <div class="generar-reporte-wrapper">
    <HeaderApp />

    <main class="main-content">
      <section class="report-section">
        <h2>GENERAR REPORTES</h2>
        
        <div class="report-form">
          <!-- Tipo de reporte -->
          <div class="form-row">
            <label>Tipo de reporte:</label>
            <select v-model="tipoReporte" class="form-input">
              <option value="">-- Seleccione --</option>
              <option value="horarios">Reporte de Horarios</option>
              <option value="docentes">Reporte de Docentes</option>
              <option value="estudiantes">Reporte de Estudiantes</option>
              <option value="materias">Reporte de Materias</option>
              <option value="aulas">Reporte de Aulas</option>
              <option value="completo">Reporte Completo</option>
            </select>
          </div>

          <!-- Filtros -->
          <div class="filter-section">
            <h3>Filtro:</h3>
            
            <div class="form-row">
              <label>Carrera:</label>
              <select v-model="carrera" class="form-input">
                <option value="">-- Seleccione --</option>
                <option value="ti">Tecnología de la Información</option>
                <option value="software">Ingeniería de Software</option>
              </select>
            </div>

            <div class="form-row">
              <label>Periodo:</label>
              <select v-model="periodo" class="form-input">
                <option value="">-- Seleccione --</option>
                <option value="2025-1">2025 - 1</option>
                <option value="2025-2">2025 - 2</option>
                <option value="2026-1">2026 - 1</option>
              </select>
            </div>

            <div class="form-row">
              <label>Fecha:</label>
              <input type="date" v-model="fecha" class="form-input">
            </div>
          </div>

          <!-- Formato -->
          <div class="format-section">
            <h3>Formato:</h3>
            <div class="radio-group">
              <label class="radio-label">
                <input type="radio" v-model="formato" value="pdf" checked>
                <span>PDF</span>
              </label>

              <label class="radio-label">
                <input type="radio" v-model="formato" value="jpg">
                <span>JPG</span>
              </label>
            </div>
          </div>

          <!-- Botones -->
          <div class="button-group">
            <button class="btn-secondary" @click="cancelar">Cancelar</button>
            <button class="btn-primary" @click="generarReporte">Generar reporte</button>
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

// Verificar autenticación
if (authStore.tipoUsuario !== 'admin') {
  router.push('/login')
}

// Datos reactivos
const tipoReporte = ref('')
const carrera = ref('')
const periodo = ref('')
const fecha = ref('')
const formato = ref('pdf')

// Funciones
const generarReporte = () => {
  if (!tipoReporte.value) {
    alert('Por favor seleccione un tipo de reporte')
    return
  }
  
  alert('Reporte generado')
  router.push('/admin')
}

const cancelar = () => {
  if (confirm('¿Seguro que quiere salir?')) {
    router.push('/admin')
  }
}
</script>

<style scoped>
/* Wrapper */
.generar-reporte-wrapper {
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

.report-section {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    max-width: 600px;
    margin: 0 auto;
}

/* Título de la sección de reportes */
.report-section h2 {
    font-size: 22px;
    font-weight: bold;
    color: #333;
    margin-bottom: 30px;
    text-align: left;
}

/* Formulario de reportes */
.report-form {
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.form-row {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.form-row label {
    font-size: 15px;
    color: #333;
    font-weight: 500;
}

/* Secciones de filtros y formato */
.filter-section,
.format-section {
    margin-top: 10px;
}

/* Subtítulos de secciones */
.filter-section h3,
.format-section h3 {
    font-size: 16px;
    color: #666;
    margin-bottom: 15px;
    font-weight: 500;
}

/* Entrada del formulario (select, date, text) */
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

/* Grupo de radio buttons */
.radio-group {
    display: flex;
    gap: 30px;
}

/* Etiqueta de cada radio button */
.radio-label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: 15px;
    color: #333;
}

.radio-label input[type="radio"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
}

.radio-label span {
    user-select: none;
}

/* Grupo de botones (Cancelar, Generar) */
.button-group {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-top: 20px;
}

/* Botones primario y secundario */
.btn-primary,
.btn-secondary {
    padding: 12px 40px;
    border: none;
    border-radius: 25px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer !important;
    transition: all 0.3s;
    pointer-events: auto !important;
}

/* Estilo del botón primario */
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

/* Estilo del botón secundario */
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