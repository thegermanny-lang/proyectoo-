if (localStorage.getItem("skillswap_modo_invitado") === "true") {
  window.location.href = "registro.html";
}

if (typeof emailjs !== "undefined") {
  emailjs.init("iVxikJAOqJkTVtJdp");
}

const formReporte = document.getElementById("form-reporte-pagina");
const inputMotivo = document.getElementById("motivo-reporte");
const btnCancelar = document.getElementById("btn-cancelar-reporte");
const btnEnviar = document.getElementById("btn-enviar-reporte");

if (btnCancelar) {
  btnCancelar.addEventListener("click", (e) => {
	  e.preventDefault();
    window.location.href = "inicio.html";
  });
}

if (formReporte) {
  formReporte.addEventListener("submit", async (e) => {
    e.preventDefault();

    const motivo = inputMotivo ? inputMotivo.value.trim() : "";
    if (!motivo) {
      alert("Por favor describe el motivo del reporte.");
      return;
    }

    const usuario = JSON.parse(localStorage.getItem("skillswap_usuario_actual")) || {};

    if (btnEnviar) {
      btnEnviar.disabled = true;
      btnEnviar.textContent = "Enviando...";
    }

    try {
      await emailjs.send("service_mlfdyab", "template_u9lmx4f", {
        name: usuario.nombre || "Usuario no identificado",
        time: new Date().toLocaleString(),
        message: motivo,
        email: usuario.correo || "Sin correo"
      });

      alert("¡Reporte enviado correctamente!");
      window.location.href = "inicio.html";
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      alert("Ocurrió un problema al enviar el reporte. Inténtalo de nuevo.");
    } finally {
      if (btnEnviar) {
        btnEnviar.disabled = false;
        btnEnviar.textContent = "Enviar reporte";
      }
    }
  });
}