import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./home";
import PopularMovies from "./PopularMovies";
import TrendingMovies from "./TrendingMovies";
import TopRated from "./TopRated";
import OnTv from "./OnTv";
import TVTopRated from "./TVTopRated";
import TVPopular from "./TVPopular";

export default function App() {
    return (
        <div>
            {/* <Navbar /> */}
            <Home/>

            <Routes>
               
                <Route path="/popular" element={<PopularMovies />} />
                <Route path="/trending" element={<TrendingMovies />} />
                <Route path="/top-rated" element={<TopRated/>} />
                <Route path="/on-tv" element={<OnTv />}/>
                <Route path="/tv-top-rated" element={<TVTopRated />} />
                <Route path="/tv-popular" element={<TVPopular />} />
                
            </Routes>
        </div>
    );
}
