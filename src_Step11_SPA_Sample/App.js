
import {Routes, Route, Link} from 'react-router-dom';

function App() {
  return (
    <div className="container">
      <h1>React Router Test</h1>
      <Routes>
        <Route path='/' Component={Home}/>
        <Route path="/about" Component={About}/>
        <Route path="/*" Component={NotFound}/>
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <>
      <h3>Home 페이지 입니다.</h3>
      <Link to="/about">About 페이지로 가기</Link>
      <br />
      <a href="/about">About ?</a>
    </>
  );
}

function About() {
  return (
    <>
      <h3>About 페이지 입니다.</h3>
      <Link to="/">Home 페이지로 가기</Link>
      <br />
      <a href="/">Home ?</a>
    </>
  );
}

function NotFound() {
  return (
    <>
      <h3>404 NotFound</h3>
      <Link to="/">Home 페이지로 가기</Link>
      <br />
      <a href="/">Home ?</a>
    </>
  );
}



// import 한 곳에 무엇을 리턴해줄지 결정하기 
export default App;
