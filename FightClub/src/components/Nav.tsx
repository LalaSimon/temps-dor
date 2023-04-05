import { useState } from "react";
import { Link } from "react-router-dom";
import "../scss/navMobile.scss";
const Nav = () => {
    const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
    const [menu_class, setMenuClass] = useState("menu hidden");
    const [isMenuClicked, setIsMenuClicked] = useState(false);
    const updateMenu = () => {
        if (!isMenuClicked) {
            setBurgerClass("burger-bar clicked");
            setMenuClass("menu visible");
        } else {
            setBurgerClass("burger-bar unclicked");
            setMenuClass("menu hidden");
        }
        setIsMenuClicked(!isMenuClicked);
    };
    return (
        <>
            <nav>
                <div className="burger-menu" onClick={updateMenu}>
                    <div className={burger_class}></div>
                    <div className={burger_class}></div>
                    <div className={burger_class}></div>
                </div>
            </nav>
            <div className={menu_class}>
                <ul className="flex flex-col items-center mt-72 gap-10">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/coaches">Coaches</Link>
                    </li>
                    <li>Pricing</li>
                    <li>Photos</li>
                    <li>Details</li>
                    <li>Contact</li>
                </ul>
            </div>
        </>
    );
};

export { Nav };
