// metodo para obtener el clima
export const getWeather = async (latitud, longitud) => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?current_weather=true&latitude=${latitud}&longitude=${longitud}&timezone=America/Argentina/Jujuy`
    );
    const data = await response.json();
    return data;
  } catch {
    throw new Error("no se pudo obtener el clima");
  }
};
