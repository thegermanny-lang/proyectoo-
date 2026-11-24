const perfil = JSON.parse(localStorage.getItem("perfil_seleccionado"));

const tituloPerfil = document.getElementById("titulo-perfil");
const zonaFoto = document.getElementById("zona-foto");
const datoNombre = document.getElementById("dato-nombre");
const datoCorreo = document.getElementById("dato-correo");
const datoNumero = document.getElementById("dato-numero");
const datoEnsena = document.getElementById("dato-ensena");
const datoBusca = document.getElementById("dato-busca");
const datoDias = document.getElementById("dato-dias");
const datoTurno = document.getElementById("dato-turno");

if (!perfil) {
  if (tituloPerfil) tituloPerfil.textContent = "Perfil no encontrado";
} else {
  if (tituloPerfil) {
    tituloPerfil.textContent = "Perfil de " + (perfil.nombre || "Estudiante");
  }

  if (zonaFoto) {
    zonaFoto.innerHTML = "";
    if (perfil.foto) {
      const img = document.createElement("img");
      img.src = perfil.foto;
      img.alt = perfil.nombre || "Foto de perfil";
      img.className = "foto-perfil-grande";
      zonaFoto.appendChild(img);
    } else {
      const divAvatar = document.createElement("div");
      divAvatar.className = "avatar-grande";

      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("aria-hidden", "true");

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute(
        "d",
        "M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"
      );

      svg.appendChild(path);
      divAvatar.appendChild(svg);
      zonaFoto.appendChild(divAvatar);
    }
  }

  if (datoNombre) datoNombre.textContent = perfil.nombre || "-";
  if (datoCorreo) datoCorreo.textContent = perfil.correo || "-";
  if (datoNumero) datoNumero.textContent = perfil.numero || "-";
  if (datoEnsena) datoEnsena.textContent = perfil.ensena || "-";
  if (datoBusca) datoBusca.textContent = perfil.busca || "-";
  if (datoDias) datoDias.textContent = perfil.dias || "-";
  if (datoTurno) datoTurno.textContent = perfil.turno || "-";
}