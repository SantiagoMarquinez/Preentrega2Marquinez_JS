

//FUNCIONES
const Mayor = (edad, admitir) => {
    if (edad >= 18) {
        admitir = true;
        return admitir;
    } else {
        return admitir;
    }
}

const Comprar = () => {
    let cantidad = 0;
    let monto = 0;
    alert("usted puede compar camiseta, short o campera")
    let articulo = prompt("¿Que desea comprar?")
    while (articulo != "pagar") {
        switch (articulo) {
            case "camiseta":
                cantidad++;
                monto +=15000;
                break;
            case "short":
                cantidad++;
                monto +=10000;
                break;
            case "campera":
                cantidad++;
                monto +=30000;
            default:
                alert("no ingreso un artículo valido");
                break;
        }
        articulo = prompt("Para seguir comprando ingrese otro artículo. Si ya terminó ingrese `pagar`");
        if(articulo === pagar){
            alert(`Usted compró ${cantidad} artículos. El total de su factura es $ ${monto}. Gracias por su compra`);
        }
    }
}



// Algoritmo principal
let admitir = false;
let edad = parseInt(prompt("Ingrese su edad"))
const respuesta=Mayor(edad, admitir);
console.log(respuesta)
if (respuesta == true) {
    alert("Bienvenido a la tienda");
    Comprar();
} else {
    alert("Usted no tiene edad para acceder a esta tienda");
}