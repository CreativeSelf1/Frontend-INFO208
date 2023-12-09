import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Evaluacion = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [opinion, setOpinion] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  const handleOpinionChange = (event) => {
    setOpinion(event.target.value);
  };

  const handleAceptaTerminosChange = () => {
    setAceptaTerminos(!aceptaTerminos);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!aceptaTerminos) {
      alert('Debes aceptar los términos antes de enviar tu comentario.');
      return;
    }

    const data = { servicio_id: id, comentario: opinion };
    console.log('Datos a Enviar:', data);
    setEnviado(true);
    setTimeout(() => {
      setEnviado(false);
      navigate(`/detalle-servicio/${id}`);
      window.location.reload();
    }, 2000);
    await axios.post('https://info208-backend-observatorio-calidad.onrender.com/api/command/comentario', data);
  };
  
  return (
    <div className="container-evaluation">
      <h1>Escribe tu evaluación</h1>
      <div className="mt-3">
        <form onSubmit={handleFormSubmit} className="opinion-form">
          <label>
            <textarea
              value={opinion}
              onChange={handleOpinionChange}
              rows={4}
              cols={50}
              className="opinion-textarea"
              placeholder="Ingresa tu evaluación aquí"
            />
          </label>
          <p>
            <label>
              <input
                type="checkbox"
                checked={aceptaTerminos}
                onChange={handleAceptaTerminosChange}
              />
              Acepto que mi comentario pueda ser utilizado con fines estadísticos
              y para mejorar los servicios.
            </label>
          </p>
          <button className='font-bold mt-3' type="submit">Enviar</button>
          {enviado && <p>Comentario enviado. Redirigiendo...</p>}
        </form>
      </div>
    </div>
  );
};

export default Evaluacion;
