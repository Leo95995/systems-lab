import type React from "react";
import { useState, useEffect } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import Loader from "../../components/Loader";


const DocsPage: React.FC = () => {
  const [spec, setSpec] = useState(null);
  // Sembra che sia un errore di come ts gestisce i tipi
  // Possibile fix perchè me lo segna come errore (definendolo prima magari lo evito)
  const Swagger = SwaggerUI as unknown as React.FC<{ spec: object }>;

  // Mi recupero i dati dello swagger. poi prendo la risposta e successivamente li setto dentro spec
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/docs`)
      .then((res) => res.json())
      .then(setSpec)
      .catch((err) => console.error("Errore nel caricamento dello Swagger:", err));
  }, []);
 
  if (!spec) return <div className="flex w-full h-screen items-center justify-center "><Loader/></div>;

  return (
    <>
      <Swagger spec={spec} />
    </>
  );
};

export default DocsPage;
