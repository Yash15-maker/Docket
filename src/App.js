import Todos from './components/Todos';
import Nav from './components/Nav';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
     <Nav/>
     <Todos/>
     
<Footer/>    </div>
  );
}

export default App;
