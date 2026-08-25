import Layout from "./layouts/Layout";
import MovieList from "./components/MovieList";
import moviesData from "./data/movies";
import { useState, useEffect } from "react";
import AddMovieForm from "./components/AddMovieForm";
import FilterBar from "./components/FilterBar";
import SummaryBar from "./components/SummaryBar";
import { searchMovies, toWatchlistMovie } from "./api/tmdb";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";


export default function App() {
  const [movies, setMovies] = useState(() => {
    const saved = localStorage.getItem("movies");
    return saved ? JSON.parse(saved) : moviesData;
  });

  const handleToggleWatched = (id) => {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === id
          ? { ...movie, watched: !movie.watched }
          : movie
      )
    );
  };

  const handleDeleteMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  const handleAddMovie = (newMovie) => {
    setMovies([...movies, newMovie]);
  };

  const [filter, setFilter] = useState(() => {
    return localStorage.getItem("filter") || "all";
  });

  const handleClearAll = () => {
    if (confirm("Clear your entire watchlist? This cannot be undone.")) {
      setMovies([]);
    }
  };

  const handleAddFromSearch = (tmdbMovie) => {
    // Avoid adding duplicate movies
    if (movies.some((movie) => movie.id === tmdbMovie.id)) {
      return;
    }

    // Transform the TMDB movie into your watchlist format
    const watchlistMovie = toWatchlistMovie(tmdbMovie);

    // Add the movie to the watchlist
    setMovies([...movies, watchlistMovie]);
  };


  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  useEffect(() => {
    document.title = `Movie Watchlist (${movies.length})`;
  }, [movies.length]);

  useEffect(() => {
    localStorage.setItem("filter", filter);
  }, [filter]);


  const visibleMovies = movies.filter((movie) => {
    if (filter === "watched") return movie.watched;
    if (filter === "unwatched") return !movie.watched;
    return true;
  });


  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Don't fetch when the search term is empty
    if (!searchTerm) return;

    let isCancelled = false;

    const fetchResults = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const movies = await searchMovies(searchTerm);

        if (!isCancelled) {
          setResults(movies);
        }
      } catch (err) {
        if (!isCancelled) {
          setError("Failed to fetch movies. Try again.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchResults();

    // Ignore stale response if the user searches again
    return () => {
      isCancelled = true;
    };
  }, [searchTerm]);



  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Watchlist</h1>
        <p className="opacity-70">
          A collection of movies I've watched and want to watch.
        </p>
      </div>
 
      <SearchBar onSearch={setSearchTerm} />
      <SearchResults
        results={results}
        onAdd={handleAddFromSearch}
        isLoading={isLoading}
        error={error}
      />
      <hr className="my-6" />

      <SummaryBar movies={movies}/>

      <button className="btn btn-error btn-sm" onClick={handleClearAll}>
        Clear All
      </button>

      <AddMovieForm onAddMovie={handleAddMovie} />

      <FilterBar
        currentFilter={filter}
        onChangeFilter={setFilter}
      />

      <MovieList
        movies={visibleMovies}
        onToggleWatched={handleToggleWatched}
        onDelete={handleDeleteMovie}
      />
    </Layout>
  );
}