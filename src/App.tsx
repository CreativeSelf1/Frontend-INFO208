import { Routes, Route, Link } from 'react-router-dom';
import Service from './pages/Servicios';
import DetalleServicio from './pages/DetalleServicio';
import CrearEvaluacion from './pages/Evaluacion';
import ServiciosList from './components/ServiciosList';
import "./app.css"

const App = () => {
  return (
    <div>
      <header>
        <nav>
          <ul className='flex flex-grow gap-6'>
            <li><Link to="/">Servicios</Link></li>
            <li><Link to="/restaurantes">Restaurantes</Link></li>
            <li><Link to="/hoteleria">Hoteleria</Link></li>
            <li><Link to="/salud">Salud</Link></li>
            <li><Link to="/transporte">Transporte</Link></li>
            <li><Link to="/entretenimiento">Entretenimiento</Link></li>
          </ul>
        </nav>
       
      </header>
      <Routes>
        <Route path="/" element={<Service />} />
        <Route path="/restaurantes" element={<ServiciosList title="Restaurant"  image="/restaurant.jpg" altText="Restaurant Image" />} />
        <Route path="/hoteleria" element={<ServiciosList title="Hoteleria"  image="/hotel.jpg" altText="Hotel Image" />} />
        <Route path="/salud" element={<ServiciosList title="Salud"  image="/salud.jpg" altText="Salud Image" />} />
        <Route path="/transporte" element={<ServiciosList title="Transporte"  image="/transporte.jpg" altText="Transporte Image" />} />
        <Route path="/entretenimiento" element={<ServiciosList title="Entretenimiento"  image="/entretenimiento.jpg" altText="Entretenimiento Image" />} />
        <Route path="/detalle-servicio/:id" element={<DetalleServicio />} />
        <Route path="/evaluacion/:id" element={<CrearEvaluacion />} />
      </Routes>
    </div>
   
  );
};

export default App;
