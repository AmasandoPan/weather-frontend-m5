const api = new WeatherAPI("3088fee1626812f0bbd8647a4a38608c");
const app = new WeatherApp(api);

async function inicializarApp() {
  const ciudadesAVisualizar = [
    "Santiago",
    "London",
    "Tokyo",
    "Madrid",
    "New York",
  ];
  const contenedor = document.getElementById("contenedor-clima");

  contenedor.innerHTML = "<p>Actualizando clima en tiempo real...</p>";

  try {
    // Usamos Promise.all para cargar todas las ciudades en paralelo
    const promesas = ciudadesAVisualizar.map((nombre) =>
      api.getWeatherData(nombre),
    );
    const resultados = await Promise.all(promesas);

    // Guardamos los resultados en la clase principal
    app.lugares = resultados;

    // Renderizamos las cards (esta función ya la tienes del módulo anterior)
    renderizarCards(app.lugares);
  } catch (error) {
    contenedor.innerHTML = `<div class="alert alert-danger">Hubo un problema: ${error.message}</div>`;
  }
}

inicializarApp();

/**
 * Renderiza las tarjetas de clima en el HTML
 * @param {Array} lista - Array de objetos de clima transformados
 */
function renderizarCards(lista) {
  const contenedor = document.getElementById("contenedor-clima");
  contenedor.innerHTML = ""; // Limpiamos el mensaje de "Cargando..."

  lista.forEach((loc) => {
    // Determinamos el color de fondo básico según el estado
    const estadoClima =
      loc.estadoActual.toLowerCase().includes("lluvia") ||
      loc.estadoActual.toLowerCase().includes("rain")
        ? "is-rainy"
        : "is-sunny";

    const card = `
            <div class="col-12 col-md-6 col-lg-4 mb-4">
                <div class="card weather-card h-100 shadow-sm ${estadoClima}">
                    <div class="card-body text-center">
                        <h5 class="weather-card__title text-muted">${loc.nombre}</h5>
                        <div class="weather-card__icon">${loc.icono}</div>
                        <p class="weather-card__temp h2">${loc.tempActual}°C</p>
                        <span class="badge badge-primary px-3 py-2 text-capitalize">${loc.estadoActual}</span>
                        <div class="mt-4">
                            <button class="btn btn-outline-primary btn-block" onclick="app.verDetalle(${loc.id})">
                                Ver Detalles
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    contenedor.innerHTML += card;
  });
}
