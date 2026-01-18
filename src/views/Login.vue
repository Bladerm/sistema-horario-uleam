<template>
  <div class="login-wrapper">
    <div class="container">
      <div class="user-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </div>
      
      <h2>Iniciar Sesión</h2>
      
      <!-- Mensaje de error (se muestra/oculta según el estado de 'error') -->
      <div class="error-message" :style="{ display: error ? 'block' : 'none' }">
        {{ error }}
      </div>
      
      <!-- Formulario de login. @submit.prevent evita el comportamiento por defecto del formulario -->
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Ingrese su correo:</label>
          <!-- Input de email con v-model para enlace bidireccional con el estado 'email' -->
          <input
            type="email" 
            id="email"
            v-model="email"
            required 
            placeholder="ejemplo@dominio.com"
          >
        </div>
        
        <!-- Grupo del campo de contraseña -->
        <div class="form-group">
          <label for="password">Ingrese su contraseña:</label>
          <input 
            type="password" 
            id="password"
            v-model="password"
            required 
            placeholder="••••••••"
          >
        </div>
        
        <div class="forgot-link">
          <a href="#" @click.prevent="mostrarRecuperacion">
            Olvidó su correo o contraseña
          </a>
        </div>
        
        <button type="submit">Ingresar</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// Importación del store de autenticación para manejar el login
import { useAuthStore } from '@/stores/auth'

// Inicialización del router
const router = useRouter()
// Inicialización del store de autenticación
const authStore = useAuthStore()

// Variable reactiva para almacenar el email ingresado por el usuario
const email = ref('')
const password = ref('')
const error = ref('')

const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

// Se ejecuta cuando el usuario envía el formulario
const handleLogin = () => {
  error.value = ''
  
  // Valida q los comapos esten completos 
  if (!email.value || !password.value) {
    error.value = 'Por favor, complete todos los campos'
    return
  }
  
  if (!validarEmail(email.value)) {
    error.value = 'Por favor, ingrese un correo electrónico válido'
    return
  }
  
  const exito = authStore.login(email.value, password.value)
  
  if (exito) {
    const tipo = authStore.tipoUsuario
    if (tipo === 'admin') {
      router.push('/admin')
    } else if (tipo === 'docente') {
      router.push('/docente')
    } else if (tipo === 'estudiante') {
      router.push('/estudiante')
    }
  } else {
    error.value = 'Correo o contraseña incorrectos'
  }
}

const mostrarRecuperacion = () => {
  alert('Funcionalidad de recuperación pendiente')
}
</script>

<style scoped>
/* Wrapper para el fondo */
.login-wrapper {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

/* Caja blanca que contiene el formulario */
.container {
    background: rgba(255, 255, 255, 0.95);
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    width: 90%;
    max-width: 400px;
}

/* Círculo que contiene el icono de usuario */
.user-icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    margin: 0 auto 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

/* SVG del icono dentro del círculo */
.user-icon svg {
    width: 45px;
    height: 45px;
    fill: white;
}

h2 {
    text-align: center;
    color: #333;
    margin-bottom: 30px;
    font-size: 24px;
}

/* Contenedor de cada campo (label + input) */
.form-group {
    margin-bottom: 20px;
}

/* Etiquetas de los campos */
label {
    display: block;
    margin-bottom: 8px;
    color: #555;
    font-weight: 500;
}

/* Campos de entrada (email y password) */
input {
    width: 100%;
    padding: 12px 15px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 14px;
    transition: all 0.3s;
    background: white;
}

/* Efecto cuando el input está enfocado (usuario escribiendo) */
input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.forgot-link {
    text-align: center;
    margin: 15px 0;
}

/* Estilo del enlace */
.forgot-link a {
    color: #667eea;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s;
}

.forgot-link a:hover {
    color: #764ba2;
    text-decoration: underline;
}

/* Botón de "Ingresar" */
button {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    margin-top: 10px;
}

/* Efecto hover del botón (elevar ligeramente) */
button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

/* Efecto cuando se hace clic en el botón */
button:active {
    transform: translateY(0);
}

/* Caja que muestra mensajes de error */
.error-message {
    background: #fee;
    color: #c33;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 20px;
    font-size: 14px;
    border-left: 4px solid #c33;
}
</style>