function changeStateOrder(id, state) {
    let message = "";
    switch (state) {
        case 1:
            message = "Bắt đầu giao hàng?";
            break;
        case 2:
            message = "Đơn hàng đã được giao thành công?"
            break;
        case -1:
            message = "Bạn có chắc chắn muốn hủy đơn hàng?"
            break;
        default: break;
    };
    const r = confirm(message);
    if (r == true) {
        const URL = window.location.origin;
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    alert('Cập nhật trạng thái đơn hàng thành công!');
                    location.reload();
                }
                else {
                    alert('Lỗi: ', xhr.status);
                }
            }
        };
        xhr.open("PUT", URL + "/order/state", true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send(JSON.stringify({ "id": id, "state": state }));
    }
}

var counter = 1;
var dynamicInput = [];

function addInput(data) {
    const newdiv = document.createElement('div');
    const json = JSON.parse(data);
    newdiv.id = dynamicInput[counter];
    let innerhtml = "<div class='row form-group' id='" + dynamicInput[0] + "'>";
    innerhtml += "<div class='col col-md-3'></div>";
    innerhtml += "<div class='col-6 col-md-6'><select id='product" + counter.toString() + "' name='product" + counter.toString() + "' class='form-control-sm form-control' required><option value=''>Chọn sản phẩm</option>"
    json.forEach(item => {
        innerhtml += "<option value='" + item._id + "'>" + item.name + "</option>"
    });

    innerhtml += "</select></div><div class='col-6 col-md-3'><input type='button' class='btn btn-primary btn-sm' onClick='removeInput(" + dynamicInput[counter] + ");' value='-' /></div></div>"
    newdiv.innerHTML = innerhtml;
    document.getElementById('formulario').appendChild(newdiv);
    counter++;
}

function removeInput(id) {
    var elem = document.getElementById(id);
    return elem.parentNode.removeChild(elem);
}