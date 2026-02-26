# ☀️ BioWeather - Módulo 5: POO y Datos en Tiempo Real

**BioWeather** es una aplicación web diseñada para visualizar el clima regional de manera dinámica. En esta cuarta iteración, el proyecto evoluciona de una interfaz estática a una aplicación funcional capaz de procesar datos, calcular estadísticas climáticas y generar reportes automáticos mediante JavaScript.

**BioWeather** ha evolucionado. En esta quinta iteración, hemos dejado atrás los datos fijos para convertirnos en una aplicación conectada a la realidad. El proyecto ahora utiliza Programación Orientada a Objetos (POO) para gestionar la lógica y consume datos en vivo desde una API externa mediante programación asíncrona.

---

## 🚀 Demo en Vivo

Puedes ver el proyecto funcionando aquí:  
👉 **[VER PROYECTO EN GITHUB PAGES](https://amasandopan.github.io/weather-frontend-m5)**

---

## 🚀 Características del Proyecto (Módulo 5)

- **Arquitectura Profesional**: Uso de clases para separar la lógica de obtención de datos de la lógica de negocio y renderizado.
- **Consumo de API Real**: Integración con **OpenWeatherMap** para obtener datos climáticos actualizados y pronósticos extendidos.
- **Gestión de Datos Asíncrona**: Implementación de `async/await` para manejar las respuestas de la API de forma eficiente.
- **Alertas Inteligentes**: Sistema de advertencias basado en el análisis del promedio de temperaturas y la frecuencia de precipitaciones.

---

## 🏗️ Estructura de Clases

Para cumplir con los requisitos técnicos, el código se organiza en las siguientes clases:

1.  **`WeatherAPI`**:
- **Responsabilidad**: Gestionar la comunicación con el endpoint de OpenWeather.
- **Métodos clave**: `getWeatherData(identificador)` (realiza el fetch) y `transformData(apiData)` (mapea el JSON de la API al formato interno de la app).
2.  **`WeatherApp`**:
- **Responsabilidad**: Controlar el flujo de la aplicación y la interacción con el usuario.
- **Métodos clave**: `calcularEstadisticas(pronostico)` y `verDetalle(id)` para la navegación mediante `localStorage`.

---

## 🌐 API Utilizada

- **Nombre**: [OpenWeatherMap API](https://openweathermap.org/).
- **Endpoint**: _5 Day / 3 Hour Forecast_.
- **Descripción**: Proporciona datos meteorológicos actuales y un pronóstico cada 3 horas para los próximos 5 días, permitiéndonos calcular tendencias semanales con precisión.

---

## 📊 Estadísticas y Alertas Climáticas

En esta versión, las estadísticas ya no son fijas. Se calculan mediante métodos de clase que procesan el arreglo de pronóstico obtenido de la API:

- **Promedio Máximo**: Se calcula sumando las temperaturas máximas diarias y dividiendo por la cantidad de días del pronóstico.
- **Alertas de Clima**:
- **Alerta de Calor**: Se dispara si el promedio de temperatura máxima es superior a **25°C**.
- **Semana Lluviosa**: Se dispara si se detectan **2 o más días** con estado de lluvia en el reporte.

---

## 🛠️ Tecnologías ES6+ Aplicadas

- **Clases**: Para una estructura de código escalable y organizada.
- **Template Literals**: Para la construcción dinámica de componentes HTML.
- **Async/Await**: Para un manejo limpio del asincronismo al consumir la API.
- **Arrow Functions**: Utilizadas en métodos de arreglos (`map`, `filter`, `forEach`) para procesar datos de forma concisa.

---

## 👤 Autor

Desarrollado por **AmasandoPan**.
 
---

_BioWeather - Módulo 5 (2026)_
