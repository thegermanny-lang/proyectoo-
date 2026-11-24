const formRegistro = document.getElementById("form-registro");

formRegistro.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const numero = document.getElementById("numero").value.trim();
  const ensena = document.getElementById("ensena").value.trim();
  const busca = document.getElementById("busca").value.trim();
  const dias = document.getElementById("dias").value.trim();
  const turno = document.getElementById("turno").value.trim();
  const inputFoto = document.getElementById("foto");

  if (!ensena && !busca) {
    alert("Por favor rellena al menos una de las casillas: Enseña o Busca.");
    return;
  }

  const guardarEstudiante = (fotoBase64) => {
    const nuevoEstudiante = {
      id: Date.now(),
      nombre,
      correo,
      numero,
      ensena,
      busca,
      dias,
      turno,
      foto: fotoBase64
    };

    const estudiantes = JSON.parse(localStorage.getItem("skillswap_estudiantes")) || [];
    estudiantes.push(nuevoEstudiante);

    localStorage.setItem("skillswap_estudiantes", JSON.stringify(estudiantes));
    localStorage.setItem("skillswap_usuario_actual", JSON.stringify(nuevoEstudiante));
    localStorage.removeItem("skillswap_modo_invitado");

    window.location.href = "inicio.html";
  };

  if (inputFoto.files && inputFoto.files[0]) {
    const reader = new FileReader();
    reader.onload = function (evento) {
      guardarEstudiante(evento.target.result);
    };
    reader.readAsDataURL(inputFoto.files[0]);
  } else {
    guardarEstudiante(null);
  }
});