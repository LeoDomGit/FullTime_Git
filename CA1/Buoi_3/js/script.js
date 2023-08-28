// const button = document.getElementById('submitBtn');
// const input= document.getElementById("username");
// // var arr=[];
// if(sessionStorage.getItem('arr')&&sessionStorage.getItem('arr')!=null){
//     var arr=JSON.parse(sessionStorage.getItem('arr'));
// }else{
//     var arr=[];
// }
// button.addEventListener('click',()=>{
//     var name = input.value;
//     if(name!=''){
//         arr.push(name);
//         // JSON 
//         var item = JSON.stringify(arr);
//         sessionStorage.setItem('arr',item);
//         window.location.reload();
//     }else{
//         alert("Chưa nhập tên ");
//     }
// })
//  var str=hienThi();
// document.getElementById("result").innerHTML=str;
// // Localstorage && Sessionstorage chỉ save data dưới dạng String 
// function hienThi(){
//     var item = sessionStorage.getItem('arr');
//     var  arr = JSON.parse(item);
//     console.log(arr);
//     if(arr.length>0){
//         var str =``;    
//         arr.forEach(el => {
//             str+=`
//             <li>`+el+`</li>
//             `;
//         });
//         // Tạo ra 1 chuỗi 
//         return str;
//     }
// }
//================Localstorage======================
const button = document.getElementById('submitBtn');
const input= document.getElementById("username");
const deleteBtn = document.getElementById("deleteList");
// var arr=[];
if(localStorage.getItem('arr')&&localStorage.getItem('arr')!=null){
    var arr=JSON.parse(localStorage.getItem('arr'));
}else{
    var arr=[];
}
deleteBtn.addEventListener('click',()=>{
    if(confirm("Xóa không !")){
        localStorage.removeItem('arr');
        alert("Đã xóa");
        window.location.reload();
        // if(localStorage.getItem('arr')){
            
        // }
    }
})
button.addEventListener('click',()=>{
    var name = input.value;
    if(name!=''){
        arr.push(name);
        // JSON 
        var item = JSON.stringify(arr);
        localStorage.setItem('arr',item);
        window.location.reload();
    }else{
        alert("Chưa nhập tên ");
    }
})
 var str=hienThi();
document.getElementById("result").innerHTML=str;
// Localstorage && localStorage chỉ save data dưới dạng String 
function hienThi(){
    if(localStorage.getItem('arr')){
        var item = localStorage.getItem('arr');
        var  arr = JSON.parse(item);
        console.log(arr);
        if(arr.length>0){
            var str =``;    
            arr.forEach(el => {
                str+=`
                <li>`+el+`</li>
                `;
            });
            // Tạo ra 1 chuỗi 
            return str;
        }
    }

}