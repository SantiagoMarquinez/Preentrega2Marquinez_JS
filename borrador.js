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
    localStorage.removeItem("carrito"); // También puedes quitar el carrito del almacenamiento local si lo deseas
    cart(carrito); // Llama nuevamente a la función cart para actualizar la vista del carrito
}

function eliminarDelCarrito(carrito, index) {
    carrito.splice(index, 1); // Elimina el producto del carrito en el índice especificado
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualiza el carrito en el almacenamiento local
    cart(carrito); // Vuelve a renderizar el carrito para reflejar los cambios
}

function cart(carrito) {
        if (carrito.length > 0) {
            contenedorProductos.innerHTML = "";
            carrito.forEach((producto, index) => {
                const div = document.createElement("div");
                div.classList.add("tarjeta");
                div.innerHTML = `
                <img src="${producto.foto}" alt="${producto.item}" class="card-img-top imagen">
                <div class="card-body">
                <h5 class="card-title">${producto.item}</h5>
                <h6 class="card-text">${producto.precio}</h6>
                <button class="btn btn-danger eliminar" data-index="${index}">Eliminar</button>
                </div>
                `;
    
                const botonEliminar = div.querySelector(".eliminar");
                botonEliminar.addEventListener("click", () => eliminarDelCarrito(carrito, index));
    
                contenedorProductos.appendChild(div);
                localStorage.setItem("carrito", JSON.stringify(carrito));
            });
    // if(carrito.length>0){
    //     contenedorProductos.innerHTML = "";
    //     carrito.forEach(producto => {
    //         const div = document.createElement("div");
    //         div.classList.add("tarjeta");
    //         div.innerHTML = `
    //         <img src="${producto.foto}" alt="${producto.item}" class="card-img-top imagen">
    //         <div class="card-body">
    //         <h5 class="card-title">${producto.item}</h5>
    //         <h6 class="card-text">${producto.precio}</h6>
    //         `;

    //         //const botonAgregar = div.querySelector(".boton");   ESTAS DOS LINEAS TRANSFORMARLAS EN EL BOTON BORRAR PRODUCTO
    //         //botonAgregar.addEventListener("click", () => agregarAlCarrito(carrito, producto));

    //         contenedorProductos.append(div);
    //         localStorage.setItem("carrito",JSON.stringify(carrito));
            
    //     });
    } else{
        contenedorProductos.innerHTML = `
        <h2 class="encabezado">Lo siento, no hay productos en el carrito</h2>
        <img src="./images/sadFace.jpg" alt="cara triste" class="imagen">
        `;
        
    }
    const botonVaciarCarrito = document.createElement("button");
    botonVaciarCarrito.textContent = "Vaciar Carrito";
    botonVaciarCarrito.classList.add("btn", "btn-danger", "botonVaciarCarrito");
    contenedorProductos.appendChild(botonVaciarCarrito);    
    botonVaciarCarrito.addEventListener("click", () => vaciarCarrito(carrito));

}

function agregarAlCarrito(carrito, producto) {
    carrito.push(producto);
    console.log(carrito);
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

    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("tarjeta");
        div.innerHTML = `
        <img src="${producto.foto}" alt="${producto.item}" class="card-img-top imagen">
        <div class="card-body">
        <h5 class="card-title">${producto.item}</h5>
        <h6 class="card-text">${producto.precio}</h6>
        <button name="button" class="btn btn-primary boton">Agregar al carrito</button>
    
        </div>
        `;

        const botonAgregar = div.querySelector(".boton");
        botonAgregar.addEventListener("click", () => agregarAlCarrito(carrito, producto));

        contenedorProductos.append(div);
    });
    const contBotonCarrito = document.createElement("div");
    contBotonCarrito.innerHTML =`
    <button name="button" class="btn btn-primary botonCarrito">Carrito</button>
    
    `;
    contenedorProductos.append(contBotonCarrito);
    contBotonCarrito.addEventListener("click", () => cart(carrito));

}

// Algoritmo principal
const header = document.querySelector("header");

let h1 = document.createElement("h1");
h1.innerHTML = "Bienvenido a la tienda";
header.appendChild(h1);
h1.classList.add("encabezado");
const input = document.createElement("input");
input.type = "text";
input.placeholder = "Buscar producto";
header.appendChild(input);
document.body.className = "fondo";

const contenedorProductos = document.querySelector(".vidriera");
const productos = [];
productos.push(new Articulo("camiseta", 15000, 30, "./images/camiseta.webp"));
productos.push(new Articulo("short", 10000, 43, "./images/short.webp"));
productos.push(new Articulo("campera", 30000, 15, "./images/campera.png"));
cargarProductos(productos);









