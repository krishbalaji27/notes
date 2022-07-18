import React from 'react';
import {useState} from 'react';
import axios from 'axios';

function Login()
{

    const [emailId,setEmailId] = useState('')
    const [password,setPassword] = useState('')
    const [response,setResponse] = useState(null)

    const log=async()=>
    {
        const logInfo={
            mailId : emailId,
            pass: password
        }
        let a = await back(logInfo)
        console.log(a)
        setResponse(a.result)
    }

    const back=async(logInfo)=>
    {
        return await axios.post('/api/login', logInfo)
        .then(response =>{
            console.log(response.data)
            return response.data
        })
    }

    return(
        <div>
        <h2>Welcome, Login to countinue</h2>
        <table>
          <tr>
            <td>
                <label for="mailId">  EmailId:   </label>
            </td>
            <td>
                <input placeholder='EmailId' value={emailId} onChange={e=>setEmailId(e.target.value)} id="mailId"/>
            </td>
            <br />
          </ tr>
          <tr>
            <td>
                <label for="pass">Password:</label>
            </td>
            <td>
                <input type='password' placeholder='Password' value={password} onChange={e=>setPassword(e.target.value)} id="pass"/>
            </td>
                <br />
          </ tr>
          <tr>
            <td>
                <button onClick={log}>Login</button> 
            </td>
          </tr>
        </table> 
        <p>{response}</p>       
        </div>            
    )
}
export default Login;