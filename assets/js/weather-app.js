/**
 * clase encargada de las peticiones a la API
 */
class WeatherAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://api.openweathermap.org/data/2.5";
  }

  // metodo para obtener clima actual y pronóstico
  async getWeatherData(city) {
    try {
      // para este ejemplo, simulamos la respuesta de la API basandonos en la estructura de OpenWeather
      const response = await fetch(
        `${this.baseUrl}/forecast?q=${city}&units=metric&appid=${this.apiKey}`,
      );
      if (!response.ok) throw new Error("Ciudad no encontrada");
      return await response.json();
    } catch (error) {
      console.error("Error API:", error);
      throw error;
    }
  }
}

/**
 * clase principal de la aplicacion
 */
class WeatherApp {
  constructor(apiClient) {
    this.apiClient = apiClient;
    this.lugares = [];
    this.ciudadSeleccionada = null;
  }

  // calcula las estadísticas basadas en el array de pronóstico
  calcularEstadisticas(pronostico) {
    let sumaMax = 0;
    let minSemana = pronostico[0].min;
    let maxSemana = pronostico[0].max;
    let lluviaDias = 0;

    pronostico.forEach((dia) => {
      if (dia.min < minSemana) minSemana = dia.min;
      if (dia.max > maxSemana) maxSemana = dia.max;
      sumaMax += dia.max;
      if (dia.estado.toLowerCase().includes("lluvia")) lluviaDias++;
    });

    const promedioMax = (sumaMax / pronostico.length).toFixed(1);

    return {
      minSemana,
      maxSemana,
      promedioMax,
      lluviaDias,
      alertas: this.generarAlertas(promedioMax, lluviaDias),
    };
  }

  // logica de alertas
  generarAlertas(promedio, diasLluvia) {
    const alertas = [];
    if (promedio > 28)
      alertas.push({
        tipo: "danger",
        msg: "⚠️ Alerta de calor: Promedio semanal muy alto.",
      });
    if (diasLluvia >= 2)
      alertas.push({
        tipo: "info",
        msg: "🌧️ Semana lluviosa: Prepara tu paraguas.",
      });
    return alertas;
  }

  // metodo para guardar en localStorage y navegar
  verDetalle(id) {
    localStorage.setItem("ciudadSeleccionada", id);
    window.location.href = "detalle.html";
  }
}
