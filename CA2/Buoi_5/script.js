const input = document.getElementById('name');
const btn = document.getElementById('btn');
if (localStorage.getItem('list')) {
    var data = JSON.parse(localStorage.getItem('list'));
    if (data.length > 0) {
        var arr = data;
    } else {
        var arr = [];
    }
} else {
    var arr = [];
}

const result = document.getElementById('list')
btn.addEventListener('click', () => {
    var name = input.value;
    if (name == '') {
        alert("Chưa nhập tên");
    } else {
        arr.push(name);
    }
    if (!localStorage.getItem('list')) {
        var store = JSON.stringify(arr);
        localStorage.setItem('list', store);
    } else {
        localStorage.removeItem('list');
        var store = JSON.stringify(arr);
        localStorage.setItem('list', store);
    }
    hienThi();
})
hienThi();
function hienThi() {
    if (localStorage.getItem('list')) {
        var res = localStorage.getItem('list');
        res = JSON.parse(res);
    }
    if (res.length > 0) {
        var str = ``;
        res.forEach(el => {
            str += `
            <li>`+ el + `</li>
            `
        });
        result.innerHTML = str;
    }

}