import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css'
import store from './store'
import Chat from './components/Chat/chat'
import Login from './components/Chat/login'

class App extends Component {

  render () {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
              <div>
                <Route exact path="/" component={Login}/>
                <Route path="/:user" component={Chat} />
              </div>
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App
