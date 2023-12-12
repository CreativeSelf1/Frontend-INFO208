import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Evaluacion = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [opinion, setOpinion] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [parametros, SetParametros] = useState([]);
  const [notas, setNotas] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://info208-backend-observatorio-calidad.onrender.com/api/command/parametros/${id}`);
        SetParametros(response.data);
      } catch (error) {
        console.error('Error al obtener datos de servicios:', error);
      }
    };

    fetchData();
  }, []);

  const handleOpinionChange = (event) => {
    setOpinion(event.target.value);
  };

  const handleAceptaTerminosChange = () => {
    setAceptaTerminos(!aceptaTerminos);
  };

  const handleNotaChange = (nombreParametro, nuevaNota) => {
    setNotas({
      ...notas,
      [nombreParametro]: nuevaNota,
    });
  };

  useEffect(() => {
    const notasIniciales = {};
    parametros.forEach(parametro => {
      notasIniciales[parametro.nombre_parametro] = "1";
    });
    setNotas(notasIniciales);
  }, [parametros]);

  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
  
      if (!aceptaTerminos) {
        alert('Debes aceptar los términos antes de enviar tu comentario.');
        return;
      }
      const data = { servicio_id: id, comentario: opinion };
      console.log('Datos a Enviar:', data);
  
      setEnviado(true);
      console.log('Notas actuales:', notas);
  
      await axios.post('https://backend-info208-production.up.railway.app/api/command/comentario', data);
  
      setTimeout(() => {
        setEnviado(false);
        navigate(`/detalle-servicio/${id}`);
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error al enviar el comentario:', error);
      alert('Ocurrió un error al enviar el comentario. Por favor, inténtalo de nuevo.');
    }
  };
  
  return (
    <div className="container-evaluation">
      <div className="Parametros">
        <h1> Parámetros evaluados</h1>
        {parametros.map((dato, index) => (
          <div key={index} className="parametro-item mb-2 mt-2">
            <p>{dato.nombre_parametro}</p>
            <input
              type="range"
              id={`nota-${index}`}
              min="1"
              max="10"
              value={notas[dato.nombre_parametro] || "1"}
              onChange={(e) =>
                handleNotaChange(dato.nombre_parametro, e.target.value)
              }
            />
            <span>{notas[dato.nombre_parametro]}</span>
          </div>
        ))}
      </div>
      <h1>Escribe tu evaluación</h1>
      <div className="text-area">
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
              Acepto que los parámetros evaluados y mi comentario pueda ser utilizado con fines
              estadísticos para mejorar los servicios.
            </label>
          </p>
          <button className="font-bold mt-3" type="submit">
            Enviar
          </button>
          {enviado && <p>Comentario enviado. Redirigiendo...</p>}
        </form>
      </div>
    </div>
  );
};

export default Evaluacion;
