document.addEventListener("DOMContentLoaded", () => {
  const btnIniciarSesion = document.getElementById("btn-iniciar-sesion");
  const btnInvitado = document.getElementById("btn-invitado");

  if (btnIniciarSesion) {
    btnIniciarSesion.addEventListener("click", () => {
      window.location.href = "./registro.html";
    });
  }

  if (btnInvitado) {
    btnInvitado.addEventListener("click", () => {
      localStorage.setItem("skillswap_modo_invitado", "true");
      localStorage.removeItem("skillswap_usuario_actual");
      window.location.href = "./inicio.html";
    });
  }
});