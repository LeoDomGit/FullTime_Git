$(document).ready(function () {
    login();
    createTodo();show();
});
function login() {
    $("#loginBtn").click(function (e) {
        e.preventDefault();
        $("#LoginModal").modal('show');
        $("#submitloginBtn").click(function (e) {
            e.preventDefault();
            var email = $("#email").val().trim();
            if (email == '') {
                alert("Chưa nhập email");
            } else {
                $.ajax({
                    type: "post",
                    url: "https://students.trungthanhweb.com/api/checkLoginhtml",
                    data: {
                        // Name : Giá trị 
                        email: email
                    },
                    dataType: "JSON",
                    success: function (res) {
                        if (res.check == true) {
                            console.log(res.apitoken);
                            localStorage.setItem('token', res.apitoken);
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

                            Toast.fire({
                                icon: 'success',
                                title: 'Đăng nhập thành công'
                            }).then(()=>{
                                window.location.reload();
                            })
                           
                        } else {
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

                            Toast.fire({
                                icon: 'error',
                                title: 'Đăng nhập không thành công'
                            })
                        }
                    }
                });
            }
        });
    });
}
//==========================
function createTodo(){
    if(!localStorage.getItem('token')||localStorage.getItem('token')==null){
        $("#addTodoBtn").attr('disabled','disabled');
    }
    $("#addTodoBtn").click(function (e) { 
        e.preventDefault();
        var todo =$("#todo").val().trim();
        if(todo==''){
            const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
            })

            Toast.fire({
            icon: 'error',
            title: 'Bạn chưa nhập nội dung'
            })
        }else{
            $.ajax({
                type: "post",
                url: "https://students.trungthanhweb.com/api/todo",
                data: {
                    apitoken:localStorage.getItem('token'),
                    todo:todo
                },
                dataType: "JSON",
                success: function (res) {
                    if(res.check==true){
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
                
                            Toast.fire({
                            icon: 'success',
                            title: 'Đã thêm thành công'
                            }).then(()=>{
                                window.location.reload();
                            })
                    }
                    if(res.msg.apitoken){
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
                
                            Toast.fire({
                            icon: 'error',
                            title: 'API token chưa đúng'
                            })
                    }else if(res.msg.todo){
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
                
                            Toast.fire({
                            icon: 'error',
                            title: 'Thiếu todo'
                            })
                    }
                }
            });
        }
    });
}
//==========================
function show(){
    $("#todoTable").hide();
    if(localStorage.getItem('token')&&localStorage.getItem('token')!=null){
        $.ajax({
            type: "get",
            url: "https://students.trungthanhweb.com/api/todo",
            data: {
                apitoken:localStorage.getItem('token')
            },
            dataType: "JSON",
            success: function (res) {
                // console.log(res.todo);
                const todo=res.todo;
                if(todo.length>0){
                    var str=``;
                    var count=1;
                    todo.forEach(el => {
                        str+=`
                        <tr>
                        <th scope="row">`+(count++)+`</th>
                        <td>`+el.note+`</td>
                        <td><input type="checkbox"  class="finish"></td>
                        <td>
                            <div class="d-flex">
                                <button class="btn-sm btn-warning ">Sửa</button>
                                <button class="btn-sm btn-danger ms-3 deletebtn" data-id="`+el.id+`">Xóa</button>
                            </div>
                        </td>
                      </tr>
                        `;
                    });
                    $('#result').html(str);
                    $("#todoTable").show();
                }
                deleteTodo();
            }
        });
    }
}
function deleteTodo(){
    $('.deletebtn').click(function (e) { 
        e.preventDefault();
        // attribute
        var id =$(this).attr('data-id');
        Swal.fire({
            icon:'question',
            text: 'Muốn xóa không ? Chắc xóa chưa ?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Đúng',
            denyButtonText: `Không`,
        }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            $.ajax({
                type: "post",
                url: "https://students.trungthanhweb.com/api/deletetodo",
                data: {
                    id:id,
                    apitoken:localStorage.getItem('token')
                },
                dataType: "JSON",
                success: function (res) {
                    if(res.check==true){
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
                          
                          Toast.fire({
                            icon: 'success',
                            title: 'Xóa thành công'
                          }).then(()=>{
                            window.location.reload();
                          })
                    }else if(res.check==false){
                       if(res.msg.apitoken){
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
                          
                          Toast.fire({
                            icon: 'error',
                            title: res.msg.apitoken
                          })
                       }else if(res.msg.id){
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
                          
                          Toast.fire({
                            icon: 'error',
                            title: res.msg.id
                          })
                       }
                    }
                }
            });
        } else if (result.isDenied) {
            
        }
        })
    });
}