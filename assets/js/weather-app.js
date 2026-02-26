/**
 * clase que se encarga de la comunicacion de la API
 */
class WeatherAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://api.openweathermap.org/data/2.5";
  }

  async getWeatherData(identificador) {
    try {
      const esNumero = !isNaN(identificador);
      const parametro = esNumero ? `id=${identificador}` : `q=${identificador}`;

      const response = await fetch(
        `${this.baseUrl}/forecast?${parametro}&units=metric&lang=es&appid=${this.apiKey}`,
      );

      if (!response.ok)
        throw new Error(`Ciudad ${identificador} no encontrada`);

      const data = await response.json();
      return this.transformData(data);
    } catch (error) {
      console.error("Error en API:", error);
      throw error;
    }
  }

  transformData(apiData) {
    // obtenemos un registro por dia (se actualiza cada 3 horas)
    const dailyForecast = apiData.list.filter((_, index) => index % 8 === 0);

    return {
      id: apiData.city.id,
      nombre: apiData.city.name,
      tempActual: Math.round(apiData.list[0].main.temp),
      estadoActual: apiData.list[0].weather[0].description,
      icono: this.mapIcon(apiData.list[0].weather[0].main),
      viento: `${apiData.list[0].wind.speed} km/h`,
      humedad: `${apiData.list[0].main.humidity}%`,
      pronosticoSemanal: dailyForecast.map((item) => ({
        dia: new Date(item.dt_txt).toLocaleDateString("es-ES", {
          weekday: "long",
        }),
        min: Math.round(item.main.temp_min),
        max: Math.round(item.main.temp_max),
        estado: item.weather[0].main,
      })),
    };
  }

  mapIcon(weatherMain) {
    const icons = {
      Clear: "☀️",
      Clouds: "☁️",
      Rain: "🌧️",
      Drizzle: "🌦️",
      Thunderstorm: "⛈️",
      Snow: "❄️",
    };
    return icons[weatherMain] || "🌡️";
  }
}

/**
 * clase para la logica de la app y ui
 */
class WeatherApp {
  constructor(apiClient) {
    this.apiClient = apiClient;
    this.lugares = [];
  }

  verDetalle(id) {
    localStorage.setItem("ciudadSeleccionada", id);
    window.location.href = "detalle.html";
  }

  // metodo para calcular las estadisticas
  calcularEstadisticas(pronostico) {
    let sumaMax = 0;
    let minSemana = pronostico[0].min;
    let maxSemana = pronostico[0].max;
    let conteoLluvia = 0;

    pronostico.forEach((dia) => {
      if (dia.min < minSemana) minSemana = dia.min;
      if (dia.max > maxSemana) maxSemana = dia.max;
      sumaMax += dia.max;
      if (dia.estado === "Rain") conteoLluvia++;
    });

    const promedioMax = (sumaMax / pronostico.length).toFixed(1);
    return { minSemana, maxSemana, promedioMax, conteoLluvia };
  }
}
