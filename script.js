document.addEventListener('DOMContentLoaded', () => {
    const curriculumGrid = document.getElementById('curriculum-grid');
    const motivationalMessageElement = document.getElementById('motivational-message');
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    const closeButton = document.querySelector('.close-button');

    // Malla curricular con ramos y sus requisitos (inventados)
    const semesters = {
        'I SEMESTRE': ['Biología Optativa', 'Química básica', 'Biofísica', 'Bioética y Bienestar en Salud Animal', 'Introducción a las ciencias veterinarias', 'Libre Elección I', 'Inglés I'],
        'II SEMESTRE': ['Histología y Embriología', 'Anatomía Comparada', 'Bioquímica', 'Biofísica II', 'Inglés II', 'Libre Elección II', 'Inglés III'],
        'III SEMESTRE': ['Biología Molecular Avanzada', 'Fisiología', 'Optativo (Suelos y Plantas)', 'Inmunología', 'Bioestadística', 'Inglés IV', 'Libre Elección III'],
        'IV SEMESTRE': ['Genética', 'Virología', 'Bacteriología y Micología', 'Parasitología', 'Nutrición', 'Libre Elección IV'],
        'V SEMESTRE': ['Semiología', 'Farmacología', 'Mecanismos de Enfermedad', 'Imagenología', 'Sociedades Rurales', 'Libre Elección V'],
        'VI SEMESTRE': ['Cirugía I', 'Patología Clínica', 'Patología Sistémica', 'Optativo (Medicina 1)', 'Política Agropecuaria', 'Libre Elección VI'],
        'VII SEMESTRE': ['Cirugía II', 'Toxicología', 'Epidemiología', 'Medicina Aviar', 'Optativo (SP2)', 'Planeación y Evaluación', 'Extensión y Desarrollo Rural'],
        'VIII SEMESTRE': ['Medicina Interna de Pequeños', 'Medicina Interna de Rumiantes', 'Salud Pública', 'Salud de Hato', 'Teriogenología I', 'Trabajo de Campo Optativo'],
        'IX SEMESTRE': ['Medicina Interna de Equinos', 'Medicina Interna de Porcinos', 'Clínica de la Reproducción', 'Rotación por Laboratorios', 'Línea de Profundización I'],
        'X SEMESTRE': ['Clínica de Grandes Animales', 'Clínica de Pequeños Animales', 'Línea de Profundización II'],
        'XI SEMESTRE': ['Prácticas Integradas de Campo'],
        'XII SEMESTRE': ['Trabajo de Grado']
    };

    // Requisitos (inventados)
    const requirements = {
        'Histología y Embriología': ['Biología Optativa'],
        'Anatomía Comparada': ['Química básica'],
        'Bioquímica': ['Química básica'],
        'Biofísica II': ['Biofísica'],
        'Inglés II': ['Inglés I'],
        'Biología Molecular Avanzada': ['Biología Optativa', 'Bioquímica'],
        'Fisiología': ['Anatomía Comparada'],
        'Inmunología': ['Bioquímica'],
        'Bioestadística': ['Introducción a las ciencias veterinarias'],
        'Inglés IV': ['Inglés III'],
        'Genética': ['Biología Molecular Avanzada'],
        'Virología': ['Inmunología'],
        'Bacteriología y Micología': ['Inmunología'],
        'Parasitología': ['Biología Molecular Avanzada'],
        'Nutrición': ['Bioquímica'],
        'Semiología': ['Fisiología', 'Anatomía Comparada'],
        'Farmacología': ['Fisiología', 'Bioquímica'],
        'Mecanismos de Enfermedad': ['Fisiología', 'Inmunología'],
        'Imagenología': ['Anatomía Comparada'],
        'Cirugía I': ['Anatomía Comparada', 'Semiología'],
        'Patología Clínica': ['Bacteriología y Micología', 'Parasitología'],
        'Patología Sistémica': ['Patología Clínica', 'Mecanismos de Enfermedad'],
        'Optativo (Medicina 1)': ['Farmacología'],
        'Cirugía II': ['Cirugía I'],
        'Toxicología': ['Farmacología'],
        'Epidemiología': ['Bioestadística'],
        'Medicina Aviar': ['Patología Sistémica'],
        'Optativo (SP2)': ['Semiología'],
        'Medicina Interna de Pequeños': ['Semiología', 'Patología Sistémica'],
        'Medicina Interna de Rumiantes': ['Semiología', 'Patología Sistémica'],
        'Salud Pública': ['Epidemiología'],
        'Salud de Hato': ['Epidemiología', 'Nutrición'],
        'Teriogenología I': ['Fisiología'],
        'Medicina Interna de Equinos': ['Medicina Interna de Pequeños'],
        'Medicina Interna de Porcinos': ['Medicina Interna de Rumiantes'],
        'Clínica de la Reproducción': ['Teriogenología I'],
        'Rotación por Laboratorios': ['Patología Clínica'],
        'Línea de Profundización I': ['Medicina Interna de Pequeños', 'Medicina Interna de Rumiantes'],
        'Clínica de Grandes Animales': ['Medicina Interna de Equinos', 'Medicina Interna de Rumiantes'],
        'Clínica de Pequeños Animales': ['Medicina Interna de Pequeños'],
        'Línea de Profundización II': ['Línea de Profundización I'],
        'Prácticas Integradas de Campo': ['Clínica de Grandes Animales', 'Clínica de Pequeños Animales', 'Línea de Profundización II'],
        'Trabajo de Grado': ['Prácticas Integradas de Campo']
    };

    // Mensajes motivacionales (inventados)
    const motivationalMessages = [
        "¡Cada paso te acerca más a tu sueño veterinario!",
        "La pasión por los animales es el motor que te impulsa. ¡Sigue adelante!",
        "Con cada ramo aprobado, crece tu conocimiento y tu capacidad de sanar.",
        "El camino es desafiante, pero la recompensa es invaluable: una vida dedicada a quienes más lo necesitan.",
        "Recuerda por qué empezaste. ¡Tu futuro yo te lo agradecerá!",
        "Eres capaz de lograr todo lo que te propongas. ¡Confía en tu potencial!",
        "Hoy es un buen día para aprender algo nuevo y un paso más cerca de tu meta.",
        "Cada animal que ayudes será un testimonio de tu esfuerzo y dedicación."
    ];

    let approvedCourses = JSON.parse(localStorage.getItem('approvedCourses')) || {};

    // Función para mostrar un mensaje motivacional aleatorio
    const displayMotivationalMessage = () => {
        const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
        motivationalMessageElement.textContent = motivationalMessages[randomIndex];
    };

    // Función para verificar si un ramo está aprobado
    const isApproved = (courseName) => {
        return approvedCourses[courseName];
    };

    // Función para verificar si un ramo está bloqueado (si sus requisitos no están cumplidos)
    const isBlocked = (courseName) => {
        if (!requirements[courseName]) {
            return false; // No tiene requisitos, no está bloqueado
        }
        return requirements[courseName].some(req => !isApproved(req));
    };

    // Función para obtener los requisitos faltantes de un ramo
    const getMissingRequirements = (courseName) => {
        if (!requirements[courseName]) {
            return [];
        }
        return requirements[courseName].filter(req => !isApproved(req));
    };

    // Función para renderizar la malla curricular
    const renderCurriculum = () => {
        curriculumGrid.innerHTML = ''; // Limpiar la malla antes de renderizar
        Object.entries(semesters).forEach(([semesterName, courses]) => {
            const semesterColumn = document.createElement('div');
            semesterColumn.classList.add('semester-column');
            semesterColumn.innerHTML = `<h2>${semesterName}</h2><ul class="course-list"></ul>`;
            const courseList = semesterColumn.querySelector('.course-list');

            courses.forEach(courseName => {
                const courseItem = document.createElement('li');
                courseItem.classList.add('course-item');
                courseItem.textContent = courseName;
                courseItem.dataset.courseName = courseName;

                if (isApproved(courseName)) {
                    courseItem.classList.add('approved');
                } else if (isBlocked(courseName)) {
                    courseItem.classList.add('blocked');
                }

                courseItem.addEventListener('click', () => {
                    handleCourseClick(courseName, courseItem);
                });
                courseList.appendChild(courseItem);
            });
            curriculumGrid.appendChild(semesterColumn);
        });
        displayMotivationalMessage(); // Mostrar un mensaje al renderizar
    };

    // Función para manejar el clic en un ramo
    const handleCourseClick = (courseName, courseItem) => {
        if (isApproved(courseName)) {
            // Si ya está aprobado, no hacer nada o permitir desaprobar (opcional)
            // Para este ejemplo, no permitimos desaprobar fácilmente
            return;
        }

        const missing = getMissingRequirements(courseName);

        if (missing.length > 0) {
            let message = `Para aprobar "${courseName}", necesitas aprobar primero: `;
            message += missing.join(', ');
            showModal(message);
        } else {
            // Marcar como aprobado
            approvedCourses[courseName] = true;
            localStorage.setItem('approvedCourses', JSON.stringify(approvedCourses));
            renderCurriculum(); // Volver a renderizar para actualizar estados
        }
    };

    // Funciones para el modal
    const showModal = (message) => {
        modalMessage.textContent = message;
        modal.style.display = 'flex'; // Usar flex para centrar
    };

    const hideModal = () => {
        modal.style.display = 'none';
    };

    closeButton.addEventListener('click', hideModal);
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            hideModal();
        }
    });

    // Inicializar la malla al cargar la página
    renderCurriculum();
});
