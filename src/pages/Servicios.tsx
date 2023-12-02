// Servicios.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ServicioCard from '../components/ServicioCard';
import "../app.css"

const Servicios = () => {
  const [data, setData] = useState([]);
  const [visibleServices, setVisibleServices] = useState(8);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://info208-backend-observatorio-calidad.onrender.com/api/command/services');
        setData(response.data);
      } catch (error) {
        console.error('Error al obtener datos de servicios:', error);
      }
    };

    fetchData();
  }, []);

  const loadMoreServices = () => {
    // Incrementa el número de servicios visibles al hacer clic en "Mostrar más"
    setVisibleServices((prevVisibleServices) => prevVisibleServices + 8);
  };

  return (
    <div className="mb-5">
      <section>
        <img src="https://cdn.vox-cdn.com/thumbor/5d_RtADj8ncnVqh-afV3mU-XQv0=/0x0:1600x1067/1200x900/filters:focal(672x406:928x662)/cdn.vox-cdn.com/uploads/chorus_image/image/57698831/51951042270_78ea1e8590_h.7.jpg" loading="lazy"></img>
        <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/463156637.jpg?k=5d913fb55963d82c13fe5960117723b5d57007e15e813be871395bf090418f2f&o=&hp=1" loading="lazy"></img>
        <img src="https://blogs.iadb.org/salud/wp-content/uploads/sites/15/2021/06/infraestructura-en-salud.jpg" loading="lazy"></img>
        <img src="https://pbs.twimg.com/media/FRxunw3X0AApkSU?format=jpg&name=large" loading="lazy"></img>
        <img src="https://cdn.businessinsider.es/sites/navi.axelspringer.es/public/media/image/2021/11/sala-cine-cadena-amc-estados-unidos-2529691.jpg?tf=3840x" loading="lazy"></img>
      </section>
      <div className="card-container">
        <div className="section-card">
          {data.slice(0, visibleServices).map((service) => (
            <ServicioCard key={service.servicio_id} servicio={service} />
          ))}
          <div className="show-more-container mb-7">
            {visibleServices < data.length && (
              <button className="show-more-button" onClick={loadMoreServices}>
                Mostrar más
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Servicios;
