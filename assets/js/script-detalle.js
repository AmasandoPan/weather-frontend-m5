// Función para buscar lugar por ID 
const obtenerLugar = (id) => localidades.find((l) => l.id == id);

// Función para calcular estadísticas (Requisito Módulo 4)
function calcularEstadisticas(pronostico) {
  let sumaMax = 0;
  let minSemana = pronostico[0].min;
  let maxSemana = pronostico[0].max;
  let conteoClimas = {};

  for (let dia of pronostico) {
    // Cálculo de Mínima y Máxima absoluta
    if (dia.min < minSemana) minSemana = dia.min;
    if (dia.max > maxSemana) maxSemana = dia.max;

    // Acumular para el promedio
    sumaMax += dia.max;

    // Conteo de tipos de clima (para el resumen)
    conteoClimas[dia.estado] = (conteoClimas[dia.estado] || 0) + 1;
  }

  const promedioMax = (sumaMax / pronostico.length).toFixed(1);

  // Lógica condicional para el resumen textual
  let resumen = "";
  if (conteoClimas["Soleado"] > 3) {
    resumen =
      "Semana mayormente soleada e ideal para actividades al aire libre.";
  } else if (conteoClimas["Lluvia"] >= 2) {
    resumen = "Se espera una semana inestable con varios días de lluvia.";
  } else {
    resumen =
      "Semana con clima variado, se recomienda revisar el reporte diario.";
  }

  return { minSemana, maxSemana, promedioMax, resumen };
}

//  Renderizado de la página
const idSel = localStorage.getItem("ciudadSeleccionada");
const ciudad = obtenerLugar(idSel);

if (ciudad) {
  // Rellenar datos principales 
  document.getElementById("det-nombre").innerText = ciudad.nombre;
  document.getElementById("det-temp").innerText = `${ciudad.tempActual}°C`;
  document.getElementById("det-estado").innerText = ciudad.estadoActual;
  document.getElementById("det-icono").innerText = ciudad.icono;
  document.getElementById("det-viento").innerText = ciudad.viento;
  document.getElementById("det-humedad").innerText = ciudad.humedad;

  // Ejecutar cálculos
  const stats = calcularEstadisticas(ciudad.pronosticoSemanal);

  // Inyectar estadísticas
  const statsContainer = document.getElementById("stats-container");
  if (statsContainer) {
    statsContainer.innerHTML = `
        <div class="col-4">
            <h5 class="font-weight-bold">${stats.minSemana}°C</h5>
            <small class="text-muted">Mínima</small>
        </div>
        <div class="col-4">
            <h5 class="font-weight-bold text-danger">${stats.maxSemana}°C</h5>
            <small class="text-muted">Máxima</small>
        </div>
        <div class="col-4">
            <h5 class="font-weight-bold text-primary">${stats.promedioMax}°C</h5>
            <small class="text-muted">Prom. Máx</small>
        </div>
    `;
  }

  // Inyectar resumen textual
  const resumenElem = document.getElementById("resumen-texto");
  if (resumenElem) {
    resumenElem.innerText = stats.resumen;
  }

  // Limpiar y renderizar lista de pronóstico semanal
  const lista = document.getElementById("lista-pronostico");
  if (lista) {
    lista.innerHTML = ""; 
    ciudad.pronosticoSemanal.forEach((dia) => {
      const iconoDia =
        dia.estado === "Soleado" ? "☀️" : dia.estado === "Lluvia" ? "🌧️" : "☁️";

      lista.innerHTML += `
            <div class="list-group-item d-flex justify-content-between align-items-center">
                <span class="font-weight-bold" style="width: 100px;">${dia.dia}</span>
                <span style="font-size: 1.5rem;">${iconoDia}</span>
                <span class="text-muted">${dia.min}° / <span class="text-dark font-weight-bold">${dia.max}°</span></span>
            </div>`;
    });
  }
} else {
  // Si no hay ciudad  volvemos al home
  window.location.href = "index.html";
}
