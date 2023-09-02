//funciones
class Articulo {
    constructor(item, precio, stock, foto) {
        this.item = item;
        this.precio = precio;
        this.stock = stock;
        this.foto = foto;
    }
}

// Función para vaciar el carrito
function vaciarCarrito(carrito) {
    carrito.length = 0; // Esto elimina todos los elementos del arreglo
    localStorage.removeItem("carrito"); // Sacar el carrito del almacenamiento local si lo deseas
    cart(carrito); // Llama nuevamente a la función cart para actualizar la vista del carrito
}

function eliminarDelCarrito(carrito, index) {
    carrito.splice(index, 1); // Elimina el producto del carrito en el índice especificado
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualiza el carrito en el almacenamiento local
    cart(carrito); // Vuelve a renderizar el carrito para reflejar los cambios
}

function cart(carrito) {
    const divBotones = document.createElement("div");
    divBotones.classList.add("botones-carrito");
    if (carrito.length > 0) {
        contenedorProductos.innerHTML = "";
        carrito.forEach((producto, index) => {
            const div = document.createElement("div");
            div.classList.add("tarjeta");
            div.innerHTML = `
            <img src="${producto.foto}" alt="${producto.item}" class="card-img-top imagen">
            <div class="card-body">
            <h5 class="card-title">${producto.item}</h5>
            <h6 class="card-text">$${producto.precio}</h6>
            <button class="btn btn-danger eliminar" data-index="${index}">Eliminar</button>
            </div>
            `;
    
            const botonEliminar = div.querySelector(".eliminar");
            botonEliminar.addEventListener("click", () => eliminarDelCarrito(carrito, index));
    
            contenedorProductos.appendChild(div);
            localStorage.setItem("carrito", JSON.stringify(carrito));
        });
        } else{
            contenedorProductos.innerHTML = `
            <h2 class="encabezado">Lo siento, no hay productos en el carrito</h2>
            `;
        }
    const montoCompra = document.createElement("p");
    montoCompra.classList.add("parrafoMonto");
    montoCompra.innerHTML = `Monto de la compra: $0`; 
    divBotones.appendChild(montoCompra);

    function calcularMontoCompra() {
        const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
        montoCompra.innerHTML = `Monto de la compra: $${total}`;
    };

    calcularMontoCompra();
    
    const botonPagar = document.createElement("button");
    botonPagar.textContent = "Pagar";
    botonPagar.classList.add("btn", "btn-success", "botonPagar");
    divBotones.appendChild(botonPagar);

    const botonVaciarCarrito = document.createElement("button");
    botonVaciarCarrito.textContent = "Vaciar Carrito";
    botonVaciarCarrito.classList.add("btn", "botonVaciar", "boton", "botonVaciarCarrito");
    divBotones.appendChild(botonVaciarCarrito);    
    botonVaciarCarrito.addEventListener("click", () => vaciarCarrito(carrito));

    const botonRecargarPagina = document.createElement("button");
    botonRecargarPagina.textContent = "Volver";
    botonRecargarPagina.classList.add("btn", "btn-primary","botonPagar", "botonRecargarPagina");
    divBotones.appendChild(botonRecargarPagina);

    botonRecargarPagina.addEventListener("click", () => location.reload());

    contenedorProductos.appendChild(divBotones);        
}

function agregarAlCarrito(carrito, producto) {
    carrito.push(producto);
}

// Calcula y muestra el monto de la compra
function calcularMontoCompra() {
    const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
    montoCompra.innerHTML = `Monto de la compra: $${total}`;
}

function cargarProductos(productos) {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito"))
    const carrito = [];
    if(!carritoGuardado){
        const carrito = [];
    }else{
        for(i=0; i<carritoGuardado.length; i++){
            carrito.push(carritoGuardado[i]);
        }
    }
    contenedorProductos.innerHTML = "";
    const contBotonCarrito = document.createElement("div");
    contBotonCarrito.innerHTML =`
    <button name="button" class="btn btn-primary boton botonCarrito">Carrito</button>
    `;
    contenedorProductos.append(contBotonCarrito);
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("tarjeta");
        div.innerHTML = `
        <img src="${producto.foto}" alt="${producto.item}" class="card-img-top imagen">
        <div class="card-body">
        <h5 class="card-title">${producto.item}</h5>
        <h6 class="card-text">$${producto.precio}</h6>
        <button name="button" class="btn btn-primary boton">Agregar al carrito</button>
    
        </div>
        `;

        const botonAgregar = div.querySelector(".boton");
        botonAgregar.addEventListener("click", () => agregarAlCarrito(carrito, producto));

        contenedorProductos.append(div);
    });
    contBotonCarrito.addEventListener("click", () => cart(carrito));

}

// Algoritmo principal
const header = document.querySelector("header");
let h1 = document.createElement("h1");
h1.innerHTML = "Bienvenido a la tienda";
header.appendChild(h1);
h1.classList.add("encabezado");

document.body.className = "fondo";

const contenedorProductos = document.querySelector(".vidriera");
const productos = [];
productos.push(new Articulo("Camiseta", 34000, 30, "./images/camiseta.webp"));
productos.push(new Articulo("Camiseta alternativa negra", 33000, 43, "./images/camisetaNegra.png"));
productos.push(new Articulo("Camiseta alternativa Blanca", 34000, 43, "./images/camisetaBlanca.png"));
productos.push(new Articulo("Short", 22000, 43, "./images/short.webp"));
productos.push(new Articulo("Short alternativo", 21000, 43, "./images/shortNegro.png"));
productos.push(new Articulo("Camperón", 80000, 43, "./images/camperon.jpg"));
productos.push(new Articulo("Campera", 30000, 15, "./images/campera.png"));
cargarProductos(productos);









