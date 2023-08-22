$(document).ready(function () {
    login();
    logout();
    getData();
});
var w = window.innerWidth;
const api = 'https://students.trungthanhweb.com/api/';
const imageURL = 'https://students.trungthanhweb.com/images/'
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
                <div class="item"><img class="pointer sliderimage" src="`+el+`" alt=""><div>
                `;
                $("#carousel").append(str);
            });
            const products=res.products[0];
            var image=imageURL+products.images;
            $("#productImage").attr("src",image);
            const name = products.name;
            //Giá = Giá * (100-discount) %;
            const price =  Intl.NumberFormat('en-US').format((products.price*(100-products.discount)/100));
            const discount= products.discount +" %";
            const brand = products.brandname;
            const cate = products.catename;
            $("#productname").html(name);
            $("#discount").text(discount);
            $("#price").text(price);
            $("#catename").text(cate);
            $("#brandname").text(brand);
            sliderImageChange();
            const content = products.content;
            $("#content").html(content);
            //Đi lấy sản phẩm cùng loại
            const cateProducts = res.cateproducts;
            const brandproducts = res.brandproducts;
            var str=``;
            cateProducts.forEach(el => {
                str=`
                <div class="item">
                        <div class="card" style="width: 100%">
                        <a href="detail.html?id=`+ el.id + `">    
                            <img class="pt-2" style="height: auto;
                            width: 100%;
                            margin: 0px auto;" src="`+(imageURL+el.image)+`" alt="">
                            </a>
                            <div class="card-body">
                            <div class="card-content">
                            <h5 class="card-title">`+el.name+`</h5>
                            <p class="card-text">`+ Intl.NumberFormat('en-US').format(el.price)+`</p>
                            </div>
                            <a href="detail.html?id=`+ el.id + `" class="btn btn-primary">Chi tiết</a>

                            </div>
                          </div>
                </div>
                `;
                $("#sameCateProduct").append(str);
            });
            brandproducts.forEach(el => {
                str=`
                <div class="item">
                        <div class="card" style="width: 100%;">
                        <a href="detail.html?id=`+ el.id + `">    
                        <img class="pt-2" style="height: auto;
                        width: 100%;
                        margin: 0px auto;" src="`+(imageURL+el.image)+`" alt="">
                        </a>
                            <div class="card-body">
                              <div class="card-content">
                              <h5 class="card-title">`+el.name+`</h5>
                              <p class="card-text">`+ Intl.NumberFormat('en-US').format(el.price)+`</p>
                              <a href="detail.html?id=`+ el.id + `" class="btn btn-primary">Chi tiết</a>
                              </div>
                            </div>
                          </div>
                </div>
                `;
                $("#sameBrandProduct").append(str);
            });
            Owl();
        }
       });


    }
}
function sliderImageChange(){
    $('.sliderimage').click(function (e) { 
        e.preventDefault();
        var src = $(this).attr('src');
        $("#productImage").attr("src",src);
    });
}
function Owl(){
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:20,
        responsiveClass:true,
        items:1 ,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:5
            }
        }
        
    })


    console.log(w);
    $('#sameCateProduct').owlCarousel({
        loop:true,
        margin:20,

        responsiveClass:true,
        items:6,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:5
            }
        }
        
    })
    $('#sameBrandProduct').owlCarousel({
        loop:true,
        margin:20,

        responsiveClass:true,
        items:6, responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:5
            }
        }
        
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