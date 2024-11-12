import "./Hero.css";
import heroImage from "../../../components/images/header_image.jpg";

function Hero() {
    return(
        <div className = "hero">
            <img className="hero_image" src={heroImage} alt="gems"/>
            <div className="hero_content">
                <h1>
                    Heading
                </h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc maximus, nulla ut commodo sagittis, sapien dui mattis 
                    dui, non pulvinar lorem felis nec erat 
                </p>
            </div>
        </div>
    )
};

export default Hero;