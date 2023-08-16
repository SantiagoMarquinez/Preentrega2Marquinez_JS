//OBJETOS

class Articulo{
    constructor(item, precio, stock, foto){
    this.item = item;
    this.precio = precio;
    this.stock = stock;
    this.foto = foto;    
    }
}

class ArticuloVendido{
    constructor(item, precio, foto, ventas){
        this.item = item;
        this.precio = precio;
        this.foto = foto;
        this.ventas = ventas;    //cantidad de veces que se agrego ese producto en el carrito
    }
}
//FUNCIONES

const mayor = (edad, admitir) => {
    if (edad >= 18) {
        return true;
    } else {
        return false;
    }
}
// "sumar" busca el item en el array y le suma 1 a la cantidad vendida de ese producto.
function sumar (prod,carrito){  
    i=0;
    while (carrito[i].item != prod){
        ++i;
    }
    ++carrito[i].ventas;
    return carrito;
}

const comprar = (productos,carrito) => {
    carrito = [];
    let vendidos = [];
    let cantidad = 0;
    let monto = 0;
    alert("usted puede compar camiseta, short o campera");
    let articulo = prompt("¿Que desea comprar?");
    while (articulo != "pagar") {
        switch (articulo) {
            case "camiseta":
                if(!vendidos.includes("camiseta") && productos[0].stock>0) {
                    carrito.push(new ArticuloVendido ("camiseta", 15000,"camiseta.png",1 ));
                    vendidos.push(`camiseta`);
                    cantidad++;
                    monto +=15000;
                    productos[0].stock =productos[0].stock-1;                
                }else if(productos[0].stock > 0){
                    productos[0].stock =productos[0].stock-1;
                    cantidad++;
                    monto +=15000;
                    sumar ("camiseta",carrito)
                    alert ("se vendieron "+ carrito[0].ventas +"camisetas")
                    }else{
                        alert("Producto fuera de stock, disculpe las molestias")
                        }
                alert(vendidos);
                alert(carrito[0].item + " " + carrito[0].precio);
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
                    productos[2].stock =productos[2].stock-1;
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
let carrito;
const respuesta=mayor(edad, admitir);
console.log(respuesta)
if (respuesta == true) {
    alert("Bienvenido a la tienda");
    comprar(productos,carrito);
} else {
    alert("Usted no tiene edad para acceder a esta tienda");
}