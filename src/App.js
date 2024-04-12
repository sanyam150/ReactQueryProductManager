import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductsList from './Pages/ProductsList';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ProductsList />} />
      </Routes>
    </Router>
  );
}

export default App;
