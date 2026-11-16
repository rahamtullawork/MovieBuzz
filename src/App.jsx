// import { Routes, Route } from "react-router-dom";
// import Navbar from "./Navbar";
// import Home from "./home";
// import PopularMovies from "./PopularMovies";
// import TrendingMovies from "./TrendingMovies";
// import TopRated from "./TopRated";
// import OnTv from "./OnTv";
// import TVTopRated from "./TVTopRated";
// import TVPopular from "./TVPopular";

// export default function App() {
//     return (
//         <div>
//             {/* <Navbar /> */}
//             <Home/>

//             <Routes>
               
//                 <Route path="/popular" element={<PopularMovies />} />
//                 <Route path="/trending" element={<TrendingMovies />} />
//                 <Route path="/top-rated" element={<TopRated/>} />
//                 <Route path="/on-tv" element={<OnTv />}/>
//                 <Route path="/tv-top-rated" element={<TVTopRated />} />
//                 <Route path="/tv-popular" element={<TVPopular />} />
                
//             </Routes>
//         </div>
//     );
// }


import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./home";
import MovieGrid from "./MovieGrid"; // Import the single reusable component!

export default function App() {
    return (
        <div>
            {/* <Navbar /> */}
            <Home />

            <Routes>
                <Route path="/popular" element={<MovieGrid title="Popular Movies" endpoint="movie/popular" />} />
                <Route path="/trending" element={<MovieGrid title="Trending Movies" endpoint="trending/movie/day" />} />
                <Route path="/top-rated" element={<MovieGrid title="Top Rated Movies" endpoint="movie/top_rated" />} />
                <Route path="/on-tv" element={<MovieGrid title="Currently Airing TV Shows" endpoint="tv/on_the_air" />} />
                <Route path="/tv-top-rated" element={<MovieGrid title="Top Rated TV Shows" endpoint="tv/top_rated" />} />
                <Route path="/tv-popular" element={<MovieGrid title="Popular TV Shows" endpoint="tv/popular" />} />
            </Routes>
        </div>
    );
}