const guardado = localStorage.getItem("estudianteSkillSwap");

if (guardado) {
  const datos = JSON.parse(guardado);

  document.getElementById("ver-nombre").textContent = datos.nombre || "-";
  document.getElementById("ver-correo").textContent = datos.correo || "-";
  document.getElementById("ver-numero").textContent = datos.numero || "-";
  document.getElementById("ver-ensena").textContent = datos.ensena || "-";
  document.getElementById("ver-busca").textContent = datos.busca || "-";
}