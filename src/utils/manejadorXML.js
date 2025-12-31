class XMLHorarioManager {
    constructor() {
        this.grupos = [];
        this.docentes = [];
        this.materias = [];
        this.storageKey = 'gruposHorariosULEAM';
        this.docentesKey = 'docentesULEAM';
        this.materiasKey = 'materiasULEAM';
    }

    // ============================================
    // INICIALIZACIÓN Y CARGA DE DATOS
    // ============================================
    inicializar() {
        // Cargar datos desde localStorage
        this.cargarGruposDesdeStorage();
        this.cargarDocentesDesdeStorage();
        this.cargarMateriasDesdeStorage();
        
        // Si no hay datos iniciales, crear datos de ejemplo
        if (this.docentes.length === 0) {
            this.crearDocentesIniciales();
        }
        if (this.materias.length === 0) {
            this.crearMateriasIniciales();
        }
        
        console.log("✅ Sistema XML con grupos inicializado");
        console.log(`📚 Docentes: ${this.docentes.length}`);
        console.log(`📖 Materias: ${this.materias.length}`);
        console.log(`📦 Grupos guardados: ${this.grupos.length}`);
        
        // Contar total de horarios
        const totalHorarios = this.grupos.reduce((sum, g) => sum + g.horarios.length, 0);
        console.log(`🕐 Total de horarios: ${totalHorarios}`);
    }

    // ============================================
    // GESTIÓN DE LOCALSTORAGE
    // ============================================
    cargarGruposDesdeStorage() {
        const datos = localStorage.getItem(this.storageKey);
        this.grupos = datos ? JSON.parse(datos) : [];
    }

    guardarGruposEnStorage() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.grupos));
        console.log(`💾 ${this.grupos.length} grupos guardados en localStorage`);
    }

    cargarDocentesDesdeStorage() {
        const datos = localStorage.getItem(this.docentesKey);
        this.docentes = datos ? JSON.parse(datos) : [];
    }

    guardarDocentesEnStorage() {
        localStorage.setItem(this.docentesKey, JSON.stringify(this.docentes));
    }

    cargarMateriasDesdeStorage() {
        const datos = localStorage.getItem(this.materiasKey);
        this.materias = datos ? JSON.parse(datos) : [];
    }

    guardarMateriasEnStorage() {
        localStorage.setItem(this.materiasKey, JSON.stringify(this.materias));
    }

    // ============================================
    // DATOS INICIALES (CATÁLOGOS)  
    // ============================================
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

    // ============================================
    // OBTENER DATOS 
    // ============================================
    obtenerDocentes() {
        return this.docentes;
    }

    obtenerMaterias() {
        return this.materias;
    }

    obtenerGrupos() {
        return this.grupos;
    }

    obtenerTodosLosHorarios() {
        // Retorna todos los horarios de todos los grupos en un solo array
        const todosLosHorarios = [];
        this.grupos.forEach(grupo => {
            todosLosHorarios.push(...grupo.horarios);
        });
        return todosLosHorarios;
    }

    // ============================================
    // GESTIÓN DE GRUPOS
    // ============================================
    agregarGrupoHorarios(nombreGrupo, horariosArray) {
        const nuevoGrupo = {
            id: `GRP${String(this.grupos.length + 1).padStart(3, '0')}`,
            nombre: nombreGrupo,
            fechaCreacion: new Date().toISOString(),
            horarios: horariosArray.map((h, index) => ({
                id: `CLS${String(index + 1).padStart(3, '0')}`,
                ...h
            }))
        };
        
        this.grupos.push(nuevoGrupo);
        this.guardarGruposEnStorage();
        
        console.log(`✅ Grupo "${nombreGrupo}" creado con ${horariosArray.length} horarios`);
        return nuevoGrupo.id;
    }

    eliminarGrupo(indiceGrupo) {
        if (indiceGrupo >= 0 && indiceGrupo < this.grupos.length) {
            const eliminado = this.grupos.splice(indiceGrupo, 1);
            this.guardarGruposEnStorage();
            console.log(`🗑️ Grupo eliminado:`, eliminado[0]);
            return true;
        }
        return false;
    }

    limpiarTodosLosGrupos() {
        this.grupos = [];
        this.guardarGruposEnStorage();
        console.log('🗑️ Todos los grupos eliminados');
    }

    // ============================================
    // EXPORTAR A XML
    // ============================================
    generarXML(indiceGrupo = null) {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<sistemaHorarios>\n';
        
        // Metadata
        xml += '  <metadata>\n';
        xml += '    <institucion>ULEAM</institucion>\n';
        xml += `    <fechaGeneracion>${new Date().toISOString().split('T')[0]}</fechaGeneracion>\n`;
        
        if (indiceGrupo !== null && indiceGrupo >= 0 && indiceGrupo < this.grupos.length) {
            const grupo = this.grupos[indiceGrupo];
            xml += `    <tipoExportacion>grupo_individual</tipoExportacion>\n`;
            xml += `    <grupoId>${grupo.id}</grupoId>\n`;
            xml += `    <grupoNombre>${grupo.nombre}</grupoNombre>\n`;
            xml += `    <totalHorarios>${grupo.horarios.length}</totalHorarios>\n`;
        } else {
            xml += `    <tipoExportacion>todos_los_grupos</tipoExportacion>\n`;
            xml += `    <totalGrupos>${this.grupos.length}</totalGrupos>\n`;
            const totalHorarios = this.grupos.reduce((sum, g) => sum + g.horarios.length, 0);
            xml += `    <totalHorarios>${totalHorarios}</totalHorarios>\n`;
        }
        
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
        
        // Grupos y horarios
        xml += '  <grupos>\n';
        
        const gruposAExportar = indiceGrupo !== null 
            ? [this.grupos[indiceGrupo]] 
            : this.grupos;
        
        gruposAExportar.forEach(grupo => {
            xml += `    <grupo id="${grupo.id}">\n`;
            xml += `      <nombre>${grupo.nombre}</nombre>\n`;
            xml += `      <fechaCreacion>${grupo.fechaCreacion}</fechaCreacion>\n`;
            xml += `      <totalClases>${grupo.horarios.length}</totalClases>\n`;
            xml += '      <horarios>\n';
            
            grupo.horarios.forEach(horario => {
                xml += `        <clase id="${horario.id}">\n`;
                xml += `          <docenteRef idDocente="${horario.docenteId}"/>\n`;
                xml += `          <materiaRef idMateria="${horario.materiaId}"/>\n`;
                xml += '          <detalles>\n';
                xml += `            <especialidad>${horario.especialidad}</especialidad>\n`;
                xml += `            <semestre>${horario.semestre}</semestre>\n`;
                xml += `            <paralelo>${horario.paralelo}</paralelo>\n`;
                xml += `            <curso>${horario.curso}</curso>\n`;
                xml += '          </detalles>\n';
                xml += '          <horario>\n';
                xml += `            <dia>${horario.dia}</dia>\n`;
                xml += `            <horaInicio>${horario.horaInicio}</horaInicio>\n`;
                xml += `            <horaFin>${horario.horaFin}</horaFin>\n`;
                xml += `            <franjaHoraria>${horario.franjaHoraria}</franjaHoraria>\n`;
                xml += '          </horario>\n';
                xml += '        </clase>\n';
            });
            
            xml += '      </horarios>\n';
            xml += '    </grupo>\n';
        });
        
        xml += '  </grupos>\n';
        xml += '</sistemaHorarios>';
        
        return xml;
    }

    // DESCARGAR XML
    descargarXML(nombreArchivo = null, indiceGrupo = null) {
        if (!nombreArchivo) {
            if (indiceGrupo !== null && indiceGrupo >= 0 && indiceGrupo < this.grupos.length) {
                const grupo = this.grupos[indiceGrupo];
                const fecha = new Date().toISOString().split('T')[0];
                nombreArchivo = `horarios_${grupo.nombre.replace(/\s+/g, '_')}_${fecha}.xml`;
            } else {
                const fecha = new Date().toISOString().split('T')[0];
                nombreArchivo = `horarios_uleam_todos_${fecha}.xml`;
            }
        }
        
        const xmlString = this.generarXML(indiceGrupo);
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

    // ============================================
    // ESTADÍSTICAS
    // ============================================
    obtenerEstadisticas() {
        const totalHorarios = this.grupos.reduce((sum, g) => sum + g.horarios.length, 0);
        
        const horariosPorDia = {
            lunes: 0,
            martes: 0,
            miercoles: 0,
            jueves: 0,
            viernes: 0
        };
        
        this.grupos.forEach(grupo => {
            grupo.horarios.forEach(h => {
                if (horariosPorDia[h.dia] !== undefined) {
                    horariosPorDia[h.dia]++;
                }
            });
        });
        
        return {
            totalGrupos: this.grupos.length,
            totalHorarios,
            totalDocentes: this.docentes.length,
            totalMaterias: this.materias.length,
            horariosPorDia
        };
    }

    // ============================================
    // UTILIDADES
    // ============================================
    buscarDocentePorId(id) {
        return this.docentes.find(d => d.id === id);
    }

    buscarMateriaPorId(id) {
        return this.materias.find(m => m.id === id);
    }
}

// INSTANCIA GLOBAL
const xmlManager = new XMLHorarioManager();

export default xmlManager;