
function deleteProduct(id) {
    const r = confirm("Bạn có chắc muốn xoá sản phẩm");
    if (r == true) {
        const URL = window.location.origin;
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    alert('Xoá sản phẩm thành công');
                    location.reload();
                }
                else {
                    alert('Lỗi: ', xhr.status);
                }
            }
        };
        xhr.open("DELETE", URL + "/product/delete", true);
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        xhr.send(JSON.stringify({ "id": id }));
    }
}
