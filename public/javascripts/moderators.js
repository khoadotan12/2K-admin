
function deleteMod(id) {
    const r = confirm("Bạn có chắc chắn muốn xoá quản trị viên?");
    if (r == true) {
        const URL = window.location.origin;
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    alert('Xoá quản trị viên thành công!');
                    location.reload();
                }
                else {
                    alert('Lỗi: ', xhr.status);
                }
            }
        };
        xhr.open("DELETE", URL + "/moderators/delete", true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send(JSON.stringify({ "id": id }));
    }
}


function validateEmail() {
    const email = document.getElementById("email").value;
    const URL = window.location.origin;
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                if (xhr.responseText !== "") {
                    document.getElementById("registerButton").disabled = true;
                    document.getElementById("email").classList.add("is-invalid");
                    document.getElementById("email").classList.remove("is-valid");
                }
                else {
                    document.getElementById("registerButton").disabled = false;
                    document.getElementById("email").classList.remove("is-invalid");
                    document.getElementById("email").classList.add("is-valid");

                }
            }
        }
    };
    xhr.open("POST", URL + "/moderators/verifyEmail", true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(JSON.stringify({ "email": email }));
}