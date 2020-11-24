import logo from './logo.svg';
import './App.css';
import Home from './components/home'
import Header from './components/header'
import Recipe from './components/recipe'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='App'>
        <Header/>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact strict path="/:day/:recipe" component={Recipe} />
        </Switch>
      </div>
    </Router> 
  )
}

export default App;
