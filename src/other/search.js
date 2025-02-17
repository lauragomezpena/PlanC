document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q") ? params.get("q").toLowerCase() : "";
    const resultadosContainer = document.getElementById("resultados");

    const productos = {
        "libros": [
            { 
                nombre: "1984", 
                precio: "15€", 
                imagen: "1984.jpg", 
                descripcion: "Una novela distópica de George Orwell que explora un mundo totalitario donde el Gran Hermano lo controla todo." 
            },
            { 
                nombre: "Harry Potter: Complete edition", 
                precio: "60€", 
                imagen: "harrypotter.jpg", 
                descripcion: "Edición completa de la saga Harry Potter, escrita por J.K. Rowling, que sigue la historia de un joven mago y sus aventuras en Hogwarts." 
            }
        ],
        "ordenadores": [
            { 
                nombre: "Laptop HP", 
                precio: "400€", 
                imagen: "hp.jpg", 
                descripcion: "Portátil HP con procesador Intel Core i5, 8GB de RAM y 256GB SSD, ideal para trabajo y estudio." 
            },
            { 
                nombre: "MacBook Pro", 
                precio: "700€", 
                imagen: "macbookpro.jpg", 
                descripcion: "Potente MacBook Pro con chip M1, pantalla Retina y diseño ligero, perfecto para profesionales creativos." 
            }],
        "videojuegos": [
            { 
                nombre: "Mario Kart Deluxe", 
                precio: "60€", 
                imagen: "mariokart.jpg", 
                descripcion: "Divertido juego de carreras con personajes de Nintendo, ideal para jugar con amigos y familia." 
            },
            { 
                nombre: "FIFA 25", 
                precio: "70€", 
                imagen: "fifa25.jpg", 
                descripcion: "Última entrega de la saga FIFA, con gráficos mejorados y jugabilidad realista para los amantes del fútbol." 
            }]
    };

    if (productos[query]) {
        productos[query].forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("producto");
            div.innerHTML = `
                <a href="producto.html?nombre=${encodeURIComponent(producto.nombre)}&precio=${encodeURIComponent(producto.precio)}&imagen=${encodeURIComponent(producto.imagen)}&descripcion=${encodeURIComponent(producto.descripcion)}">
                    <img src="imgs/${producto.imagen}" alt="${producto.nombre}" class="imagen-producto">
                    <p><b>${producto.nombre}</b></p>
                    <p>Precio: ${producto.precio}</p>
                </a>
            `;
            resultadosContainer.appendChild(div);
        });
    } else {
        resultadosContainer.innerHTML = "<p>No se encontraron resultados.</p>";
    }
});

// Cargar el header desde header.html
fetch("header.html")
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al cargar el header.");
        }
        return response.text();
    })
    .then(data => document.getElementById("header-container").innerHTML = data)
    .catch(error => console.error("Error:", error));
