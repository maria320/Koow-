console.log(arreglo);

fetch('http://localhost:4321/productosPorIds?id=' + arreglo)
    .then(function (res) {
        return res.json();
    })
    .then(function (res) {
        console.log(res);

        var lista = document.querySelector('.lista');
        res.forEach(function (elem) {
            lista.innerHTML += '<li class="librito"><div class="contp"><div class="contimagenc"><img width="100" src="' + elem.libro + '" class="imagenc"></div><div class="continfo"><p class="nomble">' + elem.nombre + '</p><p class="plecio"><span>$</span> ' + elem.precio + '</p></div></div></li>';
        });
    });

//Uso del SweetAlert
document.getElementById('paga').addEventListener('click', tomarDatos);

function tomarDatos(e) {
    e.preventDefault();

    var mail = document.getElementById('cuadro').value;
    swal("Thanks for Buying!", "Check your Name: " + mail, "success");
}