import { NavLink, Route, Routes } from "react-router-dom";

import {Home} from './pages';
import BsNavbar from "./components/BsNavbar";

function App() {

  return (
    <>
      <BsNavbar/>
      <div className="container">
        
        <Routes>
          <Route path="/" Component={Home}/>

        </Routes>
      </div>
    </>
  );
}



// import 한 곳에 무엇을 리턴해줄지 결정하기 
export default App;
