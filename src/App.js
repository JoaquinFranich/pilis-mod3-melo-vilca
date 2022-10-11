import './App.css';
import Home from './routes/Home/Home';
import { Route, Routes } from 'react-router-dom';
import Navigation from './routes/Navigation/Navigation';
import CreateCard from './routes/Card/CreateCard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navigation></Navigation>}>
          <Route index element={<Home></Home>}></Route>
          <Route path='createCard' element={<CreateCard></CreateCard>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
