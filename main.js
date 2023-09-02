//objetos

class NuevoUsuario{
    constructor(usuario, password){
        this.usuario = usuario;
        this.password = password;
    }
}

class Articulo{
    constructor(item, precio, stock, foto){
    this.item = item;
    this.precio = precio;
    this.stock = stock;
    this.foto = foto;    
    }
}

class ArticuloVendido{
    constructor(item, precio, foto){
        this.item = item;
        this.precio = precio;
        this.foto = foto;
    }
}


//Funciones
const mayor = (edad,admitir)=>{
    if (edad>=18){
        return true;
    }else{
        return false;
    }
}

function masCaro (carrito){
    let max = 0;
    let caro = "";
    for (i=0; i<carrito.length; i++){
        if(carrito[i].precio > max){
            max = carrito[i].precio;
            caro = carrito[i].item;        
        }
    }
    alert (`El artículo más caro es: ${caro}`);
}

function sumar(prod, carrito){
    for (const item of carrito){
        if (item.item === prod){
            item.ventas++;
            break;
        } 
    }
}


const comprar = (carrito) => {
    carrito = [];
    const artVendido = [];
    let cantidad = 0;
    let monto = 0;
    alert("usted puede compar camiseta, short o campera");
    let articulo = prompt("¿Que desea comprar?");
    while (articulo != "pagar") {
        switch (articulo) {
            case "camiseta":
                carrito.push(new ArticuloVendido ("camiseta", 15000,"camiseta.png"));
                cantidad++;
                monto +=15000;
                sumar ("camiseta",carrito);
                break;
            case "short":
                carrito.push(new ArticuloVendido ("short", 10000,"short.png"));
                cantidad++;
                monto +=15000;
                sumar ("short",carrito);
                break;
            case "campera":
                carrito.push(new ArticuloVendido ("campera", 30000,"campera.png"));
                cantidad++;
                monto +=15000;
                sumar ("campera",carrito);
                break;
            default:
                alert("no ingreso un artículo valido")
                break;
        }
        articulo = prompt("Para seguir comprando ingrese otro artículo. Si ya terminó ingrese `pagar`");
    }
    if(monto != 0){
        let carritoInfo = "";

        for (const item of carrito){
            carritoInfo += `${item.item}, ${item.precio}\n`;
        }
        alert(`Usted tiene en el carrito los siguientes productos: \n ${carritoInfo} `);
        alert(`Usted compró ${cantidad} artículo/s. El total de su factura es $ ${monto}. Gracias por su compra`);
    }else {
        alert("Gracias por visitar nuestra tienda");
    }
    masCaro(carrito);
}

// Algoritmo principal

let header = document.querySelector("header");
let h1 = document.createElement("h1");
h1.textContent = "Bienvenido a la tienda";
header.appendChild(h1);
h1.classList.add("encabezado");

document.body.className = "fondo";
// const body= document.querySelector(".fondo");
// body.classList.add ("probando")
const productos = [];
productos.push(new Articulo ("camiseta", 15000, 30, "./images/camiseta.webp" ));
productos.push(new Articulo ("short", 10000, 43, "./images/short.webp" ));
productos.push(new Articulo ("campera", 30000, 15, "./images/campera.png" ));
let admitir = false;
let edad = parseInt(prompt("Ingrese su edad"))
const carrito = [];
const respuesta = mayor(edad, admitir);
console.log(respuesta)
if (respuesta) {
    alert("Bienvenido a la tienda");
    comprar(carrito);
} else {
    alert("Usted no tiene edad para acceder a esta tienda");
}