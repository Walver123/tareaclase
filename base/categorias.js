const container = document.querySelector("#contenedor");
const modalBody = document.querySelector(".modal .modal-body");

const containerShoppingCart = document.querySelector("#carritoContenedor");
const removeAllProductsCart = document.querySelector("#vaciarCarrito");

const keepBuy = document.querySelector("#procesarCompra");
const totalPrice = document.querySelector("#precioTotal");

const activeFunction = document.querySelector('#activarFuncion')



const fakeStorecategorie = "https://fakestoreapi.com/products/categories";

//definimos un arreglo para guardar los productos que se agreguen al carrito
let shoppingCart = [];

//definimos un arreglo para guardar la lista de productos
let productList = [];

//definimos un contador para saber cuantos productos se agregan al carrito
let counter = 0;
// definimos un arreglo para guardar la cantidad de productos
let quantity = [];

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

    

    // const { id, title, image, price, description } = product;
    // container.innerHTML += `
    // <div class="card mt-3" style="width: 18rem;">
    // <img class="card-img-top mt-2" src="${image}" alt="Card image cap">
    //   <div class="card-body">
    //     <h5 class="card-title">${title}</h5>
    //     <p class="card-text" style="font-weight: bold">$ ${price}</p>
    //     <p class="card-text">• ${description}</p>
    //     <button class="btn btn-primary" onclick="addProduct(${id})">Comprar producto</button>
    //   </div>
    // </div>
    // `;
  };

  const getProducts = async () => {
    const products = await fetchProducts();
    console.table(products);
    products.forEach(addProductsContainer);
  
    productList = products;
  };
  
  