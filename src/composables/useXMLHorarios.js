// src/composables/useXMLHorarios.js
import { ref, onMounted } from 'vue'

export function useXMLHorarios() {
  const horarios = ref([])
  const docentes = ref([])
  const materias = ref([])
  
  const storageKey = 'horariosULEAM'
  const docentesKey = 'docentesULEAM'
  const materiasKey = 'materiasULEAM'

  // INICIALIZACIÓN
  const inicializar = () => {
    cargarHorariosDesdeStorage()
    cargarDocentesDesdeStorage()
    cargarMateriasDesdeStorage()
    
    if (docentes.value.length === 0) {
      crearDocentesIniciales()
    }
    if (materias.value.length === 0) {
      crearMateriasIniciales()
    }
    
    console.log("✅ Sistema XML inicializado")
    console.log(`📚 Docentes: ${docentes.value.length}`)
    console.log(`📖 Materias: ${materias.value.length}`)
    console.log(`🕐 Horarios guardados: ${horarios.value.length}`)
  }

  // GESTIÓN DE LOCALSTORAGE
  const cargarHorariosDesdeStorage = () => {
    try {
      const datos = localStorage.getItem(storageKey)
      horarios.value = datos ? JSON.parse(datos) : []
      console.log('📥 Horarios cargados desde storage:', horarios.value.length)
    } catch (error) {
      console.error('Error al cargar horarios:', error)
      horarios.value = []
    }
  }

  const cargarDocentesDesdeStorage = () => {
    try {
      const datos = localStorage.getItem(docentesKey)
      docentes.value = datos ? JSON.parse(datos) : []
    } catch (error) {
      console.error('Error al cargar docentes:', error)
      docentes.value = []
    }
  }

  const cargarMateriasDesdeStorage = () => {
    try {
      const datos = localStorage.getItem(materiasKey)
      materias.value = datos ? JSON.parse(datos) : []
    } catch (error) {
      console.error('Error al cargar materias:', error)
      materias.value = []
    }
  }

  const guardarHorariosEnStorage = () => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(horarios.value))
      console.log(`💾 ${horarios.value.length} horarios guardados en localStorage`)
    } catch (error) {
      console.error('Error al guardar horarios:', error)
    }
  }

  const guardarDocentesEnStorage = () => {
    try {
      localStorage.setItem(docentesKey, JSON.stringify(docentes.value))
    } catch (error) {
      console.error('Error al guardar docentes:', error)
    }
  }

  const guardarMateriasEnStorage = () => {
    try {
      localStorage.setItem(materiasKey, JSON.stringify(materias.value))
    } catch (error) {
      console.error('Error al guardar materias:', error)
    }
  }

  // DATOS INICIALES
  const crearDocentesIniciales = () => {
    docentes.value = [
      {
        id: 'DOC001',
        nombre: 'Prof. García',
        email: 'garcia@uleam.edu.ec',
        especialidad: 'Ingeniería de Software'
      },
      {
        id: 'DOC002',
        nombre: 'Prof. Martínez',
        email: 'martinez@uleam.edu.ec',
        especialidad: 'Tecnología de la Información'
      },
      {
        id: 'DOC003',
        nombre: 'Prof. López',
        email: 'lopez@uleam.edu.ec',
        especialidad: 'Redes de Computadoras'
      },
      {
        id: 'DOC004',
        nombre: 'Prof. Rodríguez',
        email: 'rodriguez@uleam.edu.ec',
        especialidad: 'Base de Datos'
      },
      {
        id: 'DOC005',
        nombre: 'Prof. Santos',
        email: 'santos@uleam.edu.ec',
        especialidad: 'Programación'
      }
    ]
    guardarDocentesEnStorage()
  }

  const crearMateriasIniciales = () => {
    materias.value = [
      { id: 'MAT001', nombre: 'Gestión de Proyectos', codigo: 'GP-101', creditos: 4 },
      { id: 'MAT002', nombre: 'Redes de Computadora', codigo: 'RC-201', creditos: 5 },
      { id: 'MAT003', nombre: 'Minería de Datos', codigo: 'MD-301', creditos: 4 },
      { id: 'MAT004', nombre: 'Ingeniería de Software', codigo: 'IS-202', creditos: 5 },
      { id: 'MAT005', nombre: 'Aplicación Web 1', codigo: 'AW-301', creditos: 4 },
      { id: 'MAT006', nombre: 'Álgebra', codigo: 'AL-101', creditos: 4 },
      { id: 'MAT007', nombre: 'Física', codigo: 'FI-102', creditos: 4 },
      { id: 'MAT008', nombre: 'POO', codigo: 'PO-201', creditos: 5 },
      { id: 'MAT009', nombre: 'Base de Datos', codigo: 'BD-202', creditos: 5 }
    ]
    guardarMateriasEnStorage()
  }

  // AGREGAR NUEVO HORARIO
  const agregarHorario = (datos) => {
    const nuevoId = `CLS${String(horarios.value.length + 1).padStart(3, '0')}`
    
    const nuevoHorario = {
      id: nuevoId,
      docenteId: datos.docenteId,
      docenteNombre: datos.docenteNombre,
      materiaId: datos.materiaId,
      materiaNombre: datos.materiaNombre,
      especialidad: datos.especialidad,
      semestre: datos.semestre,
      paralelo: datos.paralelo,
      curso: datos.curso,
      dia: datos.dia,
      horaInicio: datos.horaInicio,
      horaFin: datos.horaFin,
      franjaHoraria: datos.franjaHoraria,
      fechaCreacion: new Date().toISOString(),
      estado: 'activo'
    }
    
    console.log('➕ Agregando horario:', nuevoHorario)
    horarios.value.push(nuevoHorario)
    guardarHorariosEnStorage()
    console.log('✅ Total horarios después de agregar:', horarios.value.length)
    
    return nuevoId
  }

  // ELIMINAR HORARIO
  const eliminarHorario = (dia, franjaHoraria) => {
    const index = horarios.value.findIndex(h => 
      h.dia === dia && h.franjaHoraria === franjaHoraria
    )
    
    if (index !== -1) {
      const eliminado = horarios.value.splice(index, 1)
      guardarHorariosEnStorage()
      console.log(`🗑️ Horario eliminado:`, eliminado[0])
      return true
    }
    console.warn('⚠️ No se encontró el horario para eliminar')
    return false
  }

  // LIMPIAR TODOS LOS HORARIOS
  const limpiarTodosLosHorarios = () => {
    horarios.value = []
    guardarHorariosEnStorage()
    console.log('🗑️ Todos los horarios eliminados')
    return true
  }

  // EXPORTAR A XML
  const generarXML = () => {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<sistemaHorarios>\n'
    
    // Metadata
    xml += '  <metadata>\n'
    xml += '    <institucion>ULEAM</institucion>\n'
    xml += `    <fechaGeneracion>${new Date().toISOString().split('T')[0]}</fechaGeneracion>\n`
    xml += `    <totalHorarios>${horarios.value.length}</totalHorarios>\n`
    xml += '  </metadata>\n\n'
    
    // Docentes
    xml += '  <docentes>\n'
    docentes.value.forEach(docente => {
      xml += `    <docente id="${docente.id}">\n`
      xml += `      <nombre>${docente.nombre}</nombre>\n`
      xml += `      <email>${docente.email}</email>\n`
      xml += `      <especialidad>${docente.especialidad}</especialidad>\n`
      xml += '    </docente>\n'
    })
    xml += '  </docentes>\n\n'
    
    // Materias
    xml += '  <materias>\n'
    materias.value.forEach(materia => {
      xml += `    <materia id="${materia.id}">\n`
      xml += `      <nombre>${materia.nombre}</nombre>\n`
      xml += `      <codigo>${materia.codigo}</codigo>\n`
      xml += `      <creditos>${materia.creditos}</creditos>\n`
      xml += '    </materia>\n'
    })
    xml += '  </materias>\n\n'
    
    // Horarios
    xml += '  <horarios>\n'
    horarios.value.forEach(horario => {
      xml += `    <clase id="${horario.id}">\n`
      xml += `      <docenteRef idDocente="${horario.docenteId}"/>\n`
      xml += `      <materiaRef idMateria="${horario.materiaId}"/>\n`
      xml += '      <detalles>\n'
      xml += `        <especialidad>${horario.especialidad}</especialidad>\n`
      xml += `        <semestre>${horario.semestre}</semestre>\n`
      xml += `        <paralelo>${horario.paralelo}</paralelo>\n`
      xml += `        <curso>${horario.curso}</curso>\n`
      xml += '      </detalles>\n'
      xml += '      <horario>\n'
      xml += `        <dia>${horario.dia}</dia>\n`
      xml += `        <horaInicio>${horario.horaInicio}</horaInicio>\n`
      xml += `        <horaFin>${horario.horaFin}</horaFin>\n`
      xml += `        <franjaHoraria>${horario.franjaHoraria}</franjaHoraria>\n`
      xml += '      </horario>\n'
      xml += `      <estado>${horario.estado}</estado>\n`
      xml += `      <fechaCreacion>${horario.fechaCreacion}</fechaCreacion>\n`
      xml += '    </clase>\n'
    })
    xml += '  </horarios>\n'
    
    xml += '</sistemaHorarios>'
    
    return xml
  }

  // DESCARGAR XML
  const descargarXML = (nombreArchivo) => {
    if (!nombreArchivo) {
      const fecha = new Date().toISOString().split('T')[0]
      nombreArchivo = `horarios_uleam_${fecha}.xml`
    }
    
    const xmlString = generarXML()
    const blob = new Blob([xmlString], { type: 'text/xml' })
    const url = URL.createObjectURL(blob)
    
    const a = document.createElement('a')
    a.href = url
    a.download = nombreArchivo
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    console.log(`✅ XML descargado: ${nombreArchivo}`)
  }

  // OBTENER ESTADÍSTICAS
  const obtenerEstadisticas = () => {
    return {
      totalHorarios: horarios.value.length,
      totalDocentes: docentes.value.length,
      totalMaterias: materias.value.length,
      horariosPorDia: {
        lunes: horarios.value.filter(h => h.dia === 'lunes').length,
        martes: horarios.value.filter(h => h.dia === 'martes').length,
        miercoles: horarios.value.filter(h => h.dia === 'miercoles').length,
        jueves: horarios.value.filter(h => h.dia === 'jueves').length,
        viernes: horarios.value.filter(h => h.dia === 'viernes').length
      }
    }
  }

  // Inicializar al montar
  onMounted(() => {
    inicializar()
  })

  return {
    horarios,
    docentes,
    materias,
    inicializar,
    agregarHorario,
    eliminarHorario,
    limpiarTodosLosHorarios,
    cargarHorariosDesdeStorage,
    descargarXML,
    obtenerEstadisticas
  }
}