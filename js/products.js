//const URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";

const categoria = document.querySelector('#leg1');
const cards = document.querySelector('#cards');
const inputSearch = document.getElementById('searchTXT');
const boxSearch = document.querySelector('searchBox');
//filtros
const ORDER_ASC_BY_COST = "Ascendente";
const ORDER_DESC_BY_COST = "Descendente";
const ORDER_BY_PROD_REL = "Relevancia";
let currentSortCriterio = undefined;
let minCost = undefined;
let maxCost = undefined;
let currentCategoriesArray = [];



// Establezco los criterios para ordenar los productos
function sortProducts (criterio, array){
  let result = [];
  if (criterio === ORDER_ASC_BY_COST)
  {
      result = array.sort(function(a, b) {
          if ( a.cost < b.cost ){ return -1; }
          if ( a.cost > b.cost ){ return 1; }
          return 0;
      });
  }else if (criterio === ORDER_DESC_BY_COST){
      result = array.sort(function(a, b) {
          if ( a.cost > b.cost ){ return -1; }
          if ( a.cost < b.cost ){ return 1; }
          return 0;
      });
  }else if (criterio === ORDER_BY_PROD_REL){
      result = array.sort(function(a, b) {
          let aCount = parseInt(a.soldCount);
          let bCount = parseInt(b.soldCount);

          if ( aCount > bCount ){ return -1; }
          if ( aCount < bCount ){ return 1; }
          return 0;
      });
  }

  return result;
}

function setCatID(id) {
  localStorage.setItem("catID", id);
  window.location = "products.html"
}

function showCategoriesList(){

  let htmlContentToAppend ="";
  for (let i = 0; i < currentCategoriesArray.length; i++){
    let product = currentCategoriesArray[i]; 
     //condicion
    if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))) {

              htmlContentToAppend += `<div class="card " style="width: 20rem;">
              <h5 id="titulo${1}" class="card-title" >${product.name} - ${product.cost}</h5>  
              <div display-block; margin-0px-auto text-aling-center border-bottom-2rem; font-size: large;>
              <img id="image${1}" src="${product.image}" class="card-img-top" alt="card image cap">
              </div>
          <div class="card-body">
          <div class="d-flex w-100 justify-content-between">
            <p id="descripcion${i}"class="card-text">${product.description}</p>
          </div>
        <p  class="card-text"> <small id="small${1}">${product.soldCount} unidades disponibles </small></p>
          <div class="d-grid gap-2">
          <button class="btn btn-primary button"> Añadir a carrito</button>
          </div>
          </div>
        </div>
        `
  }
  
  document.getElementById("PRODUCTS").innerHTML = htmlContentToAppend;
}
}

// Ordena y muestra los productos ordenados según el criterio seleccionado

function sortAndShowCategories(sortCriterio, productsArray){
  currentSortCriterio = sortCriterio;

  if(productsArray != undefined){
      currentProductsArray = productsArray;
  }

  currentCategoriesArray = sortProducts(currentSortCriterio, currentCategoriesArray);

  //Muestro las categorías ordenadas
  showCategoriesList();
}

document.addEventListener ("DOMContentLoaded", function(e){
  getJSONData(PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE).then(function(resultObj){
      if (resultObj.status === "ok"){
          currentCategoriesArray = resultObj.data.products
          showCategoriesList()
         
      }
  });

document.getElementById("sortAsc").addEventListener("click", function(){
  sortAndShowCategories(ORDER_ASC_BY_COST);
});

document.getElementById("sortDesc").addEventListener("click", function(){
  sortAndShowCategories(ORDER_DESC_BY_COST);
});

document.getElementById("sortBySoldCount").addEventListener("click", function(){
  sortAndShowCategories(ORDER_BY_PROD_REL);
});

document.getElementById("clearRangeFilter").addEventListener("click", function(){
  document.getElementById("rangeFilterCostMin").value = "";
  document.getElementById("rangeFilterCostMax").value = "";

  minCost = undefined;
  maxCost = undefined;

  showCategoriesList();
});

document.getElementById("rangeFilterCost").addEventListener("click", function(){
 
  minCost = document.getElementById("rangeFilterCostMin").value;
  maxCost = document.getElementById("rangeFilterCostMax").value;

  if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
      minCost = parseInt(minCost);
  }
  else{
      minCost = undefined;
  }

  if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
      maxCost = parseInt(maxCost);
  }
  else{
      maxCost = undefined;
  }

  showCategoriesList();
});
});