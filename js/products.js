const URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";

const categoria = document.querySelector('#leg1');
const cards = document.querySelector('#cards');


    fetch(URL)
    .then ((resp) => resp.json())
    .then ((data) => {

        console.log(data.products);

        let productos = data.products;

        let i =0;

        for(let product of productos){
            i++;

      cards.innerHTML += `<div class="card shadow mb-1 rounded" style="width: 20rem;" class="col-3">
      <h5 id= "titulo${1}" class="card-title pt-2 text-center text-color-black font-" >${product.name}</h5>  
      
      <div display-block; margin-0px-auto text-aling-center border-bottom-2rem; font-size: large;>
      <img id="image${1}" src="${product.image}" class="card-img-top" alt="card image cap">
      </div>
  <div class="card-body">
  <div class="d-flex w-100 justify-content-between">
    
    <p  id="descripcion${i}"class="card-text text-with-100"> <b>${product.description} - ${product.cost} </b></p>
  
  </div>

  <p  class="card-text"> <small id="small${1}" >${product.soldCount} unidades disponibles </small></p>
  <div class="d-grid gap-2">
  <button class="btn btn-primary button"> Añadir a carrito</button>
  </div>
  </div>
</div>`
    }

    categoria.innerHTML = "Veras aqui todos los productos de la categoria" + data.catName;
});


