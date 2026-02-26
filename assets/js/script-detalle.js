// Instanciamos la API y la App
const api = new WeatherAPI("3088fee1626812f0bbd8647a4a38608c");
const app = new WeatherApp(api);

async function cargarDetalle() {
  const ciudadNombre = localStorage.getItem("ciudadSeleccionada");

  if (!ciudadNombre) {
    window.location.href = "index.html";
    return;
  }

  try {
    //  Pedimos los datos frescos a la API
    const ciudad = await api.getWeatherData(ciudadNombre);

    // Renderizamos la información principal
    document.getElementById("det-nombre").innerText = ciudad.nombre;
    document.getElementById("det-temp").innerText = `${ciudad.tempActual}°C`;
    document.getElementById("det-estado").innerText = ciudad.estadoActual;
    document.getElementById("det-icono").innerText = ciudad.icono;
    document.getElementById("det-viento").innerText = ciudad.viento;
    document.getElementById("det-humedad").innerText = ciudad.humedad;

    // Calculamos estadísticas con el método de nuestra clase
    const stats = app.calcularEstadisticas(ciudad.pronosticoSemanal);

    // Inyectamos estadísticas en el DOM
    renderizarEstadisticas(stats);

    //Inyectamos Alertas
    renderizarAlertas(stats);

    // Renderizamos la lista del pronóstico
    renderizarListaPronostico(ciudad.pronosticoSemanal);
  } catch (error) {
    console.error(error);
    alert("No se pudo cargar el detalle del clima.");
  }
}

function renderizarEstadisticas(stats) {
  const container = document.getElementById("stats-container");
  if (container) {
    container.innerHTML = `
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
}

function renderizarAlertas(stats) {
  const resumenElem = document.getElementById("resumen-texto");
  let alertaHTML = "";

  // Alerta de Calor (Promedio > 25°C)
  if (parseFloat(stats.promedioMax) > 25) {
    alertaHTML += `<div class="alert alert-warning">🔥 Alerta de calor: Semana con temperaturas sobre el promedio.</div>`;
  }

  // Semana Lluviosa (Días de lluvia >= 2)
  if (stats.conteoLluvia >= 2) {
    alertaHTML += `<div class="alert alert-info">🌧️ Semana lluviosa: Se esperan varios días de precipitaciones.</div>`;
  }

  resumenElem.innerHTML =
    alertaHTML || "Semana con condiciones climáticas estables.";
}

function renderizarListaPronostico(pronostico) {
  const lista = document.getElementById("lista-pronostico");
  if (lista) {
    lista.innerHTML = "";
    pronostico.forEach((dia) => {
      const icono =
        dia.estado === "Clear" ? "☀️" : dia.estado === "Rain" ? "🌧️" : "☁️";
      lista.innerHTML += `
                <div class="list-group-item d-flex justify-content-between align-items-center">
                    <span class="font-weight-bold text-capitalize" style="width: 100px;">${dia.dia}</span>
                    <span style="font-size: 1.5rem;">${icono}</span>
                    <span class="text-muted">${dia.min}° / <span class="text-dark font-weight-bold">${dia.max}°</span></span>
                </div>`;
    });
  }
}

cargarDetalle();
