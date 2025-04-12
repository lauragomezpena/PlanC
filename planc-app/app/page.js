'use client';
import React from "react";
import Search from "../components/Search/Search";
import styles from "./page.module.css";


export default function Home() {
  return (

      <>
        <h1>Bienvenido a Plan C</h1>
        <h2>¡El mejor sitio para comprar al mejor precio!</h2>
        <Search />
      </>

  );
}
