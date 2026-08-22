export default function MovieCard({ title, poster, year, genre, rating, watched }) {

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
          {watched ? (
            <div className="badge badge-success">Watched ✓</div>
          ) : (
            <div className="badge badge-ghost">Unwatched</div>
          )}
        </div>
      </div>
    </div>
  );
}
