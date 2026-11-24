const btnMenu = document.getElementById("btn-menu");
const menuLateral = document.getElementById("menu-lateral");

if (btnMenu && menuLateral) {
  btnMenu.addEventListener("click", function () {
    menuLateral.classList.toggle("abierto");
  });
}

const esInvitado = localStorage.getItem("skillswap_modo_invitado") === "true";
const btnMiPerfil = document.getElementById("btn-opcion-2");
const btnSolicitud = document.getElementById("btn-opcion-1");
const btnIconoPerfil = document.getElementById("btn-icono-perfil");
const btnReporte = document.getElementById("btn-opcion-reporte");

if (esInvitado) {
  if (btnMiPerfil) btnMiPerfil.style.display = "none";
  if (btnSolicitud) btnSolicitud.style.display = "none";
  if (btnIconoPerfil) btnIconoPerfil.style.display = "none";
  if (btnReporte) btnReporte.style.display = "none";

  if (menuLateral && !document.getElementById("btn-registrarse-menu")) {
    const btnRegistrarse = document.createElement("button");
    btnRegistrarse.type = "button";
    btnRegistrarse.id = "btn-registrarse-menu";
    btnRegistrarse.className = "btn-menu-lateral";
    btnRegistrarse.textContent = "Registrarse";
    btnRegistrarse.addEventListener("click", function () {
      window.location.href = "registro.html";
    });
    menuLateral.appendChild(btnRegistrarse);
  }
}

const contenedorEstudiantes = document.getElementById("lista-estudiantes");
const formBuscar = document.getElementById("form-buscar");
const inputBuscar = document.getElementById("input-buscar");

function limpiarTexto(texto) {
  return String(texto || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function crearAvatarDefecto() {
  const div = document.createElement("div");
  div.className = "avatar-defecto";

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"
  );

  svg.appendChild(path);
  div.appendChild(svg);
  return div;
}

function mostrarEstudiantes(filtro) {
  if (!contenedorEstudiantes) return;

  const estudiantes = JSON.parse(localStorage.getItem("skillswap_estudiantes")) || [];
  contenedorEstudiantes.innerHTML = "";

  const textoOriginal = String(filtro || "").trim();
  const textoBuscado = limpiarTexto(textoOriginal);

  const filtrados = estudiantes.filter(function (est) {
    if (!textoBuscado) return true;

    const ensena = limpiarTexto(est.ensena);
    const nombre = limpiarTexto(est.nombre);

    return ensena.includes(textoBuscado) || nombre.includes(textoBuscado);
  });

  if (filtrados.length === 0) {
    const vacio = document.createElement("p");
    vacio.className = "sin-resultados";

    if (textoBuscado) {
      vacio.textContent =
        'No hay un perfil que enseñe "' +
        textoOriginal +
        '" ni coincida con ese nombre.';
    } else {
      vacio.textContent = "Aun no hay estudiantes registrados.";
    }

    contenedorEstudiantes.appendChild(vacio);
    return;
  }

  filtrados.forEach(function (est) {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-estudiante";

    const izquierda = document.createElement("div");
    izquierda.className = "tarjeta-izquierda";

    if (est.foto) {
      const img = document.createElement("img");
      img.src = est.foto;
      img.alt = est.nombre || "Estudiante";
      img.className = "foto-tarjeta";
      izquierda.appendChild(img);
    } else {
      izquierda.appendChild(crearAvatarDefecto());
    }

    const spanNombre = document.createElement("span");
    spanNombre.className = "nombre-estudiante";
    spanNombre.textContent = est.nombre || "";
    izquierda.appendChild(spanNombre);

    const derecha = document.createElement("div");
    derecha.className = "tarjeta-derecha";

    const habilidades = document.createElement("div");
    habilidades.className = "habilidades-estudiante";

    const pEnsena = document.createElement("p");
    const strongEnsena = document.createElement("strong");
    strongEnsena.textContent = "Enseñar: ";
    pEnsena.appendChild(strongEnsena);
    pEnsena.appendChild(document.createTextNode(est.ensena || ""));

    const pBusca = document.createElement("p");
    const strongBusca = document.createElement("strong");
    strongBusca.textContent = "Busca: ";
    pBusca.appendChild(strongBusca);
    pBusca.appendChild(document.createTextNode(est.busca || ""));

    habilidades.appendChild(pEnsena);
    habilidades.appendChild(pBusca);

    const btnVer = document.createElement("button");
    btnVer.type = "button";
    btnVer.className = "btn-ver-perfil";
    btnVer.textContent = "Ver perfil";
    btnVer.addEventListener("click", function () {
      verPerfil(est.id);
    });

    derecha.appendChild(habilidades);
    derecha.appendChild(btnVer);

    tarjeta.appendChild(izquierda);
    tarjeta.appendChild(derecha);
    contenedorEstudiantes.appendChild(tarjeta);
  });
}

function verPerfil(id) {
  const estudiantes = JSON.parse(localStorage.getItem("skillswap_estudiantes")) || [];
  const estudiante = estudiantes.find(function (e) {
    return e.id === id;
  });
  if (estudiante) {
    localStorage.setItem("perfil_seleccionado", JSON.stringify(estudiante));
    window.location.href = "ver-perfil.html";
  }
}

if (formBuscar && inputBuscar) {
  formBuscar.addEventListener("submit", function (e) {
    e.preventDefault();
    mostrarEstudiantes(inputBuscar.value);
  });
}

if (btnMiPerfil && !esInvitado) {
  btnMiPerfil.addEventListener("click", function () {
    window.location.href = "perfil.html";
  });
}

if (btnIconoPerfil && !esInvitado) {
  btnIconoPerfil.addEventListener("click", function () {
    window.location.href = "perfil.html";
  });
}

if (btnReporte && !esInvitado) {
  btnReporte.addEventListener("click", function () {
    window.location.href = "reporte.html";
  });
}

const modalSolicitud = document.getElementById("modal-solicitud");
const infoBaseSolicitud = document.getElementById("info-base-solicitud");
const formSolicitud = document.getElementById("form-solicitud");
const inputSolicitudEnsena = document.getElementById("solicitud-ensena");
const inputSolicitudBusca = document.getElementById("solicitud-busca");
const btnCancelarSolicitud = document.getElementById("btn-cancelar-solicitud");

if (btnSolicitud && modalSolicitud && !esInvitado) {
  btnSolicitud.addEventListener("click", function () {
    const usuarioBase = JSON.parse(localStorage.getItem("skillswap_usuario_actual"));

    if (!usuarioBase) {
      alert("Primero debes registrar un estudiante para tomar sus datos base.");
      return;
    }

    if (infoBaseSolicitud) {
      infoBaseSolicitud.textContent =
        "Usando datos de: " +
        (usuarioBase.nombre || "") +
        " (" +
        (usuarioBase.dias || "") +
        " - " +
        (usuarioBase.turno || "") +
        ")";
    }

    if (inputSolicitudEnsena) inputSolicitudEnsena.value = "";
    if (inputSolicitudBusca) inputSolicitudBusca.value = "";
    modalSolicitud.hidden = false;
    if (menuLateral) menuLateral.classList.remove("abierto");
  });
}

if (btnCancelarSolicitud && modalSolicitud) {
  btnCancelarSolicitud.addEventListener("click", function () {
    modalSolicitud.hidden = true;
  });
}

if (formSolicitud) {
  formSolicitud.addEventListener("submit", function (e) {
    e.preventDefault();
    if (esInvitado) return;

    const usuarioBase = JSON.parse(localStorage.getItem("skillswap_usuario_actual"));
    if (!usuarioBase) return;

    const nuevoEnsena = inputSolicitudEnsena ? inputSolicitudEnsena.value.trim() : "";
    const nuevoBusca = inputSolicitudBusca ? inputSolicitudBusca.value.trim() : "";

    if (!nuevoEnsena && !nuevoBusca) {
      alert("Por favor rellena al menos una de las casillas: Ensena o Busca.");
      return;
    }

    const nuevoPerfil = {
      ...usuarioBase,
      id: Date.now(),
      ensena: nuevoEnsena,
      busca: nuevoBusca
    };

    const estudiantes = JSON.parse(localStorage.getItem("skillswap_estudiantes")) || [];
    estudiantes.push(nuevoPerfil);

    localStorage.setItem("skillswap_estudiantes", JSON.stringify(estudiantes));
    localStorage.setItem("skillswap_usuario_actual", JSON.stringify(nuevoPerfil));

    if (modalSolicitud) modalSolicitud.hidden = true;
    mostrarEstudiantes(inputBuscar ? inputBuscar.value.trim() : "");
  });
}

mostrarEstudiantes();