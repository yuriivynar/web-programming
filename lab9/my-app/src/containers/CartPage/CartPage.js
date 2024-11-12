import React from "react";
import DocumentTitle from "../../components/helmet/document_title";
import "./CartPage.css";
import { Link } from "react-router-dom";

function CartItem() {
    DocumentTitle("Cart");
    return(
        <div className="cart_content">
            <h1 className="cart_content_title">Shopping Cart</h1>
            <div className="cart_content_items">
                <div className="cart_item">
                    <img src="/sapphire_pink.jpg" alt=""/>
                    <h2 className="cart_item_title">Somethig</h2>
                    <div className="cart_item_buttons">
                        <button>-</button>
                        <span></span>
                        <button>+</button>
                    </div>
                    <p className="cart_item_price">$</p>
                </div>
            </div>
            <div className="cart_content_total-price">
                <p>Total amount: $</p>
            </div>
            <div className="cart_content_buttons">
                <Link to={`/catalog`}>
                    <button className="underline_button">Back to Catalog</button>
                </Link>
                <Link to={`/checkout`}>
                    <button className="underline_button">Continue</button>
                </Link>
            </div>
        </div>
    )
}
export default CartItem;