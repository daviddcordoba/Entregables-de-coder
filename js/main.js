//Declaracion de arreglo
const stock = [];

class Producto {

    constructor(id, nombre, precio) {
        this.id = id
        this.nombre = nombre
        this.precio = precio
    }

    descuento() {
        this.precio -= (this.precio * 0.10);
    }

}


stock.push(new Producto(1, "Camisa azul", 1500))
stock.push(new Producto(2, "Corset", 2780))
stock.push(new Producto(3, "Short", 1500))
console.log(stock)

//Esta es una funcion que valida la entrada de solo numeros cuando se pida el precio del producto
function validarNumero() {
    let numero;

    do {
        numero = prompt("Ingrese el precio del producto");
        numero = parseFloat(numero);
    } while (isNaN(numero));

    return numero;
}

const carrito = []





let grupoCartas = document.querySelector('.card-group')

let tabla = document.createElement("table");
    tabla.className = "table container table-striped table-danger w-100";
    
    //Fila superior de la tabla con los nombres de los datos
    let tablaHead = document.createElement("thead");
    let filaHead = document.createElement("tr");
    filaHead.innerHTML = `
            <th>Remove</th>
            <th>Product</th>
            <th>Price</th>
            <th>Cantidad</th>
            <th>Total</th>
        `;
    tablaHead.append(filaHead);
    
    tabla.append(tablaHead);
    
    let contenedorHead = document.querySelector('#carrito-container');
    
    contenedorHead.append(tabla);

for (let item of stock) {
    let carta = document.createElement('div')
    carta.innerHTML += `
    <div class="card text-center">
                <img src="images/camisaAzulPantalonBlanco-optimizado.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${item.nombre}</h5>
                    <p class="card-text">${item.precio}</p>
                </div>
                <div class="card-footer">
                    <a id="agregar${item.id}" href="#" class="agregar${item.id} btn btn-primary">Comprar</a>
                </div>
            </div>
            
    `
    grupoCartas.append(carta)


    const boton = document.querySelector(`.agregar${item.id}`)
    boton.addEventListener('click', agregarAlCarrito)


    function agregarAlCarrito() {
        

        carrito.push(new Producto(item.id, item.nombre, item.precio));

    

        //Cuerpo de la tabla con los datos
        let tablaBody = document.createElement("tbody");

        //for of para que por cada producto del carrito me arme una fila con los datos del carrito
        for (const producto of carrito) {
            let fila = document.createElement("tr");
            fila.innerHTML = `
        <td><a href="#"><i class="bi bi-trash-fill"></i></a></td>
        <td>${producto.nombre}</td>
        <td>$ ${producto.precio}</td>
        <td><input class="w-25 pl-1" value="1" type="number"></td>
        <td>total</td>
        `;
            tablaBody.append(fila);
        }

        tabla.append(tablaBody);
        let contenedorTabla = document.querySelector('#carrito-container');

        contenedorTabla.append(tabla);

    }

}

