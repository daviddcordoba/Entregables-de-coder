class Producto {

    constructor(nombre,precio,estado) {
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
        this.estado = estado.toUpperCase();
    }

    descuento() {
            this.precio -= (this.precio * 0.10);   
    }

}

//Esta es una funcion que valida la entrada de solo numeros cuando se pida el precio del producto
function validarNumero (){
    let numero;

    do{        
        numero = prompt("Ingrese el precio del producto");        
        numero = parseFloat(numero);
    }while( isNaN(numero));

    return numero;
}



//Declaracion de arreglo
const carrito = [];

alert("Bienvenido")
// Declaracion de variable para poner un tope en el "do while"
let cantidad = parseInt(prompt("Ingresa la cantidad de productos"));


// "Do while" para la solicitud de datos para llenar el arreglo, haciendo uso del constructor del objeto Producto.
do{ 
carrito.push( new Producto(prompt("Ingresa el nombre del producto"),
                            validarNumero(), 
                            prompt("Ingresa el estado del producto(Nuevo/Usado)") ) 
            );
}while(carrito.length != cantidad)

//Metodo .forEach y .some para recorrer todo el arreglo y ver si el estado del producto es usado o no.

console.log("PRODUCTOS");
carrito.forEach((productoCarrito) => {
    if(  carrito.some( (productoCarrito) => productoCarrito.estado == ( ("USADO") ) ) )
    {
        productoCarrito.descuento();
    }

    console.log("Producto: " + productoCarrito.nombre +"\nPrecio: $" + productoCarrito.precio);
})

//tabla

//tabla
let tabla=document.createElement("table");
tabla.className="table table-striped table-danger";

//Fila superior de la tabla con los nombres de los datos
let tablaHead = document.createElement("thead");
let filaHead = document.createElement("tr");
    filaHead.innerHTML=`
        <th>Estado </th>
        <th>Producto</th>
        <th>Precio</th>
    `;
    tablaHead.append(filaHead);

    tabla.append(tablaHead);

    let contenedorHead =document.getElementById("inferior");

    contenedorHead.append(tabla);


//Cuerpo de la tabla con los datos
let tablaBody=document.createElement("tbody");

//for of para que por cada producto del carrito me arme una fila con los datos del carrito
for(const producto of carrito){
    let fila=document.createElement("tr");
    fila.innerHTML=`
        <td>${producto.estado}</td>
        <td>${producto.nombre}</td>
        <td>$ ${producto.precio}</td>`;
    tablaBody.append(fila);
}

tabla.append(tablaBody);
let contenedorTabla=document.getElementById("inferior");

contenedorTabla.append(tabla);





