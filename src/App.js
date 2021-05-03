import './App.css';
import FirstPage from './Containers/FirstPage';
import LoginPage from './Containers/LoginPage';
import SigninPage from './Containers/SigninPage'
import {BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Containers/Home'
import Messages from './Containers/Messages'


function App() {
  return (
    <div className="App">
      
    <Router>
    <Route path="/home" component={FirstPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/Signin" component={SigninPage} />
    <Route path="/" exact component={Home} />
    <Route path="/Messages" component={Messages}/>
    </Router>
      
    </div>
  );
}

export default App;
