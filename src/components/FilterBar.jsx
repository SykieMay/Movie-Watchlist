export default function FilterBar({
  currentFilter,
  onChangeFilter,
}) {
  return (
    <div className="flex gap-2 mb-6">
      <button
        onClick={() => onChangeFilter("all")}
        className={`btn ${
          currentFilter === "all"
            ? "btn-primary"
            : "btn-ghost"
        }`}
      >
        
        All
      </button>

      <button
        onClick={() => onChangeFilter("watched")}
        className={`btn ${
          currentFilter === "watched"
            ? "btn-primary"
            : "btn-ghost"
        }`}
      >
        Watched
      </button>

      <button
        onClick={() => onChangeFilter("unwatched")}
        className={`btn ${
          currentFilter === "unwatched"
            ? "btn-primary"
            : "btn-ghost"
        }`}
      >
        Unwatched
      </button>
    </div>
  );
}