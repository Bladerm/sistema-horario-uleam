class XMLHorarioManager {
    constructor() {
        this.horarios = [];
        this.docentes = [];
        this.materias = [];
        this.storageKey = 'horariosULEAM';
        this.docentesKey = 'docentesULEAM';
        this.materiasKey = 'materiasULEAM';
    }

    // INICIALIZACIÓN Y CARGA DE DATOS
    inicializar() {
        // Cargar datos desde localStorage
        this.cargarHorariosDesdeStorage();
        this.cargarDocentesDesdeStorage();
        this.cargarMateriasDesdeStorage();
        
        // Si no hay datos iniciales, crear datos de ejemplo
        if (this.docentes.length === 0) {
            this.crearDocentesIniciales();
        }
        if (this.materias.length === 0) {
            this.crearMateriasIniciales();
        }
        
        console.log("✅ Sistema XML inicializado");
        console.log(`📚 Docentes: ${this.docentes.length}`);
        console.log(`📖 Materias: ${this.materias.length}`);
        console.log(`🕐 Horarios guardados: ${this.horarios.length}`);
    }

    // GESTIÓN DE LOCALSTORAGE
    cargarHorariosDesdeStorage() {
        const datos = localStorage.getItem(this.storageKey);
        this.horarios = datos ? JSON.parse(datos) : [];
    }

    cargarDocentesDesdeStorage() {
        const datos = localStorage.getItem(this.docentesKey);
        this.docentes = datos ? JSON.parse(datos) : [];
    }

    cargarMateriasDesdeStorage() {
        const datos = localStorage.getItem(this.materiasKey);
        this.materias = datos ? JSON.parse(datos) : [];
    }

    guardarHorariosEnStorage() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.horarios));
        console.log(`💾 ${this.horarios.length} horarios guardados en localStorage`);
    }

    guardarDocentesEnStorage() {
        localStorage.setItem(this.docentesKey, JSON.stringify(this.docentes));
    }

    guardarMateriasEnStorage() {
        localStorage.setItem(this.materiasKey, JSON.stringify(this.materias));
    }

    // DATOS INICIALES (CATÁLOGOS)  
    crearDocentesIniciales() {
        this.docentes = [
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
        ];
        this.guardarDocentesEnStorage();
    }

    crearMateriasIniciales() {
        this.materias = [
            { id: 'MAT001', nombre: 'Gestión de Proyectos', codigo: 'GP-101', creditos: 4 },
            { id: 'MAT002', nombre: 'Redes de Computadora', codigo: 'RC-201', creditos: 5 },
            { id: 'MAT003', nombre: 'Minería de Datos', codigo: 'MD-301', creditos: 4 },
            { id: 'MAT004', nombre: 'Ingeniería de Software', codigo: 'IS-202', creditos: 5 },
            { id: 'MAT005', nombre: 'Aplicación Web 1', codigo: 'AW-301', creditos: 4 },
            { id: 'MAT006', nombre: 'Álgebra', codigo: 'AL-101', creditos: 4 },
            { id: 'MAT007', nombre: 'Física', codigo: 'FI-102', creditos: 4 },
            { id: 'MAT008', nombre: 'POO', codigo: 'PO-201', creditos: 5 },
            { id: 'MAT009', nombre: 'Base de Datos', codigo: 'BD-202', creditos: 5 }
        ];
        this.guardarMateriasEnStorage();
    }

    // OBTENER DATOS 
    obtenerDocentes() {
        return this.docentes;
    }

    obtenerMaterias() {
        return this.materias;
    }

    obtenerHorarios() {
        return this.horarios;
    }


    // AGREGAR NUEVO HORARIO
    agregarHorario(datos) {
        // Generar ID único
        const nuevoId = `CLS${String(this.horarios.length + 1).padStart(3, '0')}`;
        
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
        };
        
        this.horarios.push(nuevoHorario);
        this.guardarHorariosEnStorage();
        
        console.log(`✅ Horario ${nuevoId} agregado`);
        return nuevoId;
    }

    // ELIMINAR HORARIO
    eliminarHorario(dia, franjaHoraria) {
        const index = this.horarios.findIndex(h => 
            h.dia === dia && h.franjaHoraria === franjaHoraria
        );
        
        if (index !== -1) {
            const eliminado = this.horarios.splice(index, 1);
            this.guardarHorariosEnStorage();
            console.log(`🗑️ Horario eliminado:`, eliminado[0]);
            return true;
        }
        return false;
    }

    // CARGAR HORARIOS EN LA TABLA HTML
    cargarHorariosEnTabla() {
        // Limpiar todas las celdas primero
        const celdas = document.querySelectorAll('.class-cell, .empty-cell');
        celdas.forEach(celda => {
            if (!celda.classList.contains('time-cell')) {
                celda.className = 'empty-cell';
                celda.innerHTML = '';
                celda.onclick = null;
            }
        });

        // Cargar horarios guardados
        this.horarios.forEach(horario => {
            const celda = document.querySelector(
                `td[data-dia="${horario.dia}"][data-hora="${horario.franjaHoraria}"]`
            );
            
            if (celda) {
                celda.className = 'class-cell';
                celda.innerHTML = `
                    <small>
                        ${horario.docenteNombre}<br>
                        ${horario.materiaNombre}<br>
                        ${horario.especialidad}<br>
                        ${horario.semestre} "${horario.paralelo}"<br>
                        ${horario.curso}
                    </small>
                `;
                
                // Agregar evento de eliminación
                celda.onclick = () => {
                    if (confirm('¿Desea eliminar esta clase del horario?')) {
                        this.eliminarHorario(horario.dia, horario.franjaHoraria);
                        celda.className = 'empty-cell';
                        celda.innerHTML = '';
                        celda.onclick = null;
                        mostrarEstado('🗑️ Horario eliminado', 'success');
                    }
                };
            }
        });
        
        console.log(`✅ ${this.horarios.length} horarios cargados en la tabla`);
        return this.horarios.length;
    }

    cargarHorariosEspecificos(indices) {
        // Limpiar tabla
        const celdas = document.querySelectorAll('.class-cell, .empty-cell');
        celdas.forEach(celda => {
            if (!celda.classList.contains('time-cell')) {
                celda.className = 'empty-cell';
                celda.innerHTML = '';
                celda.onclick = null;
            }
        });

        // Cargar solo los horarios seleccionados
        let cargados = 0;
        indices.forEach(index => {
            const horario = this.horarios[index];
            if (!horario) {
                console.log(`⚠️ No se encontró horario en índice ${index}`);
                return;
            }
            
            console.log(`Cargando horario ${index}:`, horario);
            
            const celda = document.querySelector(
                `td[data-dia="${horario.dia}"][data-hora="${horario.franjaHoraria}"]`
            );
            
            if (celda) {
                celda.className = 'class-cell';
                celda.innerHTML = `
                    <small>
                        ${horario.docenteNombre}<br>
                        ${horario.materiaNombre}<br>
                        ${horario.especialidad}<br>
                        ${horario.semestre} "${horario.paralelo}"<br>
                        ${horario.curso}
                    </small>
                `;
                
                celda.onclick = () => {
                    if (confirm('¿Desea eliminar esta clase del horario?')) {
                        this.eliminarHorario(horario.dia, horario.franjaHoraria);
                        celda.className = 'empty-cell';
                        celda.innerHTML = '';
                        celda.onclick = null;
                        mostrarEstado('🗑️ Horario eliminado', 'success');
                    }
                };
                cargados++;
            } else {
                console.log(`⚠️ No se encontró celda para día="${horario.dia}" hora="${horario.franjaHoraria}"`);
            }
        });
        
        console.log(`✅ ${cargados} de ${indices.length} horarios cargados`);
        return cargados;
    }

    // EXPORTAR A XML
    generarXML() {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<sistemaHorarios>\n';
        
        // Metadata
        xml += '  <metadata>\n';
        xml += '    <institucion>ULEAM</institucion>\n';
        xml += `    <fechaGeneracion>${new Date().toISOString().split('T')[0]}</fechaGeneracion>\n`;
        xml += `    <totalHorarios>${this.horarios.length}</totalHorarios>\n`;
        xml += '  </metadata>\n\n';
        
        // Docentes
        xml += '  <docentes>\n';
        this.docentes.forEach(docente => {
            xml += `    <docente id="${docente.id}">\n`;
            xml += `      <nombre>${docente.nombre}</nombre>\n`;
            xml += `      <email>${docente.email}</email>\n`;
            xml += `      <especialidad>${docente.especialidad}</especialidad>\n`;
            xml += '    </docente>\n';
        });
        xml += '  </docentes>\n\n';
        
        // Materias
        xml += '  <materias>\n';
        this.materias.forEach(materia => {
            xml += `    <materia id="${materia.id}">\n`;
            xml += `      <nombre>${materia.nombre}</nombre>\n`;
            xml += `      <codigo>${materia.codigo}</codigo>\n`;
            xml += `      <creditos>${materia.creditos}</creditos>\n`;
            xml += '    </materia>\n';
        });
        xml += '  </materias>\n\n';
        
        // Horarios
        xml += '  <horarios>\n';
        this.horarios.forEach(horario => {
            xml += `    <clase id="${horario.id}">\n`;
            xml += `      <docenteRef idDocente="${horario.docenteId}"/>\n`;
            xml += `      <materiaRef idMateria="${horario.materiaId}"/>\n`;
            xml += '      <detalles>\n';
            xml += `        <especialidad>${horario.especialidad}</especialidad>\n`;
            xml += `        <semestre>${horario.semestre}</semestre>\n`;
            xml += `        <paralelo>${horario.paralelo}</paralelo>\n`;
            xml += `        <curso>${horario.curso}</curso>\n`;
            xml += '      </detalles>\n';
            xml += '      <horario>\n';
            xml += `        <dia>${horario.dia}</dia>\n`;
            xml += `        <horaInicio>${horario.horaInicio}</horaInicio>\n`;
            xml += `        <horaFin>${horario.horaFin}</horaFin>\n`;
            xml += `        <franjaHoraria>${horario.franjaHoraria}</franjaHoraria>\n`;
            xml += '      </horario>\n';
            xml += `      <estado>${horario.estado}</estado>\n`;
            xml += `      <fechaCreacion>${horario.fechaCreacion}</fechaCreacion>\n`;
            xml += '    </clase>\n';
        });
        xml += '  </horarios>\n';
        
        xml += '</sistemaHorarios>';
        
        return xml;
    }

    // DESCARGAR XML
    descargarXML(nombreArchivo) {
        if (!nombreArchivo) {
            const fecha = new Date().toISOString().split('T')[0];
            nombreArchivo = `horarios_uleam_${fecha}.xml`;
        }
        
        const xmlString = this.generarXML();
        const blob = new Blob([xmlString], { type: 'text/xml' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = nombreArchivo;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        console.log(`✅ XML descargado: ${nombreArchivo}`);
    }

    // UTILIDADES
    limpiarTodosLosHorarios() {
        if (confirm('⚠️ ¿Está seguro de eliminar TODOS los horarios? Esta acción no se puede deshacer.')) {
            this.horarios = [];
            this.guardarHorariosEnStorage();
            console.log('🗑️ Todos los horarios eliminados');
            return true;
        }
        return false;
    }

    buscarDocentePorId(id) {
        return this.docentes.find(d => d.id === id);
    }

    buscarMateriaPorId(id) {
        return this.materias.find(m => m.id === id);
    }

    obtenerEstadisticas() {
        return {
            totalHorarios: this.horarios.length,
            totalDocentes: this.docentes.length,
            totalMaterias: this.materias.length,
            horariosPorDia: {
                lunes: this.horarios.filter(h => h.dia === 'lunes').length,
                martes: this.horarios.filter(h => h.dia === 'martes').length,
                miercoles: this.horarios.filter(h => h.dia === 'miercoles').length,
                jueves: this.horarios.filter(h => h.dia === 'jueves').length,
                viernes: this.horarios.filter(h => h.dia === 'viernes').length
            }
        };
    }
}

// INSTANCIA GLOBAL
const xmlManager = new XMLHorarioManager();

export default xmlManager;
