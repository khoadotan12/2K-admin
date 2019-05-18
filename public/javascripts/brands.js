
function deleteBrand(id) {
    const r = confirm("Bạn có chắc chắn muốn xoá thương hiệu?");
    if (r == true) {
        const URL = window.location.origin;
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    alert('Xoá thương hiệu thành công!');
                    location.reload();
                }
                else {
                    alert('Lỗi: ', xhr.status);
                }
            }
        };
        xhr.open("DELETE", URL + "/brands/delete", true);
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        xhr.send(JSON.stringify({ "id": id }));
    }
}
