import { Route, Routes } from "react-router-dom";
import { Coaches } from "./pages/Coaches";
import { Home } from "./pages/Home";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/coaches" element={<Coaches />}></Route>
        </Routes>
    );
}

export default App;
