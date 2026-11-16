import React, { useEffect, useState } from 'react';
import './PopularMovies.css';

export default function MovieGrid({ title, endpoint }) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const api_key = "fa5204d5c025730f7a471a85850a21e7";
    const image_url = 'https://image.tmdb.org/t/p/w500';

    useEffect(() => {
        setPage(1); 
    }, [endpoint]);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://api.themoviedb.org/3/${endpoint}?api_key=${api_key}&language=en-US&page=${page}`);

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setMovies(data.results);
                setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [page, endpoint, api_key]);

    return (
        <div className="container-fluid moviebuzz-wrapper px-4 px-lg-5 py-5">
            <div className='container'>
                {/* Header Banner Section */}
                <div className='d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 pb-3 border-bottom border-secondary border-opacity-25 gap-3'>
                    <div>
                        <h2 className='fw-extrabold text-white display-6 mb-0'>{title}</h2>
                    </div>
                    <div className="badge-pill-container px-3 py-2 rounded-pill bg-dark border border-secondary border-opacity-50 text-light shadow-sm">
                        Page <span className="text-danger fw-bold">{page}</span> of {totalPages}
                    </div>
                </div>

                {loading && (
                    <div className='d-flex justify-content-center align-items-center my-5 py-5'>
                        <div className='spinner-border text-danger spinner-lg' role="status" style={{ width: '3rem', height: '3rem' }}>
                            <span className='visually-hidden'>Loading....</span>
                        </div>
                    </div>
                )}

                {error && (
                    <div className='alert alert-danger text-center shadow-lg border-0 rounded-4 p-4' role='alert'>
                        <h5 className="alert-heading fw-bold">Oops! Something went wrong</h5>
                        <p className="mb-0">{error}</p>
                    </div>
                )}

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
                                                alt={movie.title || movie.name}
                                                loading="lazy"
                                            />
                                            <div className="rating-badge position-absolute top-0 end-0 m-3 px-2 py-1 rounded-pill fw-bold shadow">
                                                ★ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                                            </div>
                                            <div className="card-gradient-overlay"></div>
                                        </div>
                                        <div className="card-body d-flex flex-column justify-content-between p-4">
                                            <div>
                                                <div className="d-flex justify-content-between align-items-center mb-1">
                                                    <span className="text-muted small fw-semibold">
                                                        {movie.release_date ? movie.release_date.split('-')[0] : (movie.first_air_date ? movie.first_air_date.split('-')[0] : 'N/A')}
                                                    </span>
                                                </div>
                                                <h5 className="card-title fw-bold text-truncate mb-2" title={movie.title || movie.name}>
                                                    {movie.title || movie.name}
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

                        {/* Pagination Controls */}
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
    );
}