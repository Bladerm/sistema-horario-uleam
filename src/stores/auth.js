import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // Usuarios simulados
  const usuarios = [
    { email: 'admin@sistema.com', password: 'admin123', tipo: 'admin' },
    { email: 'docente@sistema.com', password: 'docente123', tipo: 'docente' },
    { email: 'estudiante@sistema.com', password: 'estudiante123', tipo: 'estudiante' }
  ]

  // Estado del usuario actual
  const usuarioActual = ref(null)

  // Cargar usuario desde localStorage al iniciar
  const cargarUsuario = () => {
    const stored = localStorage.getItem('usuarioActual')
    if (stored) {
      usuarioActual.value = JSON.parse(stored)
    }
  }

  // Login
  const login = (email, password) => {
    const usuario = usuarios.find(u => u.email === email && u.password === password)
    
    if (usuario) {
      usuarioActual.value = usuario
      localStorage.setItem('usuarioActual', JSON.stringify(usuario))
      return true
    }
    return false
  }

  // Logout
  const logout = () => {
    usuarioActual.value = null
    localStorage.removeItem('usuarioActual')
  }

  // Computed
  const estaAutenticado = computed(() => usuarioActual.value !== null)
  const tipoUsuario = computed(() => usuarioActual.value?.tipo)

  return {
    usuarioActual,
    login,
    logout,
    cargarUsuario,
    estaAutenticado,
    tipoUsuario
  }
})