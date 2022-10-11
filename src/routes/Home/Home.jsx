import { useContext } from "react";
import Cards from "../../components/Card/Cards";
import { CardsContext } from "../../context/CardsContext";

const Home = () => {

    const {cards} = useContext(CardsContext)
    return(
        <div className="main-container">
            <Cards cards={cards}></Cards>
        </div>
    )
}

export default Home;