import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CardsContext } from "../../context/CardsContext";
import { getWeather } from "../../service";

const CreateCard = () => {

    const { cards, setCards } = useContext(CardsContext);
    const { register, handleSubmit, formState: { errors }, } = useForm({});
    const navigate = useNavigate();


    // metodo para crear la tarjeta con los datos del formulario
    const onSubmit = (data) => {
        getWeather(data.latitud, data.longitud)
            .then((res) => {
                const cardData = {
                    name: data.nombre,
                    latitude: data.latitud,
                    longitude: data.longitud,
                    temperature: res.current_weather.temperature,
                    windspeed: res.current_weather.windspeed,
                    id: cards.length === 0 ? (1) : (cards[cards.length - 1].id + 1),
                }
                setCards([...cards, cardData]);
                localStorage.setItem('listaDeTarjetas', JSON.stringify([...cards, cardData]))
                navigate('/')
            })
    }



    return (
        <div>
            <form className="formulario" onSubmit={handleSubmit(onSubmit)}>
                <h2>formulario</h2>
                
                <input type="text"
                    placeholder="Nombre"
                    {...register('nombre', {
                        required: 'Debe ingresar un Nombre'
                    })} />
                <p>{errors.nombre?.message}</p>

                <input type="text"
                    placeholder="Latitud"
                    {...register('latitud', {
                        required: 'Ingrese Latitud'
                    })} />
                <p>{errors.latitud?.message}</p>

                <input type="text"
                placeholder="Longitud"
                {...register('longitud',{
                    required:'Ingrese Longitud'
                })} />
                <p>{errors.longitud?.message}</p>

                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default CreateCard;