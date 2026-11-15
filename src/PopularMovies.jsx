import React, { useEffect, useState } from 'react'
import './PopularMovies.css'

export default function PopularMovies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const api_key = "fa5204d5c025730f7a471a85850a21e7";
    const image_url = 'https://image.tmdb.org/t/p/w500';

    useEffect(() => {
        const fetchPopularMovies = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=${page}`);
                console.log(response)

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                console.log(data)
                setMovies(data.results);
                setTotalPages(data.total_pages);
            }
            catch (err) {
                setError(err.message)
            } finally {
                setLoading(false);
            }
        };
        fetchPopularMovies();
    }, [page, api_key])

    return (
        <div className='container my-5'>
              {/* ADD CAROUSEL HERE */}
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
        </div>




            <div className='d-flex justify-content-between align-items-center mb-4'>
                <h2 className='fw-bold text-primary'>Popular Movies</h2>
                <span className='badge bg-secondary fs-6'>Page {page} of {totalPages}</span>
            </div>

            {
                loading && (
                    <div className='d-flex justify-contnet-center my-5'>
                        <div className='spinner-border text-primary' role="status">
                            <span className='visually-hidden'>Loading....</span>
                        </div>
                    </div>
                )
            }


            {
                error && (
                    <div className='alert alert-danger text-center' role='alert'>{error}</div>
                )
            }
            {!loading && !error && (
                <>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                        {movies.map((movie) => (
                            <div className="col" key={movie.id}>
                                <div className="card h-100 shadow-sm movie-card border-0">
                                    <div className="card-img-wrapper position-relative overflow-hidden">
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
                                        <div className="rating-badge position-absolute top-0 end-0 bg-dark text-warning p-2 m-2 rounded-circle fw-bold shadow">
                                            ★ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                                        </div>
                                    </div>
                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <div>
                                            <h5 className="card-title text-truncate" title={movie.title}>
                                                {movie.title}
                                            </h5>
                                            <p className="card-text text-muted small mb-2">
                                                {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
                                            </p>
                                            <p className="card-text movie-overview">
                                                {movie.overview}
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

                    {/* Pagination Controls */}
                    <div className="d-flex justify-content-center align-items-center gap-3 mt-5">
                        <button
                            className="btn btn-primary"
                            disabled={page <= 1 || loading}
                            onClick={() => setPage((prev) => prev - 1)}
                        >
                            &laquo; Previous
                        </button>
                        <span className="fw-semibold">Page {page}</span>
                        <button
                            className="btn btn-primary"
                            disabled={page >= totalPages || loading}
                            onClick={() => setPage((prev) => prev + 1)}
                        >
                            Next &raquo;
                        </button>
                    </div>
                </>
            )}

        </div>
    )
}
