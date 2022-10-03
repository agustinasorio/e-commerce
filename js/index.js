document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});


//menu despegable//

function menuDesp(){
    const usuario = localStorage.getItem("user");
    if(usuario != "") {
        let menu = document.getElementById("email");
        menu.innerHTML =  `<div class="dropdown color-blue">
        <div class="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="fa-solid fa-bars"></i>
        ${localStorage.getItem("user")} 
     </div>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><a class="dropdown-item" href="./my-profile.html">Mi Perfil</a></li>
          <li><a class="dropdown-item" href="./cart.html">Mi Carrito</a></li>
          <li><a class="dropdown-item" href="./login.html">Cerrar Sesión</a></li>
        </ul>
      </div>
      `

    }

}
menuDesp();