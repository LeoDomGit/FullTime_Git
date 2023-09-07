// Biến số 
// Hắng số 
const tooglebtn = document.getElementById("tooglebtn");
var count = 0;
// Hàm => Function
const menu = document.getElementsByClassName('menu')[0];
tooglebtn.addEventListener("click", () => {
    if (count == 0) {
        menu.style.height = '300px';
        count = 1;
    } else {
        menu.style.height = '40px';
        count = 0;
    }

})

function addToCart(){
    // const buttons= document.querySelectorAll('.addToCartBtn');
    const buttons1= document.getElementsByClassName('addToCartBtn');
    var button2 = Object.values(buttons1);
    const productnames= document.querySelectorAll('.productname');
    const productprices= document.querySelectorAll('.productprice');
    // Khai báo 1 mảng
    var arr=[];
    button2.forEach((el,index) => {
        el.addEventListener('click',()=>{
           //Tạo đối tượng
            var item = new Object();
            item.id = index;
            item.qty=1;
            item.name=productnames[index].innerText;
            item.price=productprices[index].getAttribute('data-value');
            // Tên mảng . push (Giá trị )
            var check =false;
            arr.forEach(el1 => {
                if(el1['id']==index){
                    el1['qty']++;
                    check=true;
                }
            });
            if(check==false){
                arr.push(item);
            }

            console.log(arr);
        })
    });
}
addToCart();