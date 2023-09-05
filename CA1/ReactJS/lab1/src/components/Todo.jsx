import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar";
function Todo() {
    const [email,setEmail]= useState();
    const submitLogin =()=>{
        var data = new URLSearchParams();
        data.append('email',email);
        fetch('https://students.trungthanhweb.com/api/checkLoginhtml',{
            method:"POST",
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
          }).then(response => response.json())
          .then((data)=>{
            console.log(data);
          })
    }
    return (
        <div>
            <Navbar/>
            <div className="container mt-4">
            <div className="row">
                <div className="col-md-9">
                    <input type="text" className='form-control' onChange={(e)=>setEmail(e.target.value)} placeholder='Email' />
                </div>
                <div className="col-md">
                    <button className='btn btn-primary w-100' onClick={submitLogin}>Đăng nhập</button>
                </div>
            </div>
            <div className="row mt-3">
                {/* {todo.length>0 && todo.map((item,index) => (
                <li key={index}>
                {item}
                </li>
                ))} */}
            </div>
            </div>
            
        </div>
    )
}

export default Todo