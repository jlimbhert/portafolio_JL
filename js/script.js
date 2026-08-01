
const imagenes = document.querySelectorAll(".imagen");

imagenes.forEach((imagen) => {
    imagen.addEventListener("click", () => {

        imagenes.forEach((img) => {
            img.classList.remove("activa");
        });

        imagen.classList.add("activa");

    });
});
