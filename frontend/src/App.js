import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom'

import Home from './Home'
import Vote from './Vote'
import Verify from './Verify'
import Blockchain from './Blockchain';

const App = () => {
  return (
    <Router>
      <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/vote' component={Vote} />
          <Route exact path='/verify' component={Verify} />
          <Route exact path='/blockchain' component={Blockchain} />
      </Switch>
  </Router>
  )
}

export default App;
