import { useContext } from "react"
import { CardsContext } from "../../context/CardsContext"
import "./Card.css";


const Card = ({card}) =>{
    const {cards, setCards} = useContext(CardsContext)
    const {id, name, latitude, longitude, temperature, windspeed} = card

    const deleteCard = () => {
        setCards(cards.filter((card) => card.id !== id))
    }

    return(
        <div className="card-container">
            <p>ID: {id}</p>
            <p>Nombre: {name}</p>
            <p>Latitud: {latitude}</p>
            <p>Longitud: {longitude}</p>
            <p>Temperatura: {temperature} °C</p>
            <p>Viento: {windspeed} m/s</p>
            <button onClick={deleteCard}>eliminar</button>
        </div>
    )
}

export default Card;