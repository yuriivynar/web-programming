import React, { useState, useEffect } from "react";
import DocumentTitle from "../../components/helmet/document_title";
import { fetchCardData } from "../../components/back";
import { useParams, Link } from "react-router-dom";
import FilterSelect from "../../components/filter_select/FilterSelect";
import "./ItemPage.css";
import Loader from "../../components/loader/Loader";
import { useDispatch } from 'react-redux';
import { setCart } from '../../redux/CartSlice';

function ItemPage() {
    DocumentTitle("Catalog Item");
    const { index } = useParams();

    const [card, setCard] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(1);

    const [selectedColor, setSelectedColor] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const getCardData = async () => {
            setLoading(true);
            try {
                const data = await fetchCardData(index);
                setCard(data);
                setSelectedColor(data.color);
            } catch (error) {
                setError("Card not found");
            } finally {
                setLoading(false);
            }
        };
        getCardData();
    }, [index]);

    if (loading) {
        return <Loader />;
    }
    if (error) {
        return <div>{error}</div>;
    }

    const handleAddToCart = () => {
        if (card) {
            dispatch(setCart({ ...card, color: selectedColor, quantity: count }));
        }
    };

    const totalPrice = (card.price * count).toFixed(2);

    return (
        
        <div className='itempage_content'>
            <div className='content_info'>
                <img src={card.imgpath} alt={card.title} />
                <article className="content_info_text">
                    <h1>{card.title}</h1>
                    <p>{card.text}</p>
                    <FilterSelect
                        label="Color:"
                        options={[
                            { value: 'White', label: 'White' },
                            { value: 'Blue', label: 'Blue' },
                            { value: 'Green', label: 'Green' },
                            { value: 'Yellow', label: 'Yellow' },
                            { value: 'Black', label: 'Black' },
                            { value: 'Multicolor', label: 'Multicolor' },
                            { value: 'Pink', label: 'Pink' },
                            { value: 'Red', label: 'Red' }
                        ]}
                        color={selectedColor}
                        onCountChange={setCount}
                        onColorChange={setSelectedColor}
                    />
                </article>
            </div>
            <div className='content_underline'>
                <div className="content_underline_price">
                    <p>Price: {totalPrice}$</p>
                </div>
                <div className='content_underline_buttons'>
                    <Link to='/catalog'>
                        <button className='underline_button'>Go back</button>
                    </Link>
                    <Link to='/cart'>
                        <button className='underline_button' onClick={handleAddToCart}>Add to cart</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ItemPage;