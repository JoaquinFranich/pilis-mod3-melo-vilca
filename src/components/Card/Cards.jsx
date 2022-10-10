import Card from "./Card";

const Cards = ({cards}) => {
    return(
        <div className="grid">
            {cards.map((card)=>(<Card key={card.id} card={card}></Card>))}
        </div>
    )
}
export default Cards;