$(document).ready(function () {
    login();
    logout();
    getData();
});
const api = 'https://students.trungthanhweb.com/api/';
function getData(){
    $("#logoutbtn").hide();
    if (localStorage.getItem('token') && localStorage.getItem('token') != null) {
        $("#loginBtn").hide();
        $("#logoutbtn").show();
        const params = new URLSearchParams(window.location.search);
        if(!params.has('id')){
            window.location.replace('index.html');
        }
        var id=params.get('id');
       $.ajax({
        type: "GET",
        url: api+'single',
        data: {
            apitoken:localStorage.getItem('token'),
            id:id
        },
        dataType: "JSON",
        success: function (res) {
            const brands = res.brands;
            const categrories = res.categrories;
            if (brands.length > 0) {
                var str = ``;
                brands.forEach(el => {
                    str += `
                        <li><a class="dropdown-item" href="#">`+ el.name + `</a></li>
                        `
                });
                $("#brandUl").html(str);
            }
            if (categrories.length > 0) {
                var str = ``;
                categrories.forEach(el => {
                    str += `
                        <li><a class="dropdown-item" href="#">`+ el.name + `</a></li>
                        `
                });
                $("#cateUl").html(str);
            }
            const gallery= res.gallery;
            var str=``;
            gallery.forEach(el => {
                str=`
                <div class="item"><img class="pointer" src="`+el+`" alt=""><div>
                `;
                $("#carousel").append(str);
            });
            Owl();
        }
       });


    }
}
function Owl(){
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        responsiveClass:true,
        
    })
}
// =================================
function logout() {
    $("#logoutbtn").click(function (e) {
        e.preventDefault();
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
            Toast.fire({
                icon: 'success',
                title: 'Bye bye !'
            }).then(() => {
                window.location.reload();
            })
        }
    });
}
//   ===============================
function login() {
    $("#loginBtn").click(function (e) {
        e.preventDefault();
        $("#LoginModal").modal('show');
        $("#submitloginBtn").click(function (e) {
            e.preventDefault();
            var email = $("#email").val().trim();
            if (email == '') {
                Toast.fire({
                    icon: 'error',
                    title: 'Thiếu  email'
                })
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
                            Toast.fire({
                                icon: 'success',
                                title: 'Đăng nhập thành công'
                            }).then(() => {
                                window.location.reload();
                            })

                        } else {
                            if (res.msg.email) {
                                Toast.fire({
                                    icon: 'error',
                                    title: res.msg.email
                                })
                            }
                        }
                    }
                });
            }
        });
    });
}
