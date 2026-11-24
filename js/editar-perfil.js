const sinUsuario = document.getElementById("sin-usuario");
const formEditar = document.getElementById("form-editar");

const editFotoPreview = document.getElementById("edit-foto-preview");
const editAvatarDefecto = document.getElementById("edit-avatar-defecto");
const inputFoto = document.getElementById("input-foto");

const editNombre = document.getElementById("edit-nombre");
const editCorreo = document.getElementById("edit-correo");
const editNumero = document.getElementById("edit-numero");

const chipsEnsena = document.getElementById("chips-ensena");
const chipsBusca = document.getElementById("chips-busca");
const listaHorarios = document.getElementById("lista-horarios");

const btnAgregarEnsena = document.getElementById("btn-agregar-ensena");
const btnAgregarBusca = document.getElementById("btn-agregar-busca");
const btnAgregarHorario = document.getElementById("btn-agregar-horario");
const btnCancelar = document.getElementById("btn-cancelar");

const editEnsena = document.getElementById("edit-ensena");
const editBusca = document.getElementById("edit-busca");
const editDias = document.getElementById("edit-dias");
const editTurno = document.getElementById("edit-turno");

let estudiantes = JSON.parse(localStorage.getItem("skillswap_estudiantes")) || [];
let ultimoUsuario = JSON.parse(localStorage.getItem("skillswap_usuario_actual"));

if (!ultimoUsuario && estudiantes.length > 0) {
  ultimoUsuario = estudiantes[estudiantes.length - 1];
}

let fotoActualBase64 = ultimoUsuario ? (ultimoUsuario.foto || "") : "";

function separarTexto(texto) {
  if (!texto) return [];
  return texto
    .split(/,| y /i)
    .map(function (t) {
      return t.trim();
    })
    .filter(function (t) {
      return Boolean(t);
    });
}

function pintarListaChips(contenedor, items) {
  if (!contenedor) return;
  contenedor.innerHTML = "";
  items.forEach(function (item) {
    const span = document.createElement("span");
    span.className = "chip-item";
    span.textContent = item;
    contenedor.appendChild(span);
  });
}

function renderizarChips() {
  const ensenaItems = separarTexto(editEnsena ? editEnsena.value : "");
  pintarListaChips(chipsEnsena, ensenaItems);

  const buscaItems = separarTexto(editBusca ? editBusca.value : "");
  pintarListaChips(chipsBusca, buscaItems);

  if (listaHorarios) {
    listaHorarios.innerHTML = "";
    const diasTexto = editDias ? editDias.value.trim() : "";
    const turnoTexto = editTurno ? editTurno.value.trim() : "";

    if (diasTexto) {
      const divDias = document.createElement("div");
      divDias.textContent = diasTexto;
      listaHorarios.appendChild(divDias);
    }

    if (turnoTexto) {
      const divTurno = document.createElement("div");
      divTurno.textContent = turnoTexto;
      listaHorarios.appendChild(divTurno);
    }
  }
}

if (!ultimoUsuario) {
  if (sinUsuario) sinUsuario.style.display = "block";
  if (formEditar) formEditar.style.display = "none";
} else {
  if (sinUsuario) sinUsuario.style.display = "none";
  if (formEditar) formEditar.style.display = "block";

  if (editNombre) editNombre.value = ultimoUsuario.nombre || "";
  if (editCorreo) editCorreo.value = ultimoUsuario.correo || "";
  if (editNumero) editNumero.value = ultimoUsuario.numero || "";
  if (editEnsena) editEnsena.value = ultimoUsuario.ensena || "";
  if (editBusca) editBusca.value = ultimoUsuario.busca || "";
  if (editDias) editDias.value = ultimoUsuario.dias || "";
  if (editTurno) editTurno.value = ultimoUsuario.turno || "";

  if (fotoActualBase64 && editFotoPreview && editAvatarDefecto) {
    editFotoPreview.src = fotoActualBase64;
    editFotoPreview.style.display = "block";
    editAvatarDefecto.style.display = "none";
  }

  renderizarChips();
}

if (inputFoto) {
  inputFoto.addEventListener("change", function () {
    const archivo = inputFoto.files && inputFoto.files[0];
    if (!archivo) return;
    const lector = new FileReader();
    lector.onload = function (ev) {
      fotoActualBase64 = ev.target.result;
      if (editFotoPreview) {
        editFotoPreview.src = fotoActualBase64;
        editFotoPreview.style.display = "block";
      }
      if (editAvatarDefecto) {
        editAvatarDefecto.style.display = "none";
      }
    };
    lector.readAsDataURL(archivo);
  });
}

if (btnAgregarEnsena && editEnsena) {
  btnAgregarEnsena.addEventListener("click", function () {
    const nueva = prompt("Escribe una habilidad que puedas enseñar:");
    if (nueva && nueva.trim()) {
      const actual = editEnsena.value.trim();
      editEnsena.value = actual ? actual + ", " + nueva.trim() : nueva.trim();
      renderizarChips();
    }
  });
}

if (btnAgregarBusca && editBusca) {
  btnAgregarBusca.addEventListener("click", function () {
    const nueva = prompt("Escribe una habilidad que quieras aprender:");
    if (nueva && nueva.trim()) {
      const actual = editBusca.value.trim();
      editBusca.value = actual ? actual + ", " + nueva.trim() : nueva.trim();
      renderizarChips();
    }
  });
}

if (btnAgregarHorario && editTurno) {
  btnAgregarHorario.addEventListener("click", function () {
    const nuevoHorario = prompt("Escribe tu día y horario disponible (Ej: Sábado: 09:00 AM - 12:00 PM):");
    if (nuevoHorario && nuevoHorario.trim()) {
      const actual = editTurno.value.trim();
      editTurno.value = actual ? actual + " | " + nuevoHorario.trim() : nuevoHorario.trim();
      renderizarChips();
    }
  });
}

[editEnsena, editBusca, editDias, editTurno].forEach(function (inp) {
  if (inp) {
    inp.addEventListener("input", renderizarChips);
  }
});

if (btnCancelar) {
  btnCancelar.addEventListener("click", function () {
    window.location.href = "perfil.html";
  });
}

if (formEditar) {
  formEditar.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!ultimoUsuario) return;

    const registroActualizado = {
      id: ultimoUsuario.id,
      nombre: editNombre ? editNombre.value.trim() : "",
      correo: editCorreo ? editCorreo.value.trim() : "",
      numero: editNumero ? editNumero.value.trim() : "",
      ensena: editEnsena ? editEnsena.value.trim() : "",
      busca: editBusca ? editBusca.value.trim() : "",
      dias: editDias ? editDias.value.trim() : "",
      turno: editTurno ? editTurno.value.trim() : "",
      foto: fotoActualBase64
    };

    estudiantes = estudiantes.map(function (est) {
      return est.id === registroActualizado.id ? registroActualizado : est;
    });

    localStorage.setItem("skillswap_estudiantes", JSON.stringify(estudiantes));
    localStorage.setItem("skillswap_usuario_actual", JSON.stringify(registroActualizado));

    window.location.href = "perfil.html";
  });
}