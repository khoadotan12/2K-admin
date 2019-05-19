
function cancelOrder(id) {
    const r = confirm("Bạn có chắc chắn muốn hủy đơn hàng?");
    if (r == true) {
        const URL = window.location.origin;
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    alert('Hủy đơn hàng thành công!');
                    location.reload();
                }
                else {
                    alert('Lỗi: ', xhr.status);
                }
            }
        };
        xhr.open("PUT", URL + "/order/cancel", true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send(JSON.stringify({ "id": id }));
    }
}


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

