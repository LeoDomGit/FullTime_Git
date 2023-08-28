// Function : hàm 
// function Ten_Ham

var arr=[];
function function1(){
    // Let : Khai báo biến cục bộ 
    // Biến cục bộ thì sẽ 
    //ko thể sử dụng ngoài function 
    // Var tenBien  : Khai báo biến toàn cục 
    var name = '';
    name= document.getElementById('fullname').value;

    arr.push(name);
    const div = document.getElementsByClassName('div1');
    console.log(arr);
    // array.length

    var str=``;

    arr.forEach(el => {
        str+=`<br>`+el+`<br> `
    });
    console.log(str);
    // Render HTML Tag
    div[1].innerHTML=str; 

}
