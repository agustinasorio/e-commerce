const USER_25801 = `https://japceibal.github.io/emercado-api/user_cart/25801.json`;
const cartProducts = document.getElementById("cartProducts");
const shoppingCost = document.getElementById("express");
let productsOnStorage = JSON.parse(localStorage.getItem("productsOnCart")) || [];
let userCartProducts = [];


const cartForm = document.getElementById("cartForm");
const cardNumber = document.getElementById("cardNumber");
const securityCode = document.getElementById("securityCode");
const expiration = document.getElementById("expiration");
const accountNumber = document.getElementById("accountNumber");
const paymentSelection = document.getElementById("paymentSelection");
const invalidFeedback = document.querySelector(".invalidFeedback");
const submitForm = document.getElementById("submitForm");
const forms = document.getElementsByClassName("needs-validation");
const creditCardInputs = document.getElementsByClassName("cc-info");

const successIcon = document.createElement("i");
successIcon.classList.add("fas", "fal", "fa-check-circle", "ps-2");
successIcon.style.color = "#00e03c";
const errorIcon = document.createElement("i");
errorIcon.classList.add("fas", "fal", "fa-exclamation-circle", "ps-2");
errorIcon.style.color = "#ff0602";

let subTotalFinalUSD = 0;





//Funcion para calcular el costo final de todos los productos (sin incluir el costo del envio).
const calculateFinalCost = () => {
	let costAccumulator = 0;

	for (const product of userCartProducts) {
		let totalCostProduct = product.unitCost * product.count;
		if (product.currency == "UYU") {
			totalCostProduct = parseInt(totalCostProduct / 42);
			costAccumulator += totalCostProduct;
		} else {
			costAccumulator += totalCostProduct;
		}
	}

	subTotalFinalUSD = costAccumulator;
};

//Funcion que se encarga de calcular y posteriormente mostrar el subtotal, el costo del envio y el costo final (incluyendo el costo del envio).
const showFinalCost = () => {
	const subTotal = document.getElementById("subTotal");
	const shoppingCost = document.getElementById("shoppingCost");
	const totalCost = document.getElementById("total");

	subTotal.innerHTML = `USD ${subTotalFinalUSD}`;

	if (document.getElementById("premium").checked) {
		shoppingCost.innerHTML = `USD ${parseInt(subTotalFinalUSD * 0.15)}`;
		totalCost.innerHTML = `USD ${subTotalFinalUSD + parseInt(subTotalFinalUSD * 0.15)}`;
	} else if (document.getElementById("express").checked) {
		shoppingCost.innerHTML = `USD ${parseInt(subTotalFinalUSD * 0.07)}`;
		totalCost.innerHTML = `USD ${subTotalFinalUSD + parseInt(subTotalFinalUSD * 0.07)}`;
	} else if (document.getElementById("standard").checked) {
		shoppingCost.innerHTML = `USD ${parseInt(subTotalFinalUSD * 0.05)}`;
		totalCost.innerHTML = `USD ${subTotalFinalUSD + parseInt(subTotalFinalUSD * 0.05)}`;
	}
};

//Funcion que se encarga de crear todos los elementos HTML correspondientes a partir de los productos dentro del carrito de compras.
const showCartProducts = (product) => {
	let subTotalProducto = product.unitCost;
	subTotalFinalUSD += subTotalProducto;

	const tr = document.createElement("tr");

	tr.innerHTML = `
		<th scope="row"><img src="${product.image}" width="50px" alt="Im??gen del producto ${product.name}" /></th>
		<td>${product.name}</td>
		<td >${product.currency} ${product.unitCost}</td>
		<td><input class="inputCart" type="number" value="${product.count}" min="1"/></td>
		<td class="tdSubTotal col-2">${product.currency} ${product.unitCost}</td>
	`;

	cartProducts.appendChild(tr);
	const input = tr.querySelector("input");

	//Agrego el evento dentro del input para que cuando sea modificado tambien se modifique la propiedad count del producto correspondiente.
	input.addEventListener("input", () => {
		tr.querySelector(".tdSubTotal").innerHTML = `${product.currency} ${Number(input.value) * product.unitCost}`;
		product.count = input.value;
		calculateFinalCost();
		showFinalCost();
	});
    for (const p of paymentSelection)
    p.addEventListener("change", () => {
        // el primer metodo de pago es la tarjeta de credito
        const disable = paymentSelection[0].checked ? false : true;
        // habilitado o deshabilitado de campos segun el metodo seleccionado
        for (const input of creditCardInputs)
            input.disabled = disable;
        for (const input of bankTransferInputs)
            input.disabled = !disable;
        // mensaje de seleccion exitosa
        paymentSelection.innerText = disable ? "Transferencia Bancaria" : "Tarjeta de Credito";
        paymentSelection.style.color = "green";
        paymentSelection.appendChild(successIcon);
    });
};

document.addEventListener("DOMContentLoaded", (e) => {


	document.querySelector(".btn-close").addEventListener("click", () => {
		document.querySelector(".alert").style.display = "none";
	});

	

	document.getElementById("premium").addEventListener("click", () => {
		calculateFinalCost();
		showFinalCost();
	});

	document.getElementById("express").addEventListener("click", () => {
		calculateFinalCost();
		showFinalCost();
	});

	document.getElementById("standard").addEventListener("click", () => {
		calculateFinalCost();
		showFinalCost();
	});

//Funcion para calcular el costo final de todos los productos (sin incluir el costo del envio).
const calculateFinalCost = () => {
	let costAccumulator = 0;

	for (const product of userCartProducts) {
		let totalCostProduct = product.unitCost * product.count;
		if (product.currency == "UYU") {
			totalCostProduct = parseInt(totalCostProduct / 42);
			costAccumulator += totalCostProduct;
		} else {
			costAccumulator += totalCostProduct;
		}
	}

	subTotalFinalUSD = costAccumulator;
};

//Funcion que se encarga de calcular y posteriormente mostrar el subtotal, el costo del envio y el costo final (incluyendo el costo del envio).
const showFinalCost = () => {
	const subTotal = document.getElementById("subTotal");
	const shoppingCost = document.getElementById("shoppingCost");
	const totalCost = document.getElementById("total");

	subTotal.innerHTML = `USD ${subTotalFinalUSD}`;

	if (document.getElementById("premium").checked) {
		shoppingCost.innerHTML = `USD ${parseInt(subTotalFinalUSD * 0.15)}`;
		totalCost.innerHTML = `USD ${subTotalFinalUSD + parseInt(subTotalFinalUSD * 0.15)}`;
	} else if (document.getElementById("express").checked) {
		shoppingCost.innerHTML = `USD ${parseInt(subTotalFinalUSD * 0.07)}`;
		totalCost.innerHTML = `USD ${subTotalFinalUSD + parseInt(subTotalFinalUSD * 0.07)}`;
	} else if (document.getElementById("standard").checked) {
		shoppingCost.innerHTML = `USD ${parseInt(subTotalFinalUSD * 0.05)}`;
		totalCost.innerHTML = `USD ${subTotalFinalUSD + parseInt(subTotalFinalUSD * 0.05)}`;
	}
};

	//Validaciones para el Modal.
	document.getElementById("paymentMethod1").addEventListener("click", () => {
		accountNumber.setAttribute("disabled", "");
		cardNumber.removeAttribute("disabled", "");
		securityCode.removeAttribute("disabled", "");
		expiration.removeAttribute("disabled", "");

		paymentSelection.innerHTML = "Tarjeta de Cr??dito";
		invalidFeedback.style.display = "none";
	});

	//Validaciones para el Modal.
	document.getElementById("paymentMethod2").addEventListener("click", () => {
		accountNumber.removeAttribute("disabled", "");
		cardNumber.setAttribute("disabled", "");
		securityCode.setAttribute("disabled", "");
		expiration.setAttribute("disabled", "");

		paymentSelection.innerHTML = "Transferencia Bancaria";
		invalidFeedback.style.display = "none";
	});

	//Validaciones para el Formulario.
	document.getElementById("submitForm").addEventListener("click", (e) => {
        let valid = true;
        for (const form of forms) {
            if (!form.checkValidity()) {
                valid = false;
                // formulario de metodo de pago
                if (form.id === "pmForm") {
                    paymentSelection.innerText = "Debe rellenar los campos";
                    paymentSelection.style.color = "#ff0602";
                    paymentSelection.appendChild(errorIcon);
                }
            }
            form.classList.add('was-validated');
        }
        if (valid) {
            alert.classList.remove("d-none");
            setTimeout( () => {
                for (const form of forms) 
                    form.submit();
                window.location.replace("main.html");
            }, 3000);
        }
    });

	//Obtenemos los datos del carrito de compras para mostrarlos mediante elementos HTML.
	getJSONData(USER_25801).then((resultObj) => {
		if (resultObj.status === "ok") {
			userCartProducts = [...resultObj.data.articles, ...productsOnStorage];
			userCartProducts.forEach((product) => showCartProducts(product));
			calculateFinalCost();
			showFinalCost();
		}
	});
});
















