
import { Link } from "react-router-dom";
import "./App.css";

export default function Navbar({ searchTerm, setSearchTerm, handleSearch }) {
  return (
    <nav className="navbar navbar-expand-lg movie-navbar" data-bs-theme="light">
      <div className="container-fluid">

        {/* MovieBuzz - Home Page */}
        <Link className="navbar-brand fw-bold" to="/popular">
          MovieBuzz
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          <ul className="navbar-nav ">

            {/* Movies Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Movies
              </a>

              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/trending">
                    Trending
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/top-rated">
                    Top Rated
                  </Link>
                </li>
              </ul>
            </li>

            {/* TV Shows Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                TV Shows
              </a>

              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/on-tv">
                    On TV
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/tv-top-rated">
                    Top Rated
                  </Link>
                </li>
              </ul>
            </li>

            {/* Popular Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Popular
              </a>

              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/popular">
                    Movies
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/tv-popular">
                    TV Shows
                  </Link>
                </li>
              </ul>
            </li>

          </ul>

          {/* Search Form */}
          <form
            className="d-flex navbar-search ms-auto"
            role="search"
            onSubmit={handleSearch}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search movies"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>

        </div>
      </div>
    </nav>
  );
}
