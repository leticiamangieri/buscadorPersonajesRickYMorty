
let contenedorFav=document.getElementById("contenedor-fav");

document.addEventListener("DOMContentLoaded", () => {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  if (favoritos.length === 0) {
    contenedorFav.innerHTML = `<p>Aún no hay favoritos</p>`;
  } else {
    favoritos.forEach(nombre => {
        data.results.forEach(personaje => {
      let div = document.createElement("div");
    div.className="resultado col-12 col-md-6 col-lg-4 mb-3 tarjetaPersonaje";
    div.innerHTML = `<button class="quitarFav" data-name="${personaje.name}"><i class="bi bi-x"></i></button>
                      <h5>${personaje.name}</h5>
                      <img src=${personaje.image} >    
                      <p>ID: ${personaje.id}</p>
                      <p>Estado:${traducirEstado(personaje.status)})</p>
                      <p>Especie:${traducirEspecie(personaje.species)})</p>
                      <p>Género: ${traducirGenero(personaje.gender)}</p>
                      `
                      ;
contenedorFav.appendChild(div);
restaurarFavoritos();
        });
    });
  }
});

let btnQuitarFav=document.getElementsByClassName("quitarFav");
contenedorFav.addEventListener("click", function (e) {
  const boton = e.target.closest(".quitarFav");
  if (boton) {
    const nombre = boton.getAttribute("data-name");

    // Elimina los datos del localStorage
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    favoritos = favoritos.filter(item => item.name !== nombre); // busca el pokemon en los favoritos
    localStorage.setItem("favoritos", JSON.stringify(favoritos)); //actualizo la lista de favoritos

    // Elimina la tarjeta que contiene el pokemon que quiero quitar de favoritos
    const tarjeta = e.target.closest("div");
    if (tarjeta) tarjeta.remove();

    if (favoritos.length===0){
    contenedorFav.innerHTML=`<p>Aún no hay favoritos</p>`
  }
  }})
;
