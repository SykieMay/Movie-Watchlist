export default function MovieCard({
  id,
  title,
  poster,
  year,
  genre,
  rating,
  watched,
  onToggleWatched,
  onDelete
}) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img
          src={poster}
          alt={title}
          className="w-full h-80 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {title}
          {rating >= 8 && (
            <div className="badge badge-warning ml-2">Top Rated</div>
          )}
        </h2>
        <p className="text-sm opacity-70">
          {genre} • {year}
        </p>
        <p className="text-sm">
          ⭐ {rating}
        </p>
        <div className="card-actions justify-end mt-2">
          <button
            type="button"
            onClick={() => onToggleWatched(id)}
            className={`btn btn-sm ${watched ? "btn-success" : "btn-ghost"}`}
          >
            {watched ? "Watched ✓" : "Unwatched"}
          </button>
          <button
            onClick={() => onDelete(id)}
            className="btn btn-sm btn-error"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
}
