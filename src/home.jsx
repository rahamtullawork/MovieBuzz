
import { useState } from "react";
import Navbar from "./Navbar";
import "./PopularMovies.css";

export default function Home() {

    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [searched, setSearched] = useState(false);
    const [searchedTerm, setSearchedTerm] = useState("");

    const api_key = "fa5204d5c025730f7a471a85850a21e7";
    const image_url = "https://image.tmdb.org/t/p/w500";

    // Search all matching movies from TMDB
    async function searchMovies(e) {

        e.preventDefault();

        const query = searchTerm.trim();

        if (query === "") {
            setMovies([]);
            setSearched(false);
            setError(null);
            return;
        }

        setSearched(false);
        setMovies([]);
        setError(null);
        setSearchedTerm(query);

        try {

            // Fetch first page
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${encodeURIComponent(query)}&page=1`
            );

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();

            let allMovies = data.results || [];

            // TMDB supports a maximum of 500 pages
            const totalPages = Math.min(data.total_pages || 0, 500);

            // Fetch remaining pages in batches of 10
            for (let page = 2; page <= totalPages; page += 10) {

                const requests = [];

                const endPage = Math.min(page + 9, totalPages);

                for (let p = page; p <= endPage; p++) {

                    requests.push(
                        fetch(
                            `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${encodeURIComponent(query)}&page=${p}`
                        ).then(response => {

                            if (!response.ok) {
                                throw new Error(`Error: ${response.status}`);
                            }

                            return response.json();
                        })
                    );
                }

                const results = await Promise.all(requests);

                results.forEach(result => {
                    allMovies = [...allMovies, ...(result.results || [])];
                });
            }

            setMovies(allMovies);
            setSearched(true);

            console.log("All Movies:", allMovies);
            console.log("Total Movies:", allMovies.length);

        } catch (err) {

            setError(err.message);
            setSearched(true);
            setMovies([]);

        }
    }

    return (
        <div>

            <Navbar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={searchMovies}
            />

            <div className="container-fluid search-results-container my-4">

                {searched && (

                    <>

                        <h2 className="fw-bold text-primary mb-4">
                            Search Results for "{searchedTerm}"
                        </h2>

                        {error && (
                            <div className="alert alert-danger text-center">
                                {error}
                            </div>
                        )}

                        {!error && movies.length === 0 && (
                            <div className="alert alert-warning text-center">
                                No Movies Found.....
                            </div>
                        )}

                        {!error && movies.length > 0 && (

                            <>
                                <p className="text-muted">
                                    {movies.length} movies found
                                </p>

                                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">

                                    {movies.map((i) => (

                                        <div className="col" key={i.id}>

                                            <div className="card h-100 shadow-sm movie-card border-0">

                                                <div className="card-img-wrapper position-relative overflow-hidden">

                                                    <img
                                                        src={
                                                            i.poster_path
                                                                ? `${image_url}${i.poster_path}`
                                                                : "https://via.placeholder.com/500x750?text=No+Image"
                                                        }
                                                        className="card-img-top img-fluid"
                                                        alt={i.title}
                                                        loading="lazy"
                                                    />

                                                    <div className="rating-badge position-absolute top-0 end-0 bg-dark text-warning p-2 m-2 rounded-circle fw-bold shadow">
                                                        ★ {i.vote_average
                                                            ? i.vote_average.toFixed(1)
                                                            : "N/A"}
                                                    </div>

                                                </div>

                                                <div className="card-body d-flex flex-column justify-content-between">

                                                    <div>
                                                        <h5 className="card-title text-truncate">
                                                            {i.title}
                                                        </h5>

                                                        <p className="card-text text-muted small mb-2">
                                                            {i.release_date
                                                                ? i.release_date.split("-")[0]
                                                                : "N/A"}
                                                        </p>

                                                        <p className="card-text movie-overview">
                                                            {i.overview}
                                                        </p>
                                                    </div>

                                                    <button className="btn btn-outline-primary btn-sm w-100 mt-3">
                                                        View Details
                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    ))}

                                </div>
                            </>
                        )}

                    </>

                )}

            </div>
        </div>
    );
}
