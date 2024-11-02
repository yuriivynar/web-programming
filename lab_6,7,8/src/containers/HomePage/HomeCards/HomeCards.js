import React, { useState, useContext } from "react";
import CurrencyContext from "../../../components/create_context/CreateContext";
import CardItem from "../../../components/card_item/CardItem";
import "./HomeCards.css";

function HomeCards() {
    const data = useContext(CurrencyContext);
    const [visibleCount, setVisibleCount] = useState(3);

    const viewMore = () => {
        setVisibleCount(visibleCount + 3);
    };

    const hideCards = () => {
        setVisibleCount(3);
    };

    return (
        <>
             <div className="home_cards">
                {data.slice(0, visibleCount).map((item) => (
                    <CardItem data = {item} key={item.id} />
                ))}
            </div>
            <div className="home_cards_btn">
                {visibleCount < data.length && (
                    <button className="view_btn" onClick={viewMore}>View More</button>
                )}
                {visibleCount >= data.length && (
                    <button className="view_btn" onClick={hideCards}>Hide Cards</button>
                )}
            </div>
        </>
    );
}

export default HomeCards;
