import React from "react"
import DocumentTitle from "../../components/helmet/document_title"
import CatalogItems from "./CatalogItems/CatalogItems";

function Catalog() {
    DocumentTitle("Catalog");
    return(
        <CatalogItems/>
    );
}

export default Catalog;