//OBJETOS

class Articulo{
    constructor(item, precio, stock, foto){
    this.item = item;
    this.precio = precio;
    this.stock = stock;
    this.foto = foto;    }
}

//FUNCIONES

const mayor = (edad, admitir) => {
    if (edad >= 18) {
        return true;
    } else {
        return false;
    }
}


const comprar = (productos) => {
    let cantidad = 0;
    let monto = 0;
    alert("usted puede compar camiseta, short o campera")
    let articulo = prompt("¿Que desea comprar?")
    while (articulo != "pagar") {
        switch (articulo) {
            case "camiseta":
                cantidad++;
                monto +=15000;
                if (productos[0].stock > 0){
                    productos[0].stock =productos[0].stock-1;
                } else{
                    alert("Producto fuera de stock, disculpe las molestias")
                }
                break;
            case "short":
                cantidad++;
                monto +=10000;
                if (productos[1].stock>0){
                    productos[1].stock =productos[1].stock-1;
                } else{
                    alert("Producto fuera de stock, disculpe las molestias")
                }
                break;
            case "campera":
                cantidad++;
                monto +=30000;
                if (productos[2].stock>0){
                    productos[0].stock =productos[0].stock-1;
                } else{
                    alert("Producto fuera de stock, disculpe las molestias")
                }
                break;
            default:
                alert("no ingreso un artículo valido");
                break;
        }
        articulo = prompt("Para seguir comprando ingrese otro artículo. Si ya terminó ingrese `pagar`");
    }
    if(monto != 0){
        alert(`Usted compró ${cantidad} artículo/s. El total de su factura es $ ${monto}. Gracias por su compra`);
    }else {
        alert("Gracias por visitar nuestra tienda")
    }
}



// Algoritmo principal

const productos = [];
productos.push(new Articulo ("camiseta", 15000, 2, "camiseta.png" ));
productos.push(new Articulo ("short", 10000, 2, "short.png" ));
productos.push(new Articulo ("campera", 30000, 2, "campera.png" ));
console.log(productos);
let admitir = false;
let edad = parseInt(prompt("Ingrese su edad"))
const respuesta=mayor(edad, admitir);
console.log(respuesta)
if (respuesta == true) {
    alert("Bienvenido a la tienda");
    comprar(productos);
} else {
    alert("Usted no tiene edad para acceder a esta tienda");
}