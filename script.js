// ========== MENÚ HAMBURGUESA PARA CELULARES ==========
const menuHamburguesa = document.querySelector('.menu-hamburguesa');
const navLinks = document.querySelector('.nav-links');

menuHamburguesa.addEventListener('click', () => {
    navLinks.classList.toggle('activo');
    menuHamburguesa.classList.toggle('abierto');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(enlace => {
    enlace.addEventListener('click', () => {
        navLinks.classList.remove('activo');
        menuHamburguesa.classList.remove('abierto');
    });
});

// ========== EFECTO AL HACER SCROLL EN EL MENÚ ==========
const menu = document.getElementById('menu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        menu.style.padding = '12px 40px';
        menu.style.backgroundColor = 'rgba(30, 30, 30, 0.98)';
    } else {
        menu.style.padding = '20px 40px';
        menu.style.backgroundColor = 'rgba(30, 30, 30, 0.95)';
    }
});

// ========== FILTRO DE TRABAJOS ==========
const botonesFiltro = document.querySelectorAll('.filtros-trabajos button');
const tarjetasTrabajo = document.querySelectorAll('.tarjeta-trabajo');

botonesFiltro.forEach(boton => {
    boton.addEventListener('click', () => {
        // Quitar clase activa de todos
        botonesFiltro.forEach(btn => btn.classList.remove('filtro-activo'));
        // Agregar al botón actual
        boton.classList.add('filtro-activo');

        const categoria = boton.getAttribute('data-categoria');

        tarjetasTrabajo.forEach(tarjeta => {
            if (categoria === 'todos' || tarjeta.getAttribute('data-categoria') === categoria) {
                tarjeta.style.display = 'block';
            } else {
                tarjeta.style.display = 'none';
            }
        });
    });
});

// ========== VALIDACIÓN DE FORMULARIO DE CONTACTO ==========
const formulario = document.getElementById('formulario-contacto');

formulario.addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que se recargue la página

    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    // Validación básica
    if (nombre === '' || correo === '' || mensaje === '') {
        alert('⚠️ Por favor, completa todos los campos.');
        return;
    }

    // Validación de correo electrónico
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
        alert('⚠️ Por favor, ingresa un correo electrónico válido.');
        return;
    }

    // Si todo está bien
    alert('✅ ¡Mensaje enviado con éxito! Gracias por contactarme, te responderé muy pronto.');
    formulario.reset(); // Limpiar formulario
});

// ========== EFECTO DE APARECER ELEMENTOS AL SCROLL ==========
const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            entrada.target.style.opacity = '1';
            entrada.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Aplicar observador a todas las secciones
document.querySelectorAll('.seccion').forEach(seccion => {
    seccion.style.opacity = '0';
    seccion.style.transform = 'translateY(20px)';
    seccion.style.transition = 'all 0.6s ease';
    observador.observe(seccion);
});