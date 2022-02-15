import "./App.css";
import { Routes, Route } from 'react-router-dom';
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import CreatePokemon from "./components/CreatePokemon/CreatePokemon";
import Detail from "./components/Details/Detail";
import ErrorPage from "./components/ErrorPage/ErrorPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/home/:id" element={<Detail/>}/> 
        <Route exact path="/create" element={<CreatePokemon/>}/>
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
    </div>
  );
}

export default App;

//https://reactrouter.com/docs/en/v6/getting-started/overview