document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const nombre = params.get("nombre");
    const precio = params.get("precio");
    const imagen = params.get("imagen");
    const descripcion = params.get("descripcion");
    
    const productoDetalleContainer = document.getElementById("producto-detalle");
    
    if (nombre && precio && imagen) {
        productoDetalleContainer.innerHTML = `
            <img src="imgs/${imagen}" alt="${nombre}" class="imagen-producto-detalle">
            <h2>${nombre}</h2>
            <p><b>Precio:</b> ${precio}</p>
            <p><b>Descripción:</b> ${descripcion}</p>
        `;
    } else {
        productoDetalleContainer.innerHTML = "<p>No se encontraron detalles del producto.</p>";
    }
});

fetch("header.html")
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al cargar el header.");
        }
        return response.text();
    })
    .then(data => document.getElementById("header-container").innerHTML = data)
    .catch(error => console.error("Error:", error));