import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/Interfazadmi.vue'),// ← Cambié aquí
      meta: { requiresAuth: true, tipo: 'admin' }
    },
    {
      path: '/admin/crear-horario',
      name: 'crear-horario',
      component: () => import('@/views/admin/Crear_horario.vue'), // ← Cambié aquí
      meta: { requiresAuth: true, tipo: 'admin' }
    },
    {
      path: '/admin/generar-reporte',
      name: 'generar-reporte',
      component: () => import('@/views/admin/Generar_reporte.vue'), // ← Cambié aquí
      meta: { requiresAuth: true, tipo: 'admin' }
    },

    // Rutas Estudiante
    {
      path: '/estudiante',
      name: 'estudiante',
      component: () => import('@/views/estudiante/InterfazEstudiante.vue'),
      meta: { requiresAuth: true, tipo: 'estudiante' }
    },
    {
      path: '/estudiante/materia',
      name: 'estudiante-materia',
      component: () => import('@/views/estudiante/InfoMateriaEstudiante.vue'),
      meta: { requiresAuth: true, tipo: 'estudiante' }
    },

    // Rutas Docente
    {
      path: '/docente',
      name: 'docente',
      component: () => import('@/views/docente/InterfazDocente.vue'),
      meta: { requiresAuth: true, tipo: 'docente' }
    },
    {
      path: '/docente/materia',
      name: 'docente-materia',
      component: () => import('@/views/docente/InfoMateriaDocente.vue'),
      meta: { requiresAuth: true, tipo: 'docente' }
    },
    {
      path: '/docente/confirmar-horario',
      name: 'confirmar-horario',
      component: () => import('@/views/docente/ConfirmarHorario.vue'),
      meta: { requiresAuth: true, tipo: 'docente' }
    },
    {
      path: '/docente/rechazar-horario',
      name: 'rechazar-horario',
      component: () => import('@/views/docente/RechazarHorario.vue'),
      meta: { requiresAuth: true, tipo: 'docente' }
    },
    {
      path: '/docente/actualizar-horario',
      name: 'actualizar-horario',
      component: () => import('@/views/docente/ActualizarHorario.vue'),
      meta: { requiresAuth: true, tipo: 'docente' }
    },
    {
      path: '/docente/descargar-lista',
      name: 'descargar-lista',
      component: () => import('@/views/docente/DescargarLista.vue'),
      meta: { requiresAuth: true, tipo: 'docente' }
    },
    {
      path: '/docente/informar-problema',
      name: 'informar-problema',
      component: () => import('@/views/docente/InformarProblema.vue'),
      meta: { requiresAuth: true, tipo: 'docente' }
    }

  ]
})

// Guard de navegación
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  authStore.cargarUsuario()
  
  if (to.meta.requiresAuth) {
    if (!authStore.estaAutenticado) {
      next('/login')
    } else if (to.meta.tipo && authStore.tipoUsuario !== to.meta.tipo) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router