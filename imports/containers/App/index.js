import React, {Component} from "react";
import Layout from "../../routes/Layout";
import {BrowserRouter} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
