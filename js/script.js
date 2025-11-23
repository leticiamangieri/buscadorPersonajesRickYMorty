
let boton=document.getElementById("buscarBtn");
let input=document.getElementById("personajeInput");
let divResultado=document.getElementById("divResultado");
let divInicio=document.getElementById("inicio");
let divDatos=document.getElementById("datos");
let btnVolver=document.getElementById("btnVolver");
const divInicioPrevError=divInicio.innerHTML; //Lo agrego para restaurar los elementos de busqueda luego de mostrar el error,linea 45


function Buscar(){
    let nombre=input.value.toLowerCase();//tomamos el valor escrito en el input cuando hace click 
    input.value=``;     
    fetch(`https://rickandmortyapi.com/api/character/?name=${nombre}`)
    .then (response =>{
        console.log(response);
    if (!response.ok){
        throw new Error('Personaje no encontrado,ingresa otro');
    }
    return response.json();
})
.then (data=> {
data.results.forEach(personaje => {
    divResultado.classList.remove("oculto");
    btnVolver.classList.remove("oculto");
    divInicio.classList.add("oculto");
    let div = document.createElement("div");
    div.className="resultado col-12 col-md-6 col-lg-4 mb-3";
    div.innerHTML = `<img class="favNo iconoFav" src="/img/fav-no.png" alt="agregar a favoritos data-id="${personaje.id}">
                      <h5>${personaje.name}</h5>
                      <img src=${personaje.image} id="avatar">    
                      <p>ID: ${personaje.id}</p>
                      <p>Estado:${traducirEstado(personaje.status)}</p>
                      <p>Especie:${personaje.species})</p>
                      <p>Género: ${traducirGenero(personaje.gender)}</p>
                      `
                      ;
divResultado.appendChild(div);
const iconoFav = div.querySelector(".iconoFav");
iconoFav.addEventListener("click", () => {
    agregarFav(personaje, iconoFav);
});
restaurarFavoritos(personaje,iconoFav);
})
})
.catch(error => {
alert(error.message);
});
};

boton.addEventListener("click", Buscar);
input.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    Buscar();
  }
}); 


//Botón de volver al buscador

btnVolver.addEventListener("click",function(){
  divResultado.classList.add("oculto");
  btnVolver.classList.add("oculto");
  divInicio.classList.remove("ocultoResponsive");
})


//Favoritos
function agregarFav(personaje){
favoritos = JSON.parse(localStorage.getItem("favoritos")) || []; //Recupera el array de favoritos guardado en localStorage, o un array vacío si no existe.
const estaEnFav = favoritos.some(f => f.id === personaje.id);
if (!estaEnFav){       /*Si no esta en favorito lo agrega,y viceversa*/
        iconoFav.src="/img/fav-activo.png";
        iconoFav.className=("favSi");
        favoritos.push(personaje);
        localStorage.setItem("favoritos", JSON.stringify(favoritos)); //guarda la lista actualizada
        
}else{
      iconoFav.src="/img/fav-no.png"
      iconoFav.className=("favNo");
      favoritos =favoritos.filter(p => p.id !== personaje.id);    //Filtro para eliminar el personaje con ese id
      localStorage.setItem("favoritos", JSON.stringify(favoritos)); //Guardo el array actualizado
}
};

function restaurarFavoritos(personaje, icono) {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  if (favoritos.some(f => f.id === personaje.id)) {
    icono.classList.add("favSi");
    icono.src = "/img/fav-activo.png";
  }
}


//Funciones para mostrar los datos en español

function traducirEstado(estado) {
    if (estado === "Alive") {
        return "Vivo";
    } else if (estado === "Dead") {
        return "Muerto";
    } else {
        return "Desconocido";
    }
}


function traducirGenero(genero) {
    if (genero === "female") {
        return "Femenino";
    } else if (genero === "male") {
        return "Masculino";
    } else if (genero === "Genderless") {
        return "Sin género";
    } else {
        return "Desconocido";
    
    }
}
