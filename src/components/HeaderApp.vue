<template>
  <header class="header">
    <button class="menu-btn" @click="toggleMenu">☰</button>
    <div class="logo">
      <img src="@/assets/LOGO-ULEAM.png" alt="ULEAM Logo">
    </div>
    <div class="header-icons">
      <button class="icon-btn" @click="mostrarNotificaciones">🔔</button>
      <button class="icon-btn profile-btn" @click="toggleProfileMenu">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </button>
    </div>
    
    <div class="profile-menu" :class="{ active: menuVisible }">
      <div class="profile-info">
        <strong>{{ authStore.usuarioActual?.email }}</strong>
        <span>{{ tipoUsuarioTexto }}</span>
      </div>
      <hr>
      <button @click="cerrarSesion">Cerrar Sesión</button>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const menuVisible = ref(false)

const tipoUsuarioTexto = computed(() => {
  const tipo = authStore.tipoUsuario
  if (tipo === 'admin') return 'Administrador'
  if (tipo === 'docente') return 'Docente'
  if (tipo === 'estudiante') return 'Estudiante'
  return ''
})

const toggleMenu = () => {
  alert('Menú lateral (implementar según necesites)')
}

const toggleProfileMenu = () => {
  menuVisible.value = !menuVisible.value
}

const mostrarNotificaciones = () => {
  alert('Notificaciones')
}

const cerrarSesion = () => {
  authStore.logout()
  router.push('/login')
}

const cerrarMenuExterno = (event) => {
  const profileBtn = event.target.closest('.profile-btn')
  const profileMenu = event.target.closest('.profile-menu')
  
  if (!profileBtn && !profileMenu) {
    menuVisible.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', cerrarMenuExterno)
})

onUnmounted(() => {
  document.removeEventListener('click', cerrarMenuExterno)
})
</script>

<style scoped>
/* Encabezado */
.header {
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 100;
    height: 60px;
}

.menu-btn {
    display: none;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    padding: 10px;
}

.logo img {
    height: 68px;
    width: auto;
}

/* Contenedor de iconos (notificaciones y perfil) */
.header-icons {
    display: flex;
    gap: 15px;
    align-items: center;
}

/* Estilo base para botones de iconos */
.icon-btn {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: background 0.3s;
    position: relative;
}

.icon-btn:hover {
    background: #f0f0f0;
}

/* SVG del botón de perfil */
.profile-btn svg {
    width: 24px;
    height: 24px;
}

/* Menú desplegable */
.profile-menu {
    position: absolute;
    top: 60px;
    right: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
    padding: 15px;
    min-width: 200px;
    display: none;
}

/* Muestra el menú cuando tiene la clase 'active' */
.profile-menu.active {
    display: block;
}

/* Información del usuario en el menú */
.profile-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 10px;
}

/* Email del usuario (negrita) */
.profile-info strong {
    font-size: 14px;
    color: #333;
}

/* Rol del usuario (normal) */
.profile-info span {
    font-size: 12px;
    color: #666;
}

/* Línea separadora en el menú */
.profile-menu hr {
    border: none;
    border-top: 1px solid #e0e0e0;
    margin: 10px 0;
}

/* Botón de cerrar sesión */
.profile-menu button {
    width: 100%;
    padding: 10px;
    background: #e74c3c;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.3s;
}

/* Hover del botón cerrar sesión */
.profile-menu button:hover {
    background: #c0392b;
}
</style>