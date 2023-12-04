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
    <div className="details-services">
      <div className="service_profile">
        {servicio && (
          <div className="mt-5">
            <p className="font-bold">{servicio[0].nombre}</p>
            <p>ID del Servicio: {servicio[0].servicio_ID}</p>
            <p>Ubicación: {servicio[0].ubicacion}</p>
            <div className="imgService">
              <img src={servicio[0].imgURL}></img>
            </div>
          </div>
        )}
      </div>

      <div className="columns-service">
        <div className="column-opinion">
          <h1 className="font-bold">Puntuaciones</h1>
        </div>
        <div className="columns-details">
          <h1 className="font-bold">Detalles</h1>
        </div>
      </div>

      <div className="comments">
        <div className='com-eva'> 
          <div>
            <h1> Comentarios </h1>
          </div>
          <div>
            {servicio && (
              <Link to={`/evaluacion/${servicio[0].servicio_ID}`}>
                <button>Crear nueva evaluación</button>
              </Link>
            )}
          </div>
        </div>
        <div className="comments-list">
          {comentarios.map((comentario, index) => (
            <div className="comment-box" key={index}>
              <p>{comentario.comentario}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetalleServicio;
