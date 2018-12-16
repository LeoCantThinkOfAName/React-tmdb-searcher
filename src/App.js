import React, { Component } from "react";
import "./App.scss";
import { MovieProvider } from "./components/MovieContext";
import ImagePanel from "./imagePanel/index";
import ContentPanel from "./contentPanel/index";
import HeaderBar from "./components/header/index";

class App extends Component {
  render() {
    return (
      <MovieProvider>
        <div className="App">
          <HeaderBar />
          <div className="main-wrapper">
            <ImagePanel />
            <ContentPanel />
          </div>
        </div>
      </MovieProvider>
    );
  }
}

export default App;
