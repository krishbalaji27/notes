import React, { useState, useEffect } from 'react';
import Login from './Component/Login';
import Signup from './Component/Signup';
import {Route} from "react-router-dom";
import Dashboard from './Component/Dashboard';

function App() {
  const [isLoggedIn,set] = useState(false)
  useEffect(()=>
  {
    console.log("h",sessionStorage.getItem("userId"))
    if(sessionStorage.getItem("userId") != null && sessionStorage.getItem("userId") != undefined)
    {
      set(true)
    }
    else
      set(false)
  },[JSON.stringify(sessionStorage.getItem("userId"))])
  return (
   <Route exact path ="/">
    {isLoggedIn ?  
    <Dashboard />:  
    <div>
      <Signup />
      <Login />
    </div>
    }
    </Route>  
)
  }
export default App
