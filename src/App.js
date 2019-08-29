import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import UpperDiv from './Components/UpperDiv';
import BottomDiv from './Components/BottomDiv';
import Footer from './Components/Footer';
import Recipes from './Components/Recipes';

class App extends React.Component {

  render() {
    return(
      <div>
        <Navbar></Navbar>
        <UpperDiv></UpperDiv>
        <Recipes></Recipes>
        <BottomDiv></BottomDiv>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
