'use client';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import styles from '../../page.module.css';

// Importar imágenes
import img1984 from '../../../imgs/1984.jpg';
import imgHarryPotter from '../../../imgs/harrypotter.jpg';
import imgHp from '../../../imgs/hp.jpg';
import imgMacbookPro from '../../../imgs/macbookpro.jpg';
import imgMarioKart from '../../../imgs/mariokart.jpg';
import imgFifa25 from '../../../imgs/fifa25.jpg';

const productosData = {
  "1984": { nombre: "1984", precio: 15, imagen: img1984, descripcion: "Novela distópica de Orwell", categoria: "libros" },
  "Harry Potter: Complete edition": { nombre: "Harry Potter", precio: 60, imagen: imgHarryPotter, descripcion: "Saga de J.K. Rowling", categoria: "libros" },
  "Laptop HP": { nombre: "Laptop HP", precio: 400, imagen: imgHp, descripcion: "Portátil HP con Intel Core i5", categoria: "ordenadores" },
  "MacBook Pro": { nombre: "MacBook Pro", precio: 700, imagen: imgMacbookPro, descripcion: "MacBook Pro con chip M1", categoria: "ordenadores" },
  "Mario Kart Deluxe": { nombre: "Mario Kart Deluxe", precio: 60, imagen: imgMarioKart, descripcion: "Juego de carreras de Nintendo", categoria: "videojuegos" },
  "FIFA 25": { nombre: "FIFA 25", precio: 70, imagen: imgFifa25, descripcion: "Última entrega de FIFA", categoria: "videojuegos" }
};

export default function ProductoDetalle() {
  const { nombre } = useParams(); 
  const decodedNombre = decodeURIComponent(nombre);
  const producto = productosData[decodedNombre];

  if (!producto) {
    return <p>Producto no encontrado.</p>;
  }

  return (
    <>
      <h1>{producto.nombre}</h1>
      <Image src={producto.imagen} alt={producto.nombre} width={300} height={400} />
      <p>{producto.descripcion}</p>
      <p><b>Precio:</b> {producto.precio}€</p>

    </>
  );
}
