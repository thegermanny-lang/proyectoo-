const formRegistro = document.getElementById("form-registro");

formRegistro.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const datosEstudiante = {
    nombre: document.getElementById("nombre").value.trim(),
    correo: document.getElementById("correo").value.trim(),
    numero: document.getElementById("numero").value.trim(),
    ensena: document.getElementById("ensena").value.trim(),
    busca: document.getElementById("busca").value.trim()
  };

  localStorage.setItem("estudianteSkillSwap", JSON.stringify(datosEstudiante));
  window.location.href = "./perfil.html";
});
