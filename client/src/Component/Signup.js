import React from 'react';
import {useState} from 'react';
import axios from 'axios';

function Signup()
{
  const [name,setName] = useState('')
  const [emailId,setEmailId] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPass,setConfirmPass] = useState('')
  const [profession,setProfession] = useState('')
  const [response,setResponse] = useState(null)
 
  const fun=async(article)=>
  {

    return await axios.post('/api/signup', article)
    .then(response =>{
        console.log(response.data)
        return response.data
    })
    }
    
  const clickHandle=async()=>
  {
    if(name == '' || name == null)
    {
        setResponse("Name is empty, Please enter name.")
    }
    else if(emailId == '' || name == null)
    {
        setResponse("emailId is empty, Please enter mail.")
    }
    else if(password == '' || password == null)
    {
        setResponse("password is empty, Please enter password.")
    }
    else if(profession == '' || profession == null)
    {
        setResponse("profession is empty, Please select profession.")
    }
    else if(password===confirmPass)
    {
        const article = {
            name: name, 
            mail:emailId,
            password: password,
            profession: profession
            };
       /*  axios.post('/api/signup', article)
         .then(response =>{
            console.log(response.json())
            setResponse()
           // setResponse(JSON.stringfy(response.data)
         )); */
         let a = await fun(article)
         console.log(a)
         setResponse(a.result)
    }
    else{
        setResponse('Password did not match, Please try again')
    }
  }
  return(
        <div>
           <h2>Create Account</h2>
           <table table ="signupTable">
                <tr>
                    <td>
                        Enter Name:
                    </td>
                    <td>
                        <input placeholder='EnterName' value={name} onChange={e=>setName(e.target.value)}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        Enter EmailId:
                    </td>
                    <td>
                        <input placeholder='EmailId' value={emailId} onChange={e=>setEmailId(e.target.value)}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        Enter Password:
                    </td>
                    <td>
                        <input type='password' value={password} onChange={e=>setPassword(e.target.value)}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        ReEnter Password
                    </td>
                    <td>
                        <input type='password' value={confirmPass} onChange={e=>setConfirmPass(e.target.value)}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        Enter Profession
                    </td>
                    <td>
                       <select value={profession} onChange={e=>setProfession(e.target.value)}>
                       <option value='student'>Student</option>
                       <option value="employee">Employee</option>
                       <option value='nonEmployee'>Non Employee</option>
                       <option value='others'>Others</option>
                       </select>
                    </td>
                </tr> 
           </table>
        <button onClick={clickHandle}>Submit</button>
        <p>{response}</p>
        </div>
    )
}
export default Signup;