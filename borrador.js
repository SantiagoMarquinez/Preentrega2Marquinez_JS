//funciones
class Articulo {
    constructor(item, precio, stock, foto) {
        this.item = item;
        this.precio = precio;
        this.stock = stock;
        this.foto = foto;
    }
}

function cart (carrito){
    contenedorProductos.innerHTML = "";

    carrito.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("tarjeta");
        div.innerHTML = `
        <img src="${producto.foto}" alt="${producto.item}" class="card-img-top imagen">
        <div class="card-body">
        <h5 class="card-title">${producto.item}</h5>
        <h6 class="card-text">${producto.precio}</h6>
        `;

        //const botonAgregar = div.querySelector(".boton");   ESTAS DOS LINEAS TRANSFORMARLAS EN EL BOTON BORRAR PRODUCTO
        //botonAgregar.addEventListener("click", () => agregarAlCarrito(carrito, producto));

        contenedorProductos.append(div);
    });

}

function agregarAlCarrito(carrito, producto) {
    carrito.push(producto);
    alert(`Agregué al carrito ${producto.item}`);
}

function cargarProductos(productos) {
    const carrito = [];
    contenedorProductos.innerHTML = "";

    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("tarjeta");
        div.innerHTML = `
        <img src="${producto.foto}" alt="${producto.item}" class="card-img-top imagen">
        <div class="card-body">
        <h5 class="card-title">${producto.item}</h5>
        <h6 class="card-text">${producto.precio}</h6>
        <a href="#" class="btn btn-primary boton" data-item="${producto.item}">Agregar al carrito</a>
        </div>
        `;

        const botonAgregar = div.querySelector(".boton");
        botonAgregar.addEventListener("click", () => agregarAlCarrito(carrito, producto));

        contenedorProductos.append(div);
    });
    const contBotonCarrito = document.createElement("div");
    contBotonCarrito.innerHTML =`
    <a href="#" class="btn btn-primary botonCarrito" >Carrito</a>
    `;
    contenedorProductos.append(contBotonCarrito);
    if(carrito.length>0){
        botonALCarrito.addEventListener(click,() => cart(carrito));
        botonALCarrito.addEventListener("click", () => cart(carrito));
    }
}

// Algoritmo principal
let header = document.querySelector("header");
let h1 = document.createElement("h1");
h1.textContent = "Bienvenido a la tienda";
header.appendChild(h1);
h1.classList.add("encabezado");
document.body.className = "fondo";

const contenedorProductos = document.querySelector(".vidriera");
const productos = [];
productos.push(new Articulo("camiseta", 15000, 30, "./images/camiseta.webp"));
productos.push(new Articulo("short", 10000, 43, "./images/short.webp"));
productos.push(new Articulo("campera", 30000, 15, "./images/campera.png"));
cargarProductos(productos);









