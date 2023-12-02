import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DetalleServicio = () => {
  const { id } = useParams();
  const [servicio, setServicio] = useState(null);
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    const fetchServicio = async () => {
      try {
        const response = await axios.get(`https://info208-backend-observatorio-calidad.onrender.com/api/command/type/${id}`);
        setServicio(response.data);

        const comentariosResponse = await axios.get(`https://info208-backend-observatorio-calidad.onrender.com/api/command/comentarios/${id}`);
        setComentarios(comentariosResponse.data);
      } catch (error) {
        console.error("Error al obtener datos del servicio:", error);
      }
    };

    fetchServicio();
  }, [id]);


  return (
    <div className="mt-5">
      <h1>Detalle del Servicio</h1>
      {servicio && (
        <div className="mt-5">
          <p>Nombre del Servicio: {servicio[0].nombre}</p>
          <p>ID del Servicio: {servicio[0].servicio_ID}</p>
          <p>Ubicación: {servicio[0].ubicacion}</p>
          <Link to={`/evaluacion/${servicio[0].servicio_ID}`}>
            <button className="mt-10">Evaluar</button>
          </Link>
        </div>
      )}
      <div className='mt-10'>
        <h2>Comentarios</h2>
        {comentarios.map((comentario, index) => (
          <div className='mt-2' key={index}>
            <p>{comentario.comentario}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetalleServicio;
