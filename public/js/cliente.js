// carrito
function actualizarCarrito (){
    document.querySelector('.carri').innerHTML = arreglo.length;
}

var arreglo = JSON.parse(localStorage.getItem('arreglo'));
if(arreglo == null) arreglo = [];

actualizarCarrito();