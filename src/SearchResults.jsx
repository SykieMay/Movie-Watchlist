import { getPosterUrl } from "../api/tmdb";

const SearchResults = ({ results, onAdd, isLoading, error }) => {
  if (isLoading) {
    return <p>Loading movies...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Search Results
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((movie) => (
          <div
            key={movie.id}
            className="card bg-base-100 shadow-xl"
          >
            <figure>
              <img
                src={getPosterUrl(movie.poster_path)}
                alt={movie.title}
              />
            </figure>

            <div className="card-body">
              <h3 className="card-title">
                {movie.title}
              </h3>

              <p>
                {movie.release_date?.slice(0, 4) || "N/A"}
                {" • "}
                ⭐ {movie.vote_average?.toFixed(1) || "—"}
              </p>

              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() => onAdd(movie)}
                >
                  Add to Watchlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;