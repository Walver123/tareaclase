const container = document.querySelector("#contenedor");
const modalBody = document.querySelector(".modal .modal-body");

const containerShoppingCart = document.querySelector("#carritoContenedor");
const removeAllProductsCart = document.querySelector("#vaciarCarrito");

const keepBuy = document.querySelector("#procesarCompra");
const totalPrice = document.querySelector("#precioTotal");

const activeFunction = document.querySelector('#activarFuncion')


const fakeStoreApi = "https://fakestoreapi.com/products";


//definimos un arreglo para guardar los productos que se agreguen al carrito
let shoppingCart = [];

//definimos un arreglo para guardar la lista de productos
let productList = [];

//definimos un contador para saber cuantos productos se agregan al carrito
let counter = 0;
// definimos un arreglo para guardar la cantidad de productos
let quantity = [];


// soticitar y agregar al contenedor
const fetchProducts = async () => {
  try {
    const response = await fetch(fakeStoreApi);
    if (!response.ok) {
      throw new Error("no se pudo conectar");
    }

    return await response.json();
  } catch (error) {
    console.log(error.message);
  }
};

const addProductsContainer = (product) => {
  
  const { id, title, image, price, description } = product;
  container.innerHTML += `
  <div class="card mt-3" style="width: 18rem;">
  <img class="card-img-top mt-2" src="${image}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p class="card-text" style="font-weight: bold">$ ${price}</p>
      <p class="card-text">• ${description}</p>
      <button class="btn btn-primary" onclick="addProduct(${id})">Comprar producto</button>
    </div>
  </div>
  `;
};

const getProducts = async () => {
  const products = await fetchProducts();
  console.table(products);
  products.forEach(addProductsContainer);

  productList = products;
};

// agregando productos al carrito

const addProduct = (id) => {
  const testProductId = shoppingCart.some((item) => item.id === id);

  if (testProductId) {
    Swal.fire({
      title: "Este chunche ya fue seleccionado",
      text: "Por favor seleccione otra cosa",
      icon: "success",
    });
    return;
  }

  shoppingCart.push({
    ...productList.find((item) => item.id === id),
    quantity: 1,
  });

  showShoppingCart();
};

// carrito de compras

const showShoppingCart = () => {
  modalBody.innerHTML = "";

  shoppingCart.forEach((product) => {
    const { title, image, price, id } = product;

    modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
          <img class="img-fluid img-carrito" src="${image}"/>
        </div>
        <div>
          <p style="font-weight: bold">${title}</p>
          <p style="font-weight: bold">Precio: R$ ${price}</p>
          <div>
            <button onclick="removeProducts(${id})" class="btn btn-danger">Eliminar produto</button>
          </div>
        </div>
      </div>
    `;
  });

  totalPriceInCart(totalPrice);
  messageEmptyShoppingCart();
  containerShoppingCart.textContent = shoppingCart.length;
  setItemInLocalStorage();
};

//quitar productos del carrito

const removeProducts = (id) => {
  const index = shoppingCart.findIndex((item) => item.id === id);

  if (index !== -1) {
    shoppingCart.splice(index, 1);
    showShoppingCart();
  }
};

// vaciar carrito de compras

removeAllProductsCart.addEventListener("click", () => {
  shoppingCart.length = [];
  showShoppingCart();
});

// mensagem carrinho vazio
const messageEmptyShoppingCart = () => {
  if (shoppingCart.length === 0) {
    modalBody.innerHTML = `
      <p class="text-center text-primary parrafo">No hay nada en el carrito!</p>
    `;
  }
};

// continuar comprando

keepBuy.addEventListener("click", () => {
  if (shoppingCart.length === 0) {
    Swal.fire({
      title: "su carrito está vacío",
      text: "Compre algo para continuar",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  } else {
    location.href = "index.html";
    finalOrder()
  }
});






// precio total en el carrito
const totalPriceInCart = (totalPriceCart) => {
  totalPriceCart.innerText = shoppingCart.reduce((acc, prod) => {
    return acc + prod.price;
  }, 0);
}; 

// local storage
const setItemInLocalStorage = () => {
  localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
};

const addItemInLocalStorage = () => {
  shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
  setItemInLocalStorage();
  showShoppingCart();
};

document.addEventListener("DOMContentLoaded", addItemInLocalStorage);
getProducts();


