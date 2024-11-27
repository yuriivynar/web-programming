import React, { useState, useEffect } from "react";
import CardItem from "../../../components/card_item/CardItem";
import { fetchData } from "../../../components/back";
import "./HomeCards.css";
import Loader from "../../../components/loader/Loader";

function HomeCards() {
    const [data, setData] = useState([]);
    const [visibleCount, setVisibleCount] = useState(3);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const result = await fetchData();
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    if (loading) {
        return <Loader />;
    }

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
                    <CardItem data={item} key={item.id} />
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
