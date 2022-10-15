import { useContext } from "react"
import { CardsContext } from "../../context/CardsContext"
import "./Card.css";
import windImg from '../../assets/icons/wind.svg'
import therImg from '../../assets/icons/thermometer.svg'

const Card = ({ card }) => {
    const { cards, setCards } = useContext(CardsContext)
    const { id, name, latitude, longitude, temperature, windspeed, image ,weathercode} = card

    const deleteCard = () => {
        setCards(cards.filter((card) => card.id !== id))
        localStorage.setItem('listaDeTarjetas', JSON.stringify(cards.filter((card) => card.id !== id)))
    }

    return (
        <div className="card-container">
            <p className="name">{name}</p>
            <div className="img-container">
                <img src={image === '' ? ('https://i0.wp.com/brochure3d.com/wp-content/plugins/elementor/assets/images/placeholder.png?w=750&ssl=1') : (image)} alt='imagen' />
            </div>
            <div className="card-content">
                <img className='card-icon' src={require(`../../assets/icons/${weathercode}.svg`)} alt='weathercode'></img>
                <p className='my-card-temp'>
                    <img className='ther-img' src={therImg} alt="Ther" />
                    {Math.round(temperature)} &deg;C
                </p>
                <p className='my-card-wind'>
                    <img className='wind-img' src={windImg} alt="viento" />
                    {windspeed} km/h
                </p>
                <div className="my-card-footer">
                    <p className="my-card-lat">Latitud:     {latitude}</p>
                    <p className="my-card-lng">Longitud:    {longitude}</p>
                </div>

            </div>
            <button className="btn-delete" onClick={deleteCard}>eliminar</button>
        </div>
    )
}

export default Card;