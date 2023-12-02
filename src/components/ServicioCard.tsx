import React from 'react';
import { Link } from 'react-router-dom';
import "../app.css"

const ServicioCard = ({ servicio }) => {
  return (
    <Link
      to={`/detalle-servicio/${servicio.servicio_ID}`}
      className="text-black"
    >
      <div className="cards">
          <img
            className="w-full h-40 object-cover rounded-md mb-4"
            src={servicio.imgURL} // Asegúrate de incluir la URL de la imagen
            alt={servicio.nombre}
            loading="lazy"
          />
          <h2 className="text-lg font-semibold">{servicio.nombre}</h2>
          <p>{servicio.ubicacion}</p>
          <p>Tipo ID: {servicio.tipo_ID}</p>
      </div>
    </Link>
  );
};

export default ServicioCard;
