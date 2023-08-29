const registerbtn = document.getElementById('registerbtn');
registerbtn.addEventListener('click',()=>{
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var repassword = document.getElementById('repassword').value;
    if(username==''||password==''||repassword==''){
        alert("Thiếu thông tin đăng ký");
    }else{
        if(password!=repassword){
            alert("Hai mật khẩu phải trùng khớp")
        }else{
            var user = [username,password];
            if(localStorage.getItem('users')){
                localStorage.removeItem('users');
            }
            localStorage.setItem('users',JSON.stringify(user));
            window.location.replace('login.html');
        }
    }

})