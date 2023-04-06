import { useState } from "react";
import { Link } from "react-router-dom";
import "../../scss/navMobile.scss";
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
                <div className="text-white text-xl uppercase">
                    <Link to="/">temps d'or</Link>
                </div>
                <div className="burger-menu" onClick={updateMenu}>
                    <div className={burger_class}></div>
                    <div className={burger_class}></div>
                    <div className={burger_class}></div>
                </div>
            </nav>
            <div className={menu_class}>
                <div className="navWrap">
                    <ul className="flex flex-col gap-10 uppercase font-bold text-2xl">
                        <li>
                            <Link to="/" onClick={updateMenu}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/coaches" onClick={updateMenu}>
                                Coaches
                            </Link>
                        </li>
                        <li>Pricing</li>
                        <li>Photos</li>
                        <li>Details</li>
                        <li>Contact</li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export { Nav };
