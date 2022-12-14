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

function getProductsByCategoryId(id){
  return getJSONData(PRODUCTS_URL + id + EXT_TYPE)
          .then( (response) => {
              return response.data;
          });
          
}

//llevar a product
function setProductID(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html"
}



function showCategoriesList(){

  let htmlContentToAppend ="";
  for (let i = 0; i < currentCategoriesArray.length; i++){
    let product = currentCategoriesArray[i]; 
     //condicion
    if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))) {

              htmlContentToAppend += `<div onclick=setProductID(${product.id}) class="list-group-item list-group-item-action cursor-active m-auto p-10px">
              <div class="row">
                  <div class="col-3">
                      <img src="${product.image}" id="image${1}" alt="${product.name}" class="img-thumbnail">
                  </div>
                  <div class="col">
                      <div class="d-flex w-100 justify-content-between">
                          <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4>
                          <small class="text-muted">${product.soldCount} vendidos</small>
                      </div>
                      <p class="mb-1">${product.description}</p>
                  </div>
              </div>
          </div>`
  }
  
  document.getElementById("PRODUCTS").innerHTML = htmlContentToAppend;
}
}

// Ordena y muestra los productos ordenados seg??n el criterio seleccionado

function sortAndShowCategories(sortCriterio, productsArray){
  currentSortCriterio = sortCriterio;

  if(productsArray != undefined){
      currentProductsArray = productsArray;
  }

  currentCategoriesArray = sortProducts(currentSortCriterio, currentCategoriesArray);

  //Muestro las categor??as ordenadas
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