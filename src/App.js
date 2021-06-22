import './App.css';
import FirstPage from './Containers/FirstPage';
import LoginPage from './Containers/LoginPage';
import SigninPage from './Containers/SigninPage'
import {BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Containers/Home'
import Messages from './Containers/Messages';
import Counter from './Containers/Counter'
import PrivateRoute from './Component/PrivateRoute';
import Admin from './Containers/Admin'

function App() {
  return (
    <div className="App">
      
    <Router>
      <PrivateRoute path="/counter"></PrivateRoute>
    <Route path="/"exact component={FirstPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/Signin" component={SigninPage} />
    <PrivateRoute path="/home"  component={Home} />
    <PrivateRoute path="/Messages" component={Messages}/>
    <Route path="/admin" component={Admin}/>
    </Router>
      
    </div>
  );
}

export default App;
