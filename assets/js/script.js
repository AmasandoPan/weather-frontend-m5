const app = new WeatherApp(new WeatherAPI("TU_API_KEY_AQUI"));
const contenedor = document.getElementById("contenedor-clima");

const inicializarHome = async () => {
  contenedor.innerHTML = `<p class="text-center w-100">Cargando clima...</p>`;

  try {
    renderizarCards(localidades);
  } catch (error) {
    contenedor.innerHTML = `<div class="alert alert-danger">Error al conectar con el servicio de clima.</div>`;
  }
};

function renderizarCards(lista) {
  contenedor.innerHTML = "";
  lista.forEach((loc) => {
    const card = `
            <div class="col-12 col-md-6 col-lg-4 mb-4">
                <div class="card weather-card h-100 shadow-sm">
                    <div class="card-body text-center">
                        <h5 class="text-muted">${loc.nombre}</h5>
                        <div class="weather-card__icon">${loc.icono}</div>
                        <p class="h2">${loc.tempActual}°C</p>
                        <span class="badge badge-primary">${loc.estadoActual}</span>
                        <div class="mt-4">
                            <button class="btn btn-outline-primary btn-block" onclick="app.verDetalle(${loc.id})">
                                Ver Detalles
                            </button>
                        </div>
                    </div>
                </div>
            </div>`;
    contenedor.innerHTML += card;
  });
}

inicializarHome();
