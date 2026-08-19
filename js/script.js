const trabajos = document.querySelectorAll(".trabajo");

trabajos.forEach((trabajo) => {

    trabajo.addEventListener("click", function() {

        trabajo.classList.toggle("activa");

        if (trabajo.classList.contains("activa")) {

            const carrusel = trabajo.querySelector(".carrusel");
            const imagenes = carrusel.querySelectorAll(".imagen");

            if (imagenes.length > 1) {
                carrusel.scrollLeft =
                    imagenes[1].offsetLeft -
                    (carrusel.clientWidth - imagenes[1].clientWidth) / 2;
            }

            actualizarFotoActiva(trabajo);

        } else {

            trabajo.querySelectorAll(".carrusel .imagen").forEach((imagen) => {
                imagen.classList.remove("foto-activa");
            });

        }
    });


    const carrusel = trabajo.querySelector(".carrusel");

    carrusel.addEventListener("scroll", function() {

        if (trabajo.classList.contains("activa")) {
            actualizarFotoActiva(trabajo);
        }

    });
});


function actualizarFotoActiva(trabajo) {

    const imagenes = trabajo.querySelectorAll(".carrusel .imagen");

    const centroTrabajo =
        trabajo.getBoundingClientRect().left +
        trabajo.getBoundingClientRect().width / 2;

    let imagenMasCercana = null;
    let distanciaMenor = Infinity;

    imagenes.forEach((imagen) => {

        const rect = imagen.getBoundingClientRect();

        const centroImagen =
            rect.left + rect.width / 2;

        const distancia =
            Math.abs(centroTrabajo - centroImagen);

        if (distancia < distanciaMenor) {
            distanciaMenor = distancia;
            imagenMasCercana = imagen;
        }
    });

    imagenes.forEach((imagen) => {
        imagen.classList.remove("foto-activa");
    });

    if (imagenMasCercana) {
        imagenMasCercana.classList.add("foto-activa");
    }
}
