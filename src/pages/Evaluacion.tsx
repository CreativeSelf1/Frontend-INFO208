import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Evaluacion = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [opinion, setOpinion] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleOpinionChange = (event) => {
    setOpinion(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

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
    <div className="mt-16">
      <h1>Evaluacion</h1>
      <div className="mt-3">
        <form onSubmit={handleFormSubmit}>
          <label>
            Opinión:
            <textarea
              value={opinion}
              onChange={handleOpinionChange}
              rows={4}
              cols={50}
            />
          </label>
          <button type="submit">Enviar Opinión</button>
        </form>
        {enviado && <p>comentario enviado. Redirigiendo...</p>}
      </div>
    </div>
  );
};

export default Evaluacion;
