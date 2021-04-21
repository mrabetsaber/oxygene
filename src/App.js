import logo from './logo.svg';
import './App.css';
import FirstPage from './Containers/FirstPage';
import LoginPage from './Containers/LoginPage';
import HomePage from './Containers/HomePage'
import {BrowserRouter as Router, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      
    <Router>
    <Route path="/"exact component={FirstPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/home" component={HomePage} />
    </Router>
      
    </div>
  );
}

export default App;
