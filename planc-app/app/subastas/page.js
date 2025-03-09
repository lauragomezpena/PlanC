'use client';
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';  
import Footer from '../../components/Footer';
import styles from '../page.module.css'
import Image from "next/image";  

export default function ResultadosBusqueda() {
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    // Obtener los parámetros de búsqueda desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get("q") ? urlParams.get("q").toLowerCase() : '';
    setQuery(queryParam);

    // Datos de productos
    const productosData = {
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
        }
      ],
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

  return (
    <div>
      <Header />
      
      <main>
        <h1>Resultados de búsqueda</h1>
        {mensaje ? (
          <p>{mensaje}</p>
        ) : (
          <div id="resultados" className="resultados-container">
            {productos.map((producto, index) => (
              <div key={index} className="producto">
                <a href={`producto.html?nombre=${encodeURIComponent(producto.nombre)}&precio=${encodeURIComponent(producto.precio)}&imagen=${encodeURIComponent(producto.imagen)}&descripcion=${encodeURIComponent(producto.descripcion)}`}>
                  <Image src={`/../../imgs/${producto.imagen}`} alt={producto.nombre} className="imagen-producto" height={100} width = {100}/>
                  <p><b>{producto.nombre}</b></p>
                  <p>Precio: {producto.precio}</p>
                </a>
              </div>
            ))}
          </div>
        )}
        <button onClick={() => window.location.href = 'index.html'}>Volver</button>
      </main>

      <Footer />
    </div>
  );
}
