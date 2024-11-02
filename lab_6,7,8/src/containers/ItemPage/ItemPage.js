import React, {useContext} from "react"
import CurrencyContext from "../../components/create_context/CreateContext";
import DocumentTitle from "../../components/helmet/document_title";
import { useParams, Link } from "react-router-dom";
import FilterSelect from "../../components/filter_select/FilterSelect";
import "./ItemPage.css"


function ItemPage() {
    DocumentTitle("Catalog Item")
    const { index } = useParams();
    const data = useContext(CurrencyContext);
    const card = data.find((el) => el.id === parseInt(index));

    if (!card) {
        return <div>Card not found</div>;
    }

    return (
        <>
            <div className='itempage_content'>
                <div className='content_info'>
                    <img src={card.imgpath} alt={card.title} />
                    <article className="content_info_text">
                        <h1>{card.title}</h1>
                        <p>{card.text}</p>
                        <>
                            <FilterSelect 
                                label="Color:"
                                options={[
                                    {value: 'White', label: 'White'},
                                    {value: 'Blue', label: 'Blue'},
                                    {value: 'Green', label: 'Green'},
                                    {value: 'Pink', label: 'Pink'},
                                    {value: 'Red', label: 'Red'}
                                ]}
                                color={card.color}
                            />
                    </>
                    </article>
                </div>
                <div className='content_underline'>
                    <div className="content_underline_price">
                        <p>Price: {card.price}$</p>
                    </div> 
                    <div className='content_underline_buttons'>
                        <Link to='/catalog'> 
                            <button className='underline_button'>Go back</button>
                        </Link>
                        <button className='underline_button'>Add to cart</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ItemPage;