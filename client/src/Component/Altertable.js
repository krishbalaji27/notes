import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Altertable(props){
    const [value,setvalue] = useState('topic')
    const [content,setContent] = useState('')
    const [content1,setContent1] = useState('')
    const [response,setResponse] = useState(null)
    const passData = async() => {
        const article = {
            topicId: props.topicId, 
            type:value,
            heading: content,
            entry: content1
            };
        let a =  await axios.post('/api/addEntry', article)
            .then(response =>{
                console.log(response.data)
                return response.data
            })
        setResponse(a.result)
    }
    return (
        <div>
             {response}
        <table>
            <tr>
              <td>Select table type</td>
            </tr>
            <tr>
                <td>
                    <select value={value} onChange={e=>setvalue(e.target.value)}>
                    <option value='topic'>Topic</option>
                    <option value='value'>Value</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>
                   { value =="topic"? "Enter topic Name":"Enter heading"}
                </td>
                <td>
                    <input  value={content} onChange={e => setContent(e.target.value)} ></input>
                </td>
            </tr>
            {
                value == "value" ? <tr>
                <td>
                    Content
                </td>
                <td>
                    <textarea  value={content1} onChange={e => setContent1(e.target.value)}></textarea>
                </td>
            </tr>: null
            }
            <tr>
                <td>
                     <button onClick={passData}>Save</button>
                </td>
            </tr>
        </table>
        </div>
    )
}
export default Altertable;