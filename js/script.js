/* =========================================================
   1. FONDO OSCURO DETRÁS DEL TRABAJO ABIERTO
   ========================================================= */

const fondoModal = document.createElement("div");
fondoModal.className = "fondo-modal";
document.body.appendChild(fondoModal);


/* =========================================================
   2. QUITAR FOTOS QUE NO EXISTEN
   Si una foto no carga (no la subiste o el nombre está mal),
   se quita sola. Si un trabajo se queda sin fotos, se quita entero.
   ========================================================= */

function quitarFoto(img) {
    const imagen = img.closest(".imagen");
    const trabajo = img.closest(".trabajo");

    imagen.remove();

    if (!trabajo.querySelector(".imagen")) {
        trabajo.remove();
    }
}

document.querySelectorAll(".imagen img").forEach((img) => {
    if (img.complete && img.naturalWidth === 0) {
        quitarFoto(img);              // ya falló antes de llegar aquí
    } else {
        img.addEventListener("error", () => quitarFoto(img), { once: true });
    }
});


/* =========================================================
   3. ABRIR Y CERRAR TRABAJOS
   ========================================================= */

function cerrarTodos() {
    document.querySelectorAll(".trabajo.activa").forEach((trabajo) => {
        trabajo.classList.remove("activa");
        trabajo.querySelectorAll(".imagen").forEach((imagen) => {
            imagen.classList.remove("foto-activa");
        });
    });
    document.body.classList.remove("modal-abierto");
}

function abrirTrabajo(trabajo) {
    cerrarTodos();
    trabajo.classList.add("activa");
    document.body.classList.add("modal-abierto");

    trabajo.querySelector(".carrusel").scrollLeft = 0;
    actualizarFotoActiva(trabajo);
}

document.querySelectorAll(".trabajo").forEach((trabajo) => {
    const ficha = trabajo.querySelector(".ficha");
    const carrusel = trabajo.querySelector(".carrusel");

    // Botón para cerrar (se crea aquí, no hace falta en el HTML)
    const botonCerrar = document.createElement("button");
    botonCerrar.type = "button";
    botonCerrar.className = "cerrar";
    botonCerrar.setAttribute("aria-label", "Cerrar galería");
    botonCerrar.textContent = "✕";
    botonCerrar.addEventListener("click", (evento) => {
        evento.stopPropagation();
        cerrarTodos();
    });
    ficha.appendChild(botonCerrar);

    // Tocar la ficha cerrada la abre
    trabajo.addEventListener("click", () => {
        if (!trabajo.classList.contains("activa")) {
            abrirTrabajo(trabajo);
        }
    });

    // Al deslizar, se recalcula cuál foto es la protagonista
    let pendiente = false;
    carrusel.addEventListener("scroll", () => {
        if (!trabajo.classList.contains("activa") || pendiente) return;

        pendiente = true;
        requestAnimationFrame(() => {
            actualizarFotoActiva(trabajo);
            pendiente = false;
        });
    });
});

// Tocar el fondo oscuro o presionar Escape también cierra
fondoModal.addEventListener("click", cerrarTodos);
document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") cerrarTodos();
});


/* =========================================================
   4. FOTO PROTAGONISTA
   La foto más cercana al centro del carrusel recibe "foto-activa"
   ========================================================= */

function actualizarFotoActiva(trabajo) {
    const carrusel = trabajo.querySelector(".carrusel");
    const imagenes = trabajo.querySelectorAll(".carrusel .imagen");

    const rectCarrusel = carrusel.getBoundingClientRect();
    const centroCarrusel = rectCarrusel.left + rectCarrusel.width / 2;

    let imagenMasCercana = null;
    let distanciaMenor = Infinity;

    imagenes.forEach((imagen) => {
        const rect = imagen.getBoundingClientRect();
        const centroImagen = rect.left + rect.width / 2;
        const distancia = Math.abs(centroCarrusel - centroImagen);

        if (distancia < distanciaMenor) {
            distanciaMenor = distancia;
            imagenMasCercana = imagen;
        }
    });

    imagenes.forEach((imagen) => imagen.classList.remove("foto-activa"));

    if (imagenMasCercana) {
        imagenMasCercana.classList.add("foto-activa");
    }
}
