const loginBtn = document.getElementById('loginBtn');
loginBtn.addEventListener('click',()=>{
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    if(username==''||password==''){
        alert("Thiếu tên đăng nhập hoặc mật khẩu");
    }else{
        if(!localStorage.getItem('users')||localStorage.getItem('users')==null||JSON.parse(localStorage.getItem('users')).length==0){
            window.location.replace('index.html');
        }
        const users = JSON.parse(localStorage.getItem('users'));
        if(username==users[0]&&password===users[1]){
            alert("Đăng nhập thành công")
        }else{
            alert("Sai tên đăng nhập hoặc mật khẩu");
        }
    }

})