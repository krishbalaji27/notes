import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import SuperTreeview from 'react-super-treeview';
import axios from 'axios';
 import '../../node_modules/react-super-treeview/dist/style.css'
function Dashboard() {
    const [data,setdata] = useState([]) 
    const [value,setValue] = useState(null) 
        // SET YOUR DATA
        useEffect(async() =>{
            await detail()
           let a =  await axios.post('/api/details', null)
            .then(response =>{
                console.log(response.data)
                return response.data
            })
            setdata([JSON.parse(a.result)])
        }, [])
       
        const detail = async(node)=>{
            let request = {
                "Id": node?.id ?? 0
            }
            let a =  await axios.post('/api/select', request)
            .then(response =>{
                console.log(response.data)
                return response.data
            })
            setValue(a.ShowValue)
        }
        
        return (
            <div>
            <SuperTreeview
                data={ data }
                onUpdateCb={(updatedData) => {
                    setdata(updatedData)
                }}
                onCheckToggleCb={(arrayOfNodes, depth)=> {
                    detail(arrayOfNodes[0])
                }}

            />
           <table>
            <tr>
                <th> Title</th>
                <th> value</th>
            </tr>
            {
                value?.map( e=>  {
                    return(
                        <tr>
                            <td>{e[0]}</td>
                            <td>{e[1]}</td>
                        </tr>
                    )
                })
            }
           </table>
            </div>
        );

 }
 
export default Dashboard