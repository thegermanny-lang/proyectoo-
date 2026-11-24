// Línea 1: Referencias a elementos del DOM
if (localStorage.getItem("skillswap_modo_invitado") === "true") {
  window.location.href = "registro.html";
}
const sinPerfil = document.getElementById("sin-perfil");
const contenidoPerfil = document.getElementById("contenido-perfil");
const btnEditarPerfil = document.getElementById("btn-editar-perfil");

const perfilFoto = document.getElementById("perfil-foto");
const perfilAvatarDefecto = document.getElementById("perfil-avatar-defecto");
const perfilNombre = document.getElementById("perfil-nombre");
const perfilCorreo = document.getElementById("perfil-correo");
const perfilTelefono = document.getElementById("perfil-telefono");

const listaEnsena = document.getElementById("lista-ensena");
const listaBusca = document.getElementById("lista-busca");
const cajaDisponibilidadCuerpo = document.getElementById("caja-disponibilidad-cuerpo");

// Línea 18: Obtener el último registro guardado
const estudiantes = JSON.parse(localStorage.getItem("skillswap_estudiantes")) || [];
let usuarioActual = JSON.parse(localStorage.getItem("skillswap_usuario_actual"));

if (!usuarioActual && estudiantes.length > 0) {
  usuarioActual = estudiantes[estudiantes.length - 1];
}

// Línea 26: Separar textos con comas o "y" para mostrarlos limpios como en la imagen
function separarItems(texto) {
  if (!texto) return [];
  return texto
    .split(/,| y /i)
    .map(item => item.trim())
    .filter(Boolean);
}

// Línea 35: Pintar los datos del perfil
if (!usuarioActual) {
  sinPerfil.style.display = "block";
  contenidoPerfil.style.display = "none";
} else {
  sinPerfil.style.display = "none";
  contenidoPerfil.style.display = "block";

  perfilNombre.textContent = usuarioActual.nombre || "Sin nombre";
  perfilCorreo.textContent = usuarioActual.correo || "";
  perfilTelefono.textContent = usuarioActual.numero ? `Tel: ${usuarioActual.numero}` : "";

  if (usuarioActual.foto) {
    perfilFoto.src = usuarioActual.foto;
    perfilFoto.style.display = "block";
    perfilAvatarDefecto.style.display = "none";
  } else {
    perfilFoto.style.display = "none";
    perfilAvatarDefecto.style.display = "flex";
  }

  const habilidadesEnsena = separarItems(usuarioActual.ensena);
  listaEnsena.innerHTML = habilidadesEnsena.length
    ? habilidadesEnsena.map(h => `<span class="item-habilidad">${h}</span>`).join("")
    : `<span class="item-habilidad">No especificado</span>`;

  const habilidadesBusca = separarItems(usuarioActual.busca);
  listaBusca.innerHTML = habilidadesBusca.length
    ? habilidadesBusca.map(h => `<span class="item-habilidad">${h}</span>`).join("")
    : `<span class="item-habilidad">No especificado</span>`;

  const lineasDisp = [];
  if (usuarioActual.dias) lineasDisp.push(`<p class="linea-disponibilidad"><strong>Días:</strong> ${usuarioActual.dias}</p>`);
  if (usuarioActual.turno) lineasDisp.push(`<p class="linea-disponibilidad"><strong>Horario:</strong> ${usuarioActual.turno}</p>`);

  cajaDisponibilidadCuerpo.innerHTML = lineasDisp.length
    ? lineasDisp.join("")
    : `<p class="linea-disponibilidad">No especificado</p>`;
}

// Línea 76: Botón Editar perfil sin funcionalidad por ahora
if (btnEditarPerfil) {
  btnEditarPerfil.addEventListener("click", () => {
    window.location.href = "editar-perfil.html";
  });
}