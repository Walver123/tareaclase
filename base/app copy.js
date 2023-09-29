const container = document.querySelector("#contenedor");
const modalBody = document.querySelector(".modal .modal-body");

const containerShoppingCart = document.querySelector("#carritoContenedor");
const removeAllProductsCart = document.querySelector("#vaciarCarrito");

const keepBuy = document.querySelector("#procesarCompra");
const totalPrice = document.querySelector("#precioTotal");

const fakeStoreApi = "https://fakestoreapi.com/products";

let shoppingCart = [];
let productList = [];
let counter = 0;
let quantity = [];
let selectedCategory = "all";

const fetchProducts = async () => {
  try {
    const response = await fetch(fakeStoreApi);
    if (!response.ok) {
      throw new Error("No se pudo conectar");
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
  showProducts();
};

const showProducts = () => {
  container.innerHTML = "";
  const filteredProducts = selectedCategory === "all" ? productList : productList.filter(product => product.category === selectedCategory);
  filteredProducts.forEach(addProductsContainer);
};

const filterByCategory = () => {
  selectedCategory = document.querySelector("#categorias").value;
  showProducts();
};

const sortAlphabetically = () => {
  productList.sort((a, b) => a.title.localeCompare(b.title));
  showProducts();
};

const showAddProductForm = () => {
  const form = document.querySelector("#nuevoProductoForm");
  form.style.display = "block";
};

const addNewProduct = () => {
  const titulo = document.querySelector("#titulo").value;
  const precio = parseFloat(document.querySelector("#precio").value);
  const descripcion = document.querySelector("#descripcion").value;
  const categoria = document.querySelector("#categoria").value;
  const imagen = document.querySelector("#imagen").value;

  const newProduct = {
    title: titulo,
    price: precio,
    description: descripcion,
    category: categoria,
    image: imagen,
  };

  productList.push(newProduct);
  showProducts();

  document.querySelector("#nuevoProductoForm").reset();
  document.querySelector("#nuevoProductoForm").style.display = "none";
};

const showUpdateProductForm = () => {
  const form = document.querySelector("#actualizarProductoForm");
  form.style.display = "block";
};

const updateProduct = () => {
  const productId = parseInt(document.querySelector("#productId").value);
  const newTitle = document.querySelector("#newTitle").value;
  const newPrice = parseFloat(document.querySelector("#newPrice").value);
  const newDescription = document.querySelector("#newDescription").value;
  const newCategory = document.querySelector("#newCategory").value;
  const newImage = document.querySelector("#newImage").value;

  const productToUpdate = productList.find(product => product.id === productId);
  if (productToUpdate) {
    productToUpdate.title = newTitle || productToUpdate.title;
    productToUpdate.price = newPrice || productToUpdate.price;
    productToUpdate.description = newDescription || productToUpdate.description;
    productToUpdate.category = newCategory || productToUpdate.category;
    productToUpdate.image = newImage || productToUpdate.image;
    showProducts();
  }
};

const removeProducts = (id) => {
  const index = shoppingCart.findIndex((item) => item.id === id);

  if (index !== -1) {
    shoppingCart.splice(index, 1);
    showShoppingCart();
  }
};

removeAllProductsCart.addEventListener("click", () => {
  shoppingCart.length = 0;
  showShoppingCart();
});

const messageEmptyShoppingCart = () => {
  if (shoppingCart.length === 0) {
    modalBody.innerHTML = `
      <p class="text-center text-primary parrafo">No hay nada en el carrito!</p>
    `;
  }
};

keepBuy.addEventListener("click", () => {
  if (shoppingCart.length === 0) {
    Swal.fire({
      title: "Su carrito está vacío",
      text: "Compre algo para continuar",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  } else {
    location.href = "index.html";
    finalOrder();
  }
});

const totalPriceInCart = (totalPriceCart) => {
  totalPriceCart.innerText = shoppingCart.reduce((acc, prod) => {
    return acc + prod.price;
  }, 0);
};

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