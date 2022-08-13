import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import SuperTreeview from 'react-super-treeview';
 import '../../node_modules/react-super-treeview/dist/style.css'
function Dashboard() {
        // SET YOUR DATA
         const [data,setdata] = useState([
                {
                    id: 1,
                    name: 'Parent A'
                },
                {
                    id: 2,
                    name: 'Parent B',
                    isExpanded: true,
                    isChecked: true,
                    children: [
                        {
                            id: 1,
                            name: 'Child 1'
                        },
                        {
                            id: 2,
                            name: 'Child 2'
                        }
                    ]
                }
            ]
         )

    
        return (
            <SuperTreeview
                data={ data }
                onUpdateCb={(updatedData) => {
                    setdata(updatedData)
                }}
            />
        );

 }
 
export default Dashboard