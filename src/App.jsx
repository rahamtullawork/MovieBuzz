import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./home";
import PopularMovies from "./PopularMovies";
import TrendingMovies from "./TrendingMovies";
import TopRated from "./TopRated";

export default function App() {
    return (
        <div>
            {/* <Navbar /> */}
            <Home/>

            <Routes>
               
                <Route path="/popular" element={<PopularMovies />} />
                <Route path="/trending" element={<TrendingMovies />} />
                <Route path="/top-rated" element={<TopRated/>} />
            </Routes>
        </div>
    );
}
