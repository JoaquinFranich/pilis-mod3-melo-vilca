import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CardsContext } from "../../context/CardsContext";
import { getWeather } from "../../service";
import './CreateCard.css'
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Popup, TileLayer, useMapEvent } from 'react-leaflet';
import L from 'leaflet'
import { FaMapMarkerAlt } from "react-icons/fa";

const CreateCard = () => {

    const { cards, setCards } = useContext(CardsContext);
    const { register, handleSubmit, formState: { errors }, } = useForm({});
    const navigate = useNavigate();
    const [coordenadas, setCoordenadas] = useState({ lat: '-24.18488458152717', lng: '-65.30250011879315' })
    const [imagen64, setImagen64] = useState('')


    // icono para marcar en mapa
    var redIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    // obtener coordenadas
    const LocationFinder = () => {
        useMapEvent({
            click(e) {
                setCoordenadas(e.latlng)
            }
        })
        // return null;
        return <Marker position={coordenadas} icon={redIcon}>
            <Popup>latitud: {coordenadas.lat} <br /> longitud: {coordenadas.lng}</Popup>
        </Marker>;
    }


    // metodo para crear la tarjeta con los datos del formulario
    const onSubmit = (data) => {
        getWeather(coordenadas.lat, coordenadas.lng)
            .then((res) => {
                const cardData = {
                    name: data.nombre,
                    latitude: coordenadas.lat,
                    longitude: coordenadas.lng,
                    temperature: res.current_weather.temperature,
                    windspeed: res.current_weather.windspeed,
                    id: cards.length === 0 ? (1) : (cards[cards.length - 1].id + 1),
                    image: imagen64,
                    weathercode: res.current_weather.weathercode,
                }
                setCards([...cards, cardData]);
                localStorage.setItem('listaDeTarjetas', JSON.stringify([...cards, cardData]))
                navigate('/')
            })
    }

    // para convertir imagen a base64
    const converToBase64 = (image) => {
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = function () {
            let base64 = reader.result;
            setImagen64(base64)
        }
    }

    return (
        <div className="my-grid">
            <div className="form-container">
                <form className="formulario" onSubmit={handleSubmit(onSubmit)}>
                    <h2>Formulario</h2>

                    <input type="text"
                        placeholder="Nombre"
                        {...register('nombre', {
                            required: 'Debe ingresar un Nombre'
                        })} />
                    <p>{errors.nombre?.message}</p>

                    <input type="text"
                        placeholder="Latitud"
                        value={coordenadas.lat}
                        {...register('latitud', {
                            required: 'Ingrese Latitud'
                        })} />
                    <p>{errors.latitud?.message}</p>

                    <input type="text"
                        placeholder="Longitud"
                        value={coordenadas.lng}
                        {...register('longitud', {
                            required: 'Ingrese Longitud'
                        })} />
                    <p>{errors.longitud?.message}</p>

                    <input type="file" className='input-imagen' onChange={(e) => converToBase64(e.target.files[0])} />


                    <button className="accent-button" type="submit">Enviar Datos</button>
                </form>
            </div>

            <div className='map-container'>
                <h2 className='map-title'>Señala una Ubicacion<FaMapMarkerAlt></FaMapMarkerAlt></h2>
                <MapContainer center={[-23.301957529352862, -65.9490246246764]} zoom={7} scrollWheelZoom={false} >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'>
                    </TileLayer>
                    <LocationFinder></LocationFinder>
                </MapContainer>
            </div>
        </div>
    )
}

export default CreateCard;