import './App.css';
import {
  BrowserRouter as Router,
  Route,
  BrowserRouter,
  Routes
} from "react-router-dom";
import CameraPrincipal from './Camera/CameraPrincipal';
import PasosVerficacion from './Camera/PasosVerficacion';
import Prueba from './Camera/Prueba';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PasosVerficacion />} />
          <Route path="/camera" element={<CameraPrincipal />} />
          <Route path="/prueba" element={<Prueba />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
