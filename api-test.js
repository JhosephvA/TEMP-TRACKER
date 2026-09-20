const claveApi = 'f87a8b3443254aa1a67182037261409';
const idioma = 'es';
const urlBase = 'https://api.weatherapi.com/v1/current.json';

const inputCiudad = document.querySelector('#input-ciudad');

async function obtenerClima() {
    const ciudad = inputCiudad.value.trim();
    if (!ciudad) return;

    const url = `${urlBase}?q=${encodeURIComponent(ciudad)}&lang=${idioma}&key=${claveApi}`;

    try {
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            alert('No se encontró la ciudad. Revisa el nombre.');
            return;
        }

        const data = await respuesta.json();
        mostrarClima(data);
    } catch (error) {
        console.error(error);
        alert('Hubo un problema al conectar con el servicio del clima.');
    }
}

function mostrarClima(data) {
    document.querySelector('.clima-icono').src = 'https:' + data.current.condition.icon;
    document.querySelector('.clima-texto').textContent = data.current.condition.text;
    document.querySelector('.temp').textContent = data.current.temp_c + '°C';
    document.querySelector('.ciudad').textContent = data.location.name;
    document.querySelector('.humedad').textContent = data.current.humidity + '%';
    document.querySelector('.viento').textContent = data.current.wind_kph + ' km/h';
}

inputCiudad.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') obtenerClima();
});