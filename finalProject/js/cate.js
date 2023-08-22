$(document).ready(function () {
    logout();checkLogin();getData()
});

function checkLogin(){
    if(!localStorage.getItem('token')||localStorage.getItem('token')==null){
        window.location.replace('index.html');
    }
}
const api='https://students.trungthanhweb.com/api/';

function getData(url){
    const params = new URLSearchParams(window.location.search);
    const image='https://students.trungthanhweb.com/images/'
    if(!params.has('id')){
        window.location.replace('index.html');
    }
    var id=params.get('id');
    var page=1;
    if(params.has('page')){
        page=params.get('page');
    }
    $.ajax({
        type: "GET",
        url: api+"getCateProducts",
        data:{
            apitoken:localStorage.getItem('token'),
            id:id,
            page:page
        },
        dataType: "JSON",
        success: function (res) {
            if(res.check==true){
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
                            <li><a class="dropdown-item" href="categrories.html?id=`+el.id+`">`+ el.name + `</a></li>
                            `
                    });
                    $("#cateUl").html(str);
                }
                const products= res.products.data;
                if(products.length>0){
                    var str =``;
                    products.forEach(el => {
                        str+=`
                        <div class="col-md-4">
                        <div class="card w-100 pt-3">
                            <img style="width:300px;height:auto;margin:0px auto" src="`+image+el.image+`" class="card-img-top" alt="...">
                            <div class="card-body ps-3">
                              <h5 class="card-title">`+el.name+`</h5>
                              <p class="card-text">Giá : `+Intl.NumberFormat('en-US').format(el.price)+`</p>
                              <a href="#" class="btn btn-primary">Xem thêm</a>
                              <a href="#" class="btn btn-success">Mua ngay</a>
                            </div>
                          </div>
                    </div>
                        `;
                    });
                    $("#resultProduct").html(str);
                    var pages= res.products.last_page;
                    str=``;
                    var i=1;
                    while (i<=pages) {
                        if(i==res.products.current_page){
                            str+=`
                            <li class="page-item active"><a class="page-link" href="categrories.html?id=`+id+`&page=`+i+`">`+i+`</a></li>
                            `;
    
                        }else{
                            str+=`
                            <li class="page-item"><a class="page-link" href="categrories.html?id=`+id+`&page=`+i+`">`+i+`</a></li>
                            `;
    
                        }
                        i++;
                    }
                    $("#pagination").html(str);
                }

            }
        }
    });
}
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