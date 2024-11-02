import React, {useContext, useEffect, useState} from "react";
import Filters from "../Filters/Filters";
import CardItem from "../../../components/card_item/CardItem"
import "./CatalogItems.css";
import CurrencyContext from "../../../components/create_context/CreateContext";

function CatalogItems() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const data = useContext(CurrencyContext);

    const [searchTerm, setSearchTerm] = useState('');
    const [sortName, setSortName] = useState('');
    const [sortColor, setSortColor] = useState('');
    const [sortPrice, setSortPrice] = useState('none');


    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase().trim().replace(/\s+/g, ''));
    };
    const handleSortNameChange = (event) => {
        setSortName(event.target.value);
    };
    const handleSortColorChange = (event) => {
        setSortColor(event.target.value);
    };
    const handleSortPriceChange = (event) => {
        setSortPrice(event.target.value);
    };

    const filteredData = data
    .filter((item) => {
        const title = item.title.toLowerCase().trim().replace(/\s+/g, '');
        const itemColor = item.color.toLowerCase().trim().replace(/\s+/g, '');
        const searchCondition = title.includes(searchTerm) || itemColor.includes(searchTerm);
        const nameCondition = sortName === '' || item.title === sortName;
        const colorCondition = !sortColor || item.color === sortColor;
        return searchCondition && nameCondition && colorCondition;
    })
    .sort((a, b) => {
        if (sortPrice === 'Asceding') return a.price - b.price;
        if (sortPrice === 'Descending') return b.price - a.price;
        return 0;
    });
    return(
    <>
        <Filters
            onSearch={handleSearch}
            onSortNameChange={handleSortNameChange}
            onSortColorChange={handleSortColorChange} 
            onSortPriceChange={handleSortPriceChange}
        />       
        <div className="catalog_content">
            <div className="catalog_cards">
            {filteredData && filteredData.map((item) => (
                <CardItem data = {item} key = {item.id}/>
            ))}
            </div>
        </div>
    </>
    );
};

export default CatalogItems;