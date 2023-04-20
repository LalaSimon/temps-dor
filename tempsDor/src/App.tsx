import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Account } from "./pages/Account";
import { Nav } from "./components/Nav";
const App = () => {
    return (
        <>
            <Nav></Nav>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/account" element={<Account />}></Route>
            </Routes>
        </>
    );
};

export default App;
