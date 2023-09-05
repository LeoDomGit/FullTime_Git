import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar";
import Swal from 'sweetalert2'
function Todo() {
    const [Todo, setTodo] = useState([]);
    const [item, setItem] = useState('');
    const getTodo = () => {
        fetch('https://students.trungthanhweb.com/api/todo?apitoken=' + localStorage.getItem('token'))
            .then((res) => res.json()).then((res) => {
                if (res.check === true) {
                    setTodo(res.todo);
                }
            });
    }

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1700,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    const submitTodo = async (e) => {
        e.preventDefault();
        var data = new URLSearchParams();
        data.append('apitoken', localStorage.getItem('token'));
        data.append('todo', item);
        const response = await fetch('https://students.trungthanhweb.com/api/todo', {
            method: "POST",
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            },
            body: data,
        });
        const res = await response.json();
        if (res.check === true) {
            Toast.fire({
                icon: 'success',
                title: 'Đã thêm thành công'
            }).then(()=>{
                getTodo();
            })
        }

    }
    const deleteTodo = async(i)=>{
        Swal.fire({
            text: 'Xóa task ?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Đúng',
            denyButtonText: `Không`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                var data = URLSearchParams();
                
                const res = fetch('https://students.trungthanhweb.com/api/deletetodo')
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })
        alert(i);
    }
    useEffect(() => {
        getTodo();
        
    }, [])
    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-9">
                        <input type="text" className='form-control' onChange={e => setItem(e.target.value)} placeholder='Todo' />
                    </div>
                    <div className="col-md">
                        <button className='btn btn-primary w-100' onClick={submitTodo} >Thêm</button>
                    </div>
                </div>
                <div className="row mt-3">
                    {Todo && Todo.length > 0 &&
                        <div className="table-responsive">
                            <table className="table table-primary">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Note</th>
                                        <th scope="col">Checked</th>
                                        <th scope="col">Xóa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Todo.map((item, index) =>
                                            <tr key={item.id} className="">
                                                <td scope="row">{++index}</td>
                                                <td>{item.note}</td>
                                                <td>{
                                                    item.status === 1 ?
                                                        <input type="checkbox" checked disabled />
                                                        :
                                                        <input type="checkbox" />
                                                }
                                                </td>
                                                <td><button className='btn btn-danger' onClick={() => deleteTodo(item.id)}>Xóa</button></td>

                                            </tr>
                                        )
                                    }

                                </tbody>
                            </table>
                        </div>

                    }
                </div>
            </div>

        </div>
    )
}

export default Todo