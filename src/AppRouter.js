import './App.css';
import React from 'react';
import Home from './components/home/home';

import { BrowserRouter as Router, Route} from "react-router-dom";
import AddressBookForm from './components/addressbook-form/addressbook-form';
import Update from './components/home/update';

class AppRouter extends React.Component {
    render () {
      return (
        <div className="app-main">
          <Router>
            <div className="App">
              <Route path="/" component={Home} exact></Route>
              <Route path="/AddressBookForm" component={AddressBookForm}></Route>
              <Route path="/Update" component={Update}></Route>
            </div>
          </Router>
        </div>
      );
    }
  }
  export default AppRouter;