const contenedor = document.getElementById("contenedor-clima");

// Función para renderizar cards
function cargarCards() {
  localidades.forEach((loc) => {
    // Definimos una clase de estado según el clima
    const estadoClima = loc.estadoActual.toLowerCase().includes("lluvia")
      ? "is-rainy"
      : "is-sunny";

    const card = `
        <div class="col-12 col-md-6 col-lg-4 mb-4">
            <div class="card weather-card h-100 shadow-sm ${estadoClima}">
                <div class="card-body text-center">
                    <h5 class="weather-card__title text-muted">${loc.nombre}</h5>
                    <div class="weather-card__icon">${loc.icono}</div>
                    <p class="weather-card__temp h2">${loc.tempActual}°C</p>
                    <span class="badge badge-primary px-3 py-2">${loc.estadoActual}</span>
                    <div class="mt-4">
                        <button class="btn btn-outline-primary btn-block" onclick="verDetalle(${loc.id})">
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

// Navegación al detalle
function verDetalle(id) {
  localStorage.setItem("ciudadSeleccionada", id);
  window.location.href = "detalle.html";
}

cargarCards();
