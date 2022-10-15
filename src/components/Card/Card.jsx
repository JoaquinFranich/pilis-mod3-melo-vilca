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
            <div className="img-container">
                <img src="https://picsum.photos/seed/picsum/200" alt="" />
            </div>
            <div className="card-content">
                <p className="id">ID: {id}</p>
                <p className="name">Nombre: {name}</p>
                <p className="lat">Latitud:     {latitude}</p>
                <p className="lon">Longitud:    {longitude}</p>
                <p className="temp">Temperatura:    {temperature} °C</p>
                <p className="wind">Viento:     {windspeed} m/s</p>
            </div>
            <button className="btn-delete" onClick={deleteCard}>eliminar</button>
        </div>
    )
}

export default Card;