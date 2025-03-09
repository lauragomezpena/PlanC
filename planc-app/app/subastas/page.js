'use client';
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from '../page.module.css';
import Image from "next/image";
import { useRouter } from 'next/navigation'; // Importar useRouter para la navegación

// Importa las imágenes
import img1984 from '../../imgs/1984.jpg';
import imgHarryPotter from '../../imgs/harrypotter.jpg';
import imgHp from '../../imgs/hp.jpg';
import imgMacbookPro from '../../imgs/macbookpro.jpg';
import imgMarioKart from '../../imgs/mariokart.jpg';
import imgFifa25 from '../../imgs/fifa25.jpg';

export default function ResultadosBusqueda() {
  const [productos, setProductos] = useState([]);
  const [productosOrdenados, setProductosOrdenados] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [query, setQuery] = useState('');
  const [orden, setOrden] = useState('ascendente');  // Estado para gestionar el orden de los productos
  const [categoria, setCategoria] = useState('');  // Estado para gestionar la categoría seleccionada

  const router = useRouter(); // Inicializar el hook useRouter

  useEffect(() => {
    // Obtener los parámetros de búsqueda desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get("q") ? urlParams.get("q").toLowerCase() : '';
    setQuery(queryParam);

    // Datos de productos con la propiedad 'categoria'
    const productosData = {
      "libros": [
        { 
          nombre: "1984", 
          precio: 15,  
          imagen: img1984, 
          descripcion: "Una novela distópica de George Orwell que explora un mundo totalitario donde el Gran Hermano lo controla todo.",
          categoria: "libros"
        },
        { 
          nombre: "Harry Potter: Complete edition", 
          precio: 60,  
          imagen: imgHarryPotter, 
          descripcion: "Edición completa de la saga Harry Potter, escrita por J.K. Rowling, que sigue la historia de un joven mago y sus aventuras en Hogwarts.",
          categoria: "libros"
        }
      ],
      "ordenadores": [
        { 
          nombre: "Laptop HP", 
          precio: 400,  
          imagen: imgHp, 
          descripcion: "Portátil HP con procesador Intel Core i5, 8GB de RAM y 256GB SSD, ideal para trabajo y estudio.",
          categoria: "ordenadores"
        },
        { 
          nombre: "MacBook Pro", 
          precio: 700,  
          imagen: imgMacbookPro, 
          descripcion: "Potente MacBook Pro con chip M1, pantalla Retina y diseño ligero, perfecto para profesionales creativos.",
          categoria: "ordenadores"
        }
      ],
      "videojuegos": [
        { 
          nombre: "Mario Kart Deluxe", 
          precio: 60,  
          imagen: imgMarioKart, 
          descripcion: "Divertido juego de carreras con personajes de Nintendo, ideal para jugar con amigos y familia.",
          categoria: "videojuegos"
        },
        { 
          nombre: "FIFA 25", 
          precio: 70,  
          imagen: imgFifa25, 
          descripcion: "Última entrega de la saga FIFA, con gráficos mejorados y jugabilidad realista para los amantes del fútbol.",
          categoria: "videojuegos"
        }
      ]
    };

    // Buscar los productos según la consulta
    if (productosData[query]) {
      setProductos(productosData[query]);
      setMensaje('');
    } else {
      setProductos([]);
      setMensaje('No se encontraron resultados.');
    }
  }, [query]);  // Agregar query en las dependencias de useEffect

  // Filtrar y ordenar los productos por categoría y precio
  useEffect(() => {
    // Filtrar por categoría si está seleccionada
    let productosFiltrados = productos;
    if (categoria) {
      productosFiltrados = productos.filter(producto => producto.categoria === categoria);
    }

    // Ordenar los productos por precio
    const productosOrdenados = [...productosFiltrados].sort((a, b) => {
      return orden === "ascendente" ? a.precio - b.precio : b.precio - a.precio;
    });

    setProductosOrdenados(productosOrdenados);
  }, [orden, productos, categoria]);  // Se actualiza cuando cambian productos, orden o categoría

  // Función para volver a la página de inicio
  const volver = () => {
    router.push('/inicio');  // Redirige a la página de inicio
  };

  return (
    <div>
      <Header />

      <main>
        <h1>Resultados de búsqueda</h1>

        {/* Filtro de categoría */}
        <div className={styles.filtro}>
          <label htmlFor="categoria">Filtrar por categoría:</label>
          <select id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="">Todas</option>
            <option value="libros">Libros</option>
            <option value="ordenadores">Ordenadores</option>
            <option value="videojuegos">Videojuegos</option>
          </select>
        </div>

        {/* Filtro de ordenamiento */}
        <div className={styles.filtro}>
          <label htmlFor="precio">Filtrar por precio:</label>
          <select id="precio" value={orden} onChange={(e) => setOrden(e.target.value)}>
            <option value="ascendente">Menor a mayor</option>
            <option value="descendente">Mayor a menor</option>
          </select>
        </div>

        {/* Resultados */}
        {mensaje ? (
          <p>{mensaje}</p>
        ) : (
          <div id="resultados" className="resultados-container">
            {productosOrdenados.map((producto, index) => (
              <div key={index} className="producto">
                <a
                  href={`producto.html?nombre=${encodeURIComponent(producto.nombre)}&precio=${encodeURIComponent(producto.precio)}&imagen=${encodeURIComponent(producto.imagen)}&descripcion=${encodeURIComponent(producto.descripcion)}`}
                >
                  <Image
                    src={producto.imagen}  // Usa la imagen importada
                    alt={producto.nombre}
                    className="imagen-producto"
                    height={100}
                    width={100}
                  />
                  <p><b>{producto.nombre}</b></p>
                  <p>Precio: {producto.precio}€</p>
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Botón de volver */}
        <button onClick={volver}>Volver</button>
      </main>

      <Footer />
    </div>
  );
}
