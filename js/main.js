const grupoCartas = document.getElementById('grupoCartas')
const precioTotal = document.getElementById('precioTotal')
const tablaBody = document.getElementById('tablaBody')

let carrito = []

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito')) || [] // uso de operador logico OR
        actualizarCarrito();
    }
    
})

mostrarProductos();

function mostrarProductos() {
    for(const producto of stockProductos){
        grupoCartas.innerHTML += `<div class="card text-center">
        <img src="${producto.foto}" class="card-img-top" alt="..." >
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">$${producto.precio}</p>
        </div>
        <div class="card-footer">
            <a id="agregar${producto.id}" href="#" class="btn btn-primary">Comprar</a>
        </div>
    </div>`;
    }

    //Evento para el boton(que va a pasar cuando de click en 'comprar')
    stockProductos.forEach(producto => {
        document.getElementById(`agregar${producto.id}`).addEventListener('click', function(e){
            e.preventDefault();
            agregarAlCarrito(producto.id);

            
        })
    })

}

const agregarAlCarrito = (prodID) => {
    
    const item = stockProductos.find( (prod) => prod.id === prodID)


    carrito.push(item)
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    actualizarCarrito();
    


}
const eliminarDelCarrito = (prodID) => {
    /* const item = carrito.find((prod)=> prod.id === prodID) 
    const indice = carrito.indexOf(item) */
    
    const indice = carrito.findIndex( (producto) => producto.id === prodID);
    if ( indice < 0) return;

    carrito.splice(indice,1)
    actualizarCarrito();
}



const actualizarCarrito = () => {
    //Actualizo precio total
    precioTotal.innerText = "Total: " + carrito.reduce((acc,prod) => acc + prod.precio, 0);

    tablaBody.innerHTML = "";//para que no se repitan elementos

    carrito.forEach( (producto ) => { 
        tablaBody.innerHTML+=`
        <tr>
            <td > <button onclick="eliminarDelCarrito(${producto.id})"  class="btn btn-primary"><i class="bi bi-trash3-fill"></i></button></td>
            <td >${producto.nombre} <span id="cantidad">x${producto.cantidad} </span> </td>
            <td >$ ${producto.precio}</td>
        </tr>
        `;

        localStorage.setItem('carrito', JSON.stringify(carrito))
    })
    
}



