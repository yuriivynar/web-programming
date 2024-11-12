import React from "react";
import Hero from "./Hero/Hero";
import HomeCards from "./HomeCards/HomeCards";
import DocumentTitle from "../../components/helmet/document_title";


function Home() {
    DocumentTitle("Home")
    return(
        <div>
            <Hero />
            <HomeCards />
        </div>

    );
}

export default Home;