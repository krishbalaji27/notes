import React, { useState, useEffect } from 'react';
import Login from './Component/Login';
import Signup from './Component/Signup';
import {Route} from "react-router-dom";

function App() {

  return (
   <Route exact path ="/">
    {false ? <h2>Hello</h2> :  
    <div>
      <Signup />
      <Login />
    </div>
    }
    </Route>  
)
  }
export default App
