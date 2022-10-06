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

// Mostar el 'div' que contiene las 5 estrellas para la calificación, en el formulario.
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
// Agregar estrellas a la calificación en el formulario.
function add_star() {
  if (num_stars < 5) {
    num_stars++;
  }
}
// Restar estrellas a la calificación en el formulario.
function take_star() {
  if (num_stars > 1) {
    num_stars--;
  }
}
// Mostrar las estrellas que se agregó o restó a la calificación del comentario actual.
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

 
  
 
  

  