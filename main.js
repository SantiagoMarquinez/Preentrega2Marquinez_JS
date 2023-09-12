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
    localStorage.removeItem("carrito");
    cart(carrito); // Llama nuevamente a la función cart para actualizar la vista del carrito
}

function eliminarDelCarrito(carrito, index) {
    carrito.splice(index, 1); // Elimina el producto del carrito en el índice especificado
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualiza el carrito en el almacenamiento local
    cart(carrito); // Vuelve a renderizar el carrito para reflejar los cambios
}


function pagar() {

    if (localStorage.length>0){
        Toastify({
            text: "Su pago fue realizado con éxito. Gracias por su compra.",
            duration: 2000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "center",
            stopOnFocus: true, 
            style: {
                backgroundColor: "#32CD32",
            },
            onClick: function () { }
        }).showToast();
    } else{
        Toastify({
            text: "Su carrito esta vacio. No es posible realizar el pago",
            duration: 2000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "center",
            stopOnFocus: true, 
            style: {
                backgroundColor: "#32CD32",
            },
            onClick: function () { }
        }).showToast();

    }
}


function cart(carrito) {
    const divBotones = document.getElementById("botonesCarro");
     // Elimina el contenido del botón "Carrito" si estamos en el carrito
    if (carritoVisible) {
        contBotonCarrito.innerHTML = '';
    }

    // Verifica si los botones ya existen en el DOM antes de crearlos nuevamente
    if (!divBotones.querySelector(".botonVaciar")) {
        const montoCompra = document.createElement("p");
        montoCompra.classList.add("parrafoMonto");
        montoCompra.innerHTML = `Monto de la compra: $0`;
        divBotones.appendChild(montoCompra);

        // Calcula y muestra el monto de la compra
        function calcularMontoCompra() {
            const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
            montoCompra.innerHTML = `Monto de la compra: $${total}`;
        };

        calcularMontoCompra();

        const botonPagar = document.createElement("button");
        botonPagar.textContent = "Pagar";
        botonPagar.classList.add("btn", "btn-success", "botonPagar");
        divBotones.appendChild(botonPagar);
        botonPagar.addEventListener("click", () => {
            pagar();
        });

        const botonVaciarCarrito = document.createElement("button");
        botonVaciarCarrito.textContent = "Vaciar Carrito";
        botonVaciarCarrito.classList.add("btn", "botonVaciar", "boton", "botonVaciarCarrito");
        divBotones.appendChild(botonVaciarCarrito);
        botonVaciarCarrito.addEventListener("click", () => vaciarCarrito(carrito));

        const botonRecargarPagina = document.createElement("button");
        botonRecargarPagina.textContent = "Volver";
        botonRecargarPagina.classList.add("btn", "btn-primary", "botonPagar", "botonRecargarPagina");
        divBotones.appendChild(botonRecargarPagina);
        botonRecargarPagina.addEventListener("click", () => location.reload());
    }
    if (carrito.length > 0) {
        contenedorProductos.innerHTML = "";
        carrito.forEach(({ item, precio, foto }, index) => {
            const div = document.createElement("div");
            div.classList.add("tarjeta");
            div.innerHTML = `
            <img src="${foto}" alt="${item}" class="card-img-top imagen">
            <div class="card-body">
            <h5 class="card-title">${item}</h5>
            <h6 class="card-text">$${precio}</h6>
            <button class="btn btn-danger eliminar" data-index="${index}">Eliminar</button>
            </div>
            `;

            const botonEliminar = div.querySelector(".eliminar");
            botonEliminar.addEventListener("click", () => eliminarDelCarrito(carrito, index));

            contenedorProductos.appendChild(div);
            localStorage.setItem("carrito", JSON.stringify(carrito));
        });
    } else {
        contenedorProductos.innerHTML = `
            <h2 class="encabezado">Lo siento, no hay productos en el carrito</h2>
            `;
    }
}

function agregarAlCarrito(carrito, producto) {
    carrito.push(producto);
    Toastify({
        text: "Producto agregado al carrito",
        duration: 1500,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            backgroundColor: "#8a2be2",
        },
        onClick: function () { } // Callback after click
    }).showToast();
}



// Calcula y muestra el monto de la compra
function calcularMontoCompra() {
    const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
    montoCompra.innerHTML = `Monto de la compra: $${total}`;
}



function cargarProductos() {
    fetch("./data.json")
        .then((response) => response.json())
        .then((data) => {
            const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
            const carrito = carritoGuardado || [];
            contenedorProductos.innerHTML = "";

            if (!carritoVisible) {
                contBotonCarrito.innerHTML = `
                    <button name="button" class="btn btn-primary boton botonCarrito">Carrito</button>
                `;
            }

            data.forEach((producto) => {
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

            contBotonCarrito.addEventListener("click", () => {
                carritoVisible = true;
                cart(carrito);
            });
        })
        .catch((error) => {
            console.error("Error al cargar los productos:", error);
        });
}

// Algoritmo principal
const header = document.querySelector("header");
let carritoVisible = false;
let h1 = document.createElement("h1");
h1.innerHTML = "Bienvenido a la tienda";
header.appendChild(h1);
h1.classList.add("encabezado");
const contBotonCarrito = document.getElementById("botonHeader");

document.body.className = "fondo";

const contenedorProductos = document.querySelector(".vidriera");
//const productos = [];
cargarProductos();