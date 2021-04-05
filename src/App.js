import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/Dashboard">
          <Dashboard />
        </Route>
        <Route path='/userlogs' component={() => { 
            window.location.href = 'https://iheartrate-back.herokuapp.com/api/heartrate/001072.b2df559565e4408586c5ff8852b01b65.0530'; 
            return null;
        }}/>
        <Route path='/logout' component={() => { 
            window.location.href = 'https://iheartrate.vercel.app/'; 
            return null;
        }}/>
      </Switch>
    </Router>
  );
}

export default App;
