import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Coaches } from "./pages/Coaches";
import { Nav } from "./components/nav";
const App = () => {
    return (
        <>
            <Nav></Nav>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/coaches" element={<Coaches />}></Route>
            </Routes>
        </>
    );
};

export default App;
