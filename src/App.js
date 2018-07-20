import React, { Component } from 'react';
import './rem'
import './reset.css'
import {Main} from './components/content'
import {Pinglun} from './components/pinglun'
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'

class App extends Component {
  
	
  render() {
    return (
    	<Router>
    	   <div className="App">
    	      <Route exact path="/" component={Main}/>
    	      <Route path="/content" component={Main}/>
	          <Route path="/pinglun/:id" component={Pinglun}/>  	
	      </div>
    	</Router>  
    );
  }
  
  
  
}

export default App;
