import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ServicioCard from './ServicioCard';
import SearchBar from './SearchBar';

const ServiciosList = ({ title, image, altText}) => {
  const [data, setData] = useState([]);
  const [visibleServices, setVisibleServices] = useState(8);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://info208-backend-observatorio-calidad.onrender.com/api/command/servicio/${title}`);
        setData(response.data);
      } catch (error) {
        console.error(`Error al obtener datos de ${title}:`, error);
      }
    };

    fetchData();
  }, [title]);

  const loadMoreServices = () => {
    setVisibleServices((prevVisibleServices) => prevVisibleServices + 8);
  };

  const filteredServices = data.filter(service => service.nombre.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <div className="search">
        <img
          src={image}
          alt={altText}
          style={{ width: "100%", height: "500px" }}
        />
        <div className="centrado">
          <p>{title}</p>
        </div>
      </div>
      <div className='justify-center flex mt-4 '>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>
      <div className="card-container">
        <div className="section-card">
          {filteredServices.slice(0, visibleServices).map((service) => (
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
};

export default ServiciosList;
