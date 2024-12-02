import "./Header.css"
import logo from "../../components/images/logo.png";
import Navigation from "../Navigation/Navigation";


function Header() {
    return (
        <header className="header">    
            <img className="logo" src={logo} alt="logo" />
            <Navigation />
        </header>
    )
}

export default Header;