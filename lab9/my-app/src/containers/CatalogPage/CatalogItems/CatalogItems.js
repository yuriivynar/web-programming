import React, { useEffect, useState } from "react";
import { fetchData } from "../../../components/back";
import Filters from "../Filters/Filters";
import CardItem from "../../../components/card_item/CardItem";
import "./CatalogItems.css";

function CatalogItems() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortName, setSortName] = useState('');
    const [sortColor, setSortColor] = useState('');
    const [sortPrice, setSortPrice] = useState('none');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFilteredData = async () => {
            setLoading(true);
            try {
                const result = await fetchData(searchTerm, sortName, sortColor, sortPrice);
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFilteredData();
    }, [searchTerm, sortName, sortColor, sortPrice]);

    if (loading) {
        return <div className="loader">Loading...</div>;
    }

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

    return (
        <>
            <Filters
                onSearch={handleSearch}
                onSortNameChange={handleSortNameChange}
                onSortColorChange={handleSortColorChange} 
                onSortPriceChange={handleSortPriceChange}
            />
            <div className="catalog_content">
                <div className="catalog_cards">
                    {data && data.map((item) => (
                        <CardItem data={item} key={item.id} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default CatalogItems;