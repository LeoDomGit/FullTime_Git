const button2 = document.querySelectorAll('.button2');
const tenSP = document.querySelectorAll('.tenSP');
const giaSP = document.querySelectorAll('.giaSP');
// button2 =>array
//
var arr=[];
for (let i = 0; i < button2.length; i++) {
    const el = button2[i];
    //arrow function : Function/Hàm được khai báo nhưng ko có tên Function
    el.addEventListener('click',()=>{
        var tenSP1=tenSP[i].innerText;
        var giaSP1=giaSP[i].innerText;
        var item = new Object();
        //property
        item.ten=tenSP1;
        item.gia=giaSP1;
        item.soLuong=1;

        var check=0;
        arr.forEach(el1 => {
            // So sánh bằng
            // 1 = đang gán gtri 
            // 2= đang so sánh =
            if(el1.ten==tenSP1){
                el1.soLuong++;
                check=1;
            }
        });
        if(check==0){
            arr.push(item);
        }
        var str=``;
        var key =1;
        arr.forEach(el1 => {
            var thanhtien = Number(el1.gia)*el1.soLuong;
            console.log(el1.gia);
            str+=`
            <div class="rowcart">
                <div class="col">
                    `+(key++)+`
                </div>
                <div class="col">
                `+el1.ten+`
                </div>
                <div class="col">
                `+el1.soLuong+`
                </div>
                <div class="col">
                `+el1.gia+`
                </div>
                <div class="col">
                    `+thanhtien+`
                </div>
            </div>
            `;
        });
        document.getElementById('cart').innerHTML=str;
    });
}
