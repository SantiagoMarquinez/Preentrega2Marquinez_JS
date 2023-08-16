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
                    ++carrito[0].ventas;
                    cantidad++;
                    monto +=15000;
                    carrito.push(new ArticuloVendido ("camiseta", 15000,"camiseta.png",1 ));
                    productos[0].stock =productos[0].stock-1;
                    alert(carrito[0].item);                    
                }else if(productos[0].stock > 0){
                    ++carrito[0].ventas;
                    productos[0].stock =productos[0].stock-1;
                    cantidad++;
                    monto +=15000;
                    }else{
                        alert("Producto fuera de stock, disculpe las molestias")
                        }
                        ////////////////////////////////////////////////////////////
                if (productos[0].stock > 0){
                    productos[0].stock =productos[0].stock-1;
                    //alert("quedan: "+ productos[0].stock);
                    if(vendidos.includes["camiseta"] ){
                        sumar ("camiseta",carrito)
                        alert ("se vendieron "+ carrito[0].ventas +"camisetas")
                        } else{
                            carrito.push(new ArticuloVendido ("camiseta", 15000,"camiseta.png",1 ));
                            vendidos.push(`camiseta`);
                            }
                } else{
                    alert("Producto fuera de stock, disculpe las molestias")
                }
                alert(vendidos);
                //alert(carrito[0].item + " " + carrito[0].precio);
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