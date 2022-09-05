const email = document.querySelector('#email');
const contraseña = document.querySelector('#password1');
const bttn = document.querySelector('#regBtn');
let user = document.getElementById("email");

bttn.addEventListener('click', function () {
    if (passCaracteres() && verificarInput()) {
        sessionStorage.setItem('logueado', 'true');
        localStorage.setItem('email', user.value);
        window.location.href = 'index.html';
        return true;

        showAlertSuccess();
        setInterval("location.reload()", 1000);
    }
    else {
        showAlertError();
        setInterval("location.reload()", 1000);
    }

});



function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
}

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}


function passCaracteres() {
    if (contraseña.value.length < 6) {
        return false;
    }
    else {
        return true;
    }
}

function verificarInput() {
            if (((email.value.length) < 1)) {
                return false;
            }
            else{
                return true;
            }
        }

document.getElementById('login').addEventListener('click', () => {
    localStorage.setItem('user', document.getElementById('input').value);
    document.getElementById('nombre').innerHTML = localStorage.getItem('user');
})

