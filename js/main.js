const grupoCartas = document.getElementById('grupoCartas')
const precioTotal = document.getElementById('precioTotal')
const tablaBody = document.getElementById('tablaBody')

let carrito 

document.addEventListener('DOMContentLoaded', (e) => {
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito')) || [] // uso de operador logico OR
        actualizarCarrito();
    }
    e.preventDefault();
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
            
            agregarAlCarrito(producto.id);

            Toastify({
                text: "Elemento agregado al carrito",
                duration: 2000,
                gravity: 'bottom',
                position: 'left',
                style: {
                    background: 'linear-gradient(to right,#f0f, #f66)'
                }
            }).showToast();

            e.preventDefault();
        })
    })

}

const agregarAlCarrito = (prodID) => {
    const item = stockProductos.find( (prod) => prod.id === prodID)

    carrito.push(item)
    /* alert("Agregado al carrito") */
    actualizarCarrito();
}


const actualizarCarrito = () => {
    //Actualizo precio total
    precioTotal.innerText = "Total: " + carrito.reduce((acc,prod) => acc + prod.precio, 0);

    tablaBody.innerHTML = "";//para que no se repitan elementos

    for(const producto of carrito){ 
        tablaBody.innerHTML+=`
        <tr>
            <td > <a id="eliminar(${producto.id})" href="#tablaBody" class="btn btn-primary"><i class="bi bi-trash3-fill"></i></a></td>
            <td >${producto.nombre}</td>
            <td >$ ${producto.precio}</td>
        </tr>
        `;

        localStorage.setItem('carrito', JSON.stringify(carrito))

        const botonEliminar = document.getElementById(`eliminar(${producto.id})`)
        botonEliminar.addEventListener('click', (e)=>{
            eliminarDelCarrito(producto.id)
            e.preventDefault();
        })
        
    }
    
}



const eliminarDelCarrito = (prodID) => {
    const item = carrito.find((prod)=> prod.id === prodID) 
    const indice = carrito.indexOf(item)

    carrito.splice(indice,1)
    actualizarCarrito();
}
