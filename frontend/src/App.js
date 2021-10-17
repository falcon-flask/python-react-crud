import { 
  BrowserRouter as Router,
  Switch,
  Route
 } from 'react-router-dom';

 import About from './components/About';
 import User from './components/Users';
 import Navbar from './components/Navbar';

function App() {
  return (
      <Router>
        <Navbar/>
         <div className="container p-4">
           <Switch>
              <Route  path="/about" component={About} />
              <Route path="/" component={User}/>
           </Switch>
         </div>
      </Router>
  );
}

export default App;
