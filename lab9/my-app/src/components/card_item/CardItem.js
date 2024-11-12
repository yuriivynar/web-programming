import React from "react";
import "./CardItem.css";
import { Link, useLocation } from "react-router-dom";

function CardItem({ data }) {
    const location = useLocation();

    return (
        <div
            id={data.id}
            className={`cards_container ${location.pathname === '/catalog' ? 'cards_container-catalog' : ''}`}
        >
            <img
                src={data.imgpath}
                alt={data.title}
                className={`cards_photo ${location.pathname === '/catalog' ? 'cards_photo-catalog' : ''}`}
            />
            <article className={`cards_text ${location.pathname === '/catalog' ? 'cards_text-catalog' : ''}`}>
                <h2 className={`cards_text_title ${location.pathname === '/catalog' ? 'cards_text_title-catalog' : ''}`}>
                    {data.title}
                </h2>
                <p className={`cards_text_desc ${location.pathname === '/catalog' ? 'cards_text_desc-catalog' : ''}`}>
                    {data.text}
                </p>
                {location.pathname === '/catalog' && (
                    <>
                        <p className="cards_text_color-catalog">Color: {data.color}</p>
                        <p className="cards_text_price-catalog">Price: {data.price}$</p>
                    </>
                )}
            </article>
            {location.pathname === '/catalog' && (
                <div className="cards__button-catalog">
                    <Link to={`/catalog/${data.id}`}>
                        <button className="cards__button">View More</button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default CardItem;
