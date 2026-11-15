import React, { useEffect, useState } from 'react';
import './PopularMovies.css';
import axios from 'axios';

export default function PopularMovies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const api_key = "fa5204d5c025730f7a471a85850a21e7";
    const image_url = 'https://image.tmdb.org/t/p/w500';

    useEffect(() => {
        fetchPopularMovies();
    }, [page]);

    function fetchPopularMovies() {
        setLoading(true);
        setError(null);

        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=${page}`)
            .then((res) => {
                setMovies(res.data.results);
                setTotalPages(res.data.total_pages);
                setLoading(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }).catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }

    return (
        <div className="moviebuzz-wrapper py-5">
            {/* <div className='container my-5'>
             
        <div id="carouselExampleSlidesOnly" className="carousel slide mb-5" data-bs-ride="carousel">

            <div className="carousel-inner">

                <div className="carousel-item active">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4GYLRilBBLvf63KbMjU3-WU73KfDk_yeeuY3wtZUwUg&s=10"
                        className="d-block w-100 "
                        alt="Movie Banner 1"
                    />
                </div>

                <div className="carousel-item">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRwSrkAi3A2ZZ2-63F4GAwt7pdq5FNM-jPyMMS7jOtiQ&s=10"
                        className="d-block w-100"
                        alt="Movie Banner 2"
                    />
                </div>

                <div className="carousel-item">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYrIRJU60fKv84L9X9UFI0IYfX4caAAHrhgqJzEAVcQg&s=10"
                        className="d-block w-100"
                        alt="Movie Banner 3"
                    />
                </div>

            </div>
        </div>*/}
            <div className='container'>
                {/* Header Banner Section */}
                <div className='d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 pb-3 border-bottom border-secondary border-opacity-25 gap-3'>
                    <div>
                        {/* <span className="text-danger fw-bold tracking-widest text-uppercase small">Trending Now</span> */}
                        <h2 className='fw-extrabold text-white display-6 mb-0'>Popular Movies</h2>
                    </div>
                    <div className="badge-pill-container px-3 py-2 rounded-pill bg-dark border border-secondary border-opacity-50 text-light shadow-sm">
                        Page <span className="text-danger fw-bold">{page}</span> of {totalPages}
                    </div>
                </div>

                {/* Loading Spinner */}
                {loading && (
                    <div className='d-flex justify-content-center align-items-center my-5 py-5'>
                        <div className='spinner-border text-danger spinner-lg' role="status" style={{ width: '3rem', height: '3rem' }}>
                            <span className='visually-hidden'>Loading....</span>
                        </div>
                    </div>
                )}

                {/* Error Alert */}
                {error && (
                    <div className='alert alert-danger text-center shadow-lg border-0 rounded-4 p-4' role='alert'>
                        <h5 className="alert-heading fw-bold">Oops! Something went wrong</h5>
                        <p className="mb-0">{error}</p>
                    </div>
                )}

                {/* Movies Grid */}
                {!loading && !error && (
                    <>
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                            {movies.map((movie) => (
                                <div className="col" key={movie.id}>
                                    <div className="card h-100 shadow movie-card border-0 bg-dark text-light rounded-4 overflow-hidden">
                                        <div className="card-img-wrapper position-relative">
                                            <img
                                                src={
                                                    movie.poster_path
                                                        ? `${image_url}${movie.poster_path}`
                                                        : 'https://via.placeholder.com/500x750?text=No+Image'
                                                }
                                                className="card-img-top img-fluid"
                                                alt={movie.title}
                                                loading="lazy"
                                            />
                                            {/* Cinematic Rating Badge */}
                                            <div className="rating-badge position-absolute top-0 end-0 m-3 px-2 py-1 rounded-pill fw-bold shadow">
                                                ★ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                                            </div>
                                            {/* Gradient Overlay Effect */}
                                            <div className="card-gradient-overlay"></div>
                                        </div>
                                        <div className="card-body d-flex flex-column justify-content-between p-4">
                                            <div>
                                                <div className="d-flex justify-content-between align-items-center mb-1">
                                                    <span className="text-muted small fw-semibold">
                                                        {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
                                                    </span>
                                                </div>
                                                <h5 className="card-title fw-bold text-truncate mb-2" title={movie.title}>
                                                    {movie.title}
                                                </h5>
                                                <p className="card-text movie-overview">
                                                    {movie.overview || 'No synopsis available for this title.'}
                                                </p>
                                            </div>
                                            <button className="btn btn-outline-light btn-sm w-100 mt-3 rounded-pill py-2 fw-semibold details-btn">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Modern Pagination Controls */}
                        <div className="d-flex justify-content-center align-items-center gap-3 mt-5 pt-4">
                            <button
                                className="btn btn-dark px-4 py-2 rounded-pill border border-secondary border-opacity-50 text-light fw-semibold page-btn"
                                disabled={page <= 1 || loading}
                                onClick={() => setPage((prev) => prev - 1)}
                            >
                                &laquo; Previous
                            </button>
                            <span className="text-light fw-bold px-3">Page {page} / {totalPages}</span>
                            <button
                                className="btn btn-danger px-4 py-2 rounded-pill fw-semibold page-btn shadow"
                                disabled={page >= totalPages || loading}
                                onClick={() => setPage((prev) => prev + 1)}
                            >
                                Next &raquo;
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}