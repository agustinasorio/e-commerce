let product = {};
let num_stars = 1;
const user = document.getElementById("users");


//traigo  la informacion de json
fetch(PRODUCT_INFO_URL + localStorage.getItem("productID") + EXT_TYPE)
  .then((resp) => resp.json())
  .then((data) => {
  console.log(data);
  const infoRelatedProducts = data.relatedProducts;

  document.getElementById("ProdInfo").innerHTML += `<div class="list-group-item">
  <p>Nombre</p>
  <div class="row">
  <div class="col-12"><h3>${data.name}</h3>
  <hr>`
  document.getElementById("ProdInfo").innerHTML += `<div class="list-group-item">
  <p>Descripcion</p>
<div class="row">
<div class="col-12"><h3>${data.description}</h3>
<hr>`
document.getElementById("ProdInfo").innerHTML += `<div class="list-group-item">
<p>Precio</p>
<div class="row">
<div class="col-12"><h3>${data.cost} ${data.currency}</h3>
<hr>`
document.getElementById("ProdInfo").innerHTML += `<div class="list-group-item">
<p>Cantidad</p>
<div class="row">
<div class="col-12"><h3>${data.soldCount}</h3>
<hr>`
document.getElementById("ProdInfo").innerHTML += `<div class="list-group-item">
<p>Categoria</p>
<div class="row">
<div class="col-12"><h3>${data.category}</h3>
<hr>`
 
//llamo a las imagenes
 document.getElementById("img1").src = data.images[0];
 document.getElementById("img2").src = data.images[1];
 document.getElementById("img3").src = data.images[2];
 document.getElementById("img4").src = data.images[3];



//Mostrar productos Relacionados//
let productRel = document.getElementById("productosRelacionados");
for (i =0; i<data.relatedProducts.length; i++){
  productRel.innerHTML += `
  <div class="card col-6">
      <div class="card-header text-center">
        <img src="${infoRelatedProducts[i].image}" alt="Imagen representativa de ${infoRelatedProducts[i].name}" style="width: 100%;">
      </div>
      <div class="card-body">
        <h5 class="card-title">${infoRelatedProducts[i].name}</h5>
      </div>
    </div>`
}
})




// Mostar el nombre del usuario actual en el formulario de nuevo comentario.
var userComment = localStorage.getItem("nombre_usuario");
document.getElementById("userCom").innerHTML = userComment;

// Mostar el 'div' que contiene las 5 estrellas para la calificaci??n, en el formulario.
function stars_score(num_stars) {
  stars = "";
  for (let s = 0; s < 5; s++) {
    if (s < num_stars) {
      stars += `<span class="fa fa-star float-right"></span>`
    } else {
      stars += `<span class="fa fa-star checked float-right"></span>`
    }
    document.getElementById("stars_rating").innerHTML = stars;
  }
}
// Agregar estrellas a la calificaci??n en el formulario.
function add_star() {
  if (num_stars < 5) {
    num_stars++;
  }
}
// Restar estrellas a la calificaci??n en el formulario.
function take_star() {
  if (num_stars > 1) {
    num_stars--;
  }
}
// Mostrar las estrellas que se agreg?? o rest?? a la calificaci??n del comentario actual.
function show_rating(num) {
  let rating = "";

  for (let x = 5; x > 0; x--) {

    if (x > num) {
      rating += `<span class="fa fa-star float-right"></span>`
    } else {
      rating += `<span class="fa fa-star checked float-right"></span>`
    }
    document.getElementById("stars_rating").innerHTML = rating;

  }
}

//llamar al json para los comentarios
fetch(PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("productID") + EXT_TYPE)
  .then((resp) => resp.json())
  .then((data) => {
    for (i = 0; i < data.length; i++) {
      user.innerHTML += `<li class="list-group-item">
      <h5 class="text-left text-capitalize">${data[i].user}:</h6>
      <p>${data[i].description}</p>
      <p><small>${data[i].dateTime}</small></p>
      </li>`


    }
  })
  const addedToCartSuccesfully = document.getElementById("added-to-cart-success");

  document.getElementById("buy-btn").addEventListener("click", () => {
      // si no existe un valor de clave cartProducts devuelve un objeto vacio
      // de lo contrario parsea el string a objeto
      var cart = JSON.parse(localStorage.getItem("cartProducts")) || {};
  
      // se agrega una sola vez cada producto. Tal vez no es lo que quiero?
      // no se que es mejor que cada vez que aprete se sume uno al count
      // o que solo se agregue una vez y dsps el usr modofique la cant desde el carrito
      if (!(ProdInfo.id in cart)) {
          cart[ProdInfo.id] = 
              {
                  id: ProdInfo.id,
                  name: ProdInfo.name, 
                  count: 1, 
                  unitCost: ProdInfo.cost, 
                  currency: ProdInfo.currency, 
                  image: ProdInfo.images
              }
          };
      localStorage.setItem("cartProducts", JSON.stringify(cart));
  
      // muestra el mensaje de exito por 4 segundos
      addedToCartSuccesfully.classList.remove("d-none");
      setTimeout(() => {
          addedToCartSuccesfully.classList.add("d-none")
      }, 4000);
  });
  
  
 
  

  