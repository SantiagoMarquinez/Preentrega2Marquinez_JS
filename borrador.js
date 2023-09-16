// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {

        // Función para mostrar los botones en el carrito
        function mostrarBotonesCarrito() {
            carritoVisible = true;
            // Oculta el botón "Ir al carrito"
            irAlCarritoBtn.style.display = "none";
            
            const botonesCarro = document.getElementById("botonesCarro");
    
            // Muestra los botones "Pagar", "Vaciar carrito" y "Volver"
            const botones = document.createElement("div");
            botones.innerHTML = `
                <button class="btn btn-success" id="pagarBtn">Pagar</button>
                <button class="btn btn-danger" id="vaciarCarritoBtn">Vaciar carrito</button>
                <button class="btn btn-secondary" id="volverBtn">Seguir Comprando</button>
            `;
            botonesCarro.appendChild(botones);
    
            // Agrega eventos a los botones
            const pagarBtn = document.getElementById("pagarBtn");
            const vaciarCarritoBtn = document.getElementById("vaciarCarritoBtn");
            const volverBtn = document.getElementById("volverBtn");
    
            pagarBtn.addEventListener("click", pagar);
            vaciarCarritoBtn.addEventListener("click", () => {
                vaciarCarrito(carrito);
                // Oculta los botones y muestra el botón "Ir al carrito"
                botonesCarro.innerHTML = "";
                irAlCarritoBtn.style.display = "block";
            });
            volverBtn.addEventListener("click", () => {
                // Recarga la página
                location.reload();
            });
        }

    function cart(carrito) {
        const divBotones = document.getElementById("botonesCarro");

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

        if (localStorage.length > 0) {
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
        } else {
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



    // Función para vaciar el carrito
    function vaciarCarrito(carrito) {
        carrito.length = 0; // Esto elimina todos los elementos del arreglo
        localStorage.removeItem("carrito");
        cart(carrito); // Llama nuevamente a la función cart para actualizar la vista del carrito
    }
    function cargarProductos() {
        fetch("./data.json")
            .then((response) => response.json())
            .then((data) => {
                const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
                const carrito = carritoGuardado || [];
                contenedorProductos.innerHTML = "";

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
    let carrito = [];
    const header = document.querySelector("header");
    let carritoVisible = false;
    let h1 = document.createElement("h1");
    h1.innerHTML = "Bienvenido a la tienda";
    header.appendChild(h1);
    h1.classList.add("encabezado");
    // Busca el botón "Ir al carrito" por su ID
    const irAlCarritoBtn = document.getElementById("irAlCarrito");

    // Agrega un evento al botón "Ir al carrito"
    irAlCarritoBtn.addEventListener("click", () => {
        // Lógica para mostrar los botones y productos del carrito
        carritoVisible = true;
        cart(carrito);
        mostrarBotonesCarrito();
    });
const contBotonCarrito = document.getElementById("botonesCarro");

    document.body.className = "fondo";

    const contenedorProductos = document.querySelector(".vidriera");
    cargarProductos();
})
