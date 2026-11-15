import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./home";
import PopularMovies from "./PopularMovies";

export default function App() {
    return (
        <div>
            {/* <Navbar /> */}
            <Home/>

            <Routes>
               
                <Route path="/popular" element={<PopularMovies />} />
            </Routes>
        </div>
    );
}