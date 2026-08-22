import { useState } from "react";

const AddMovieForm = ({ onAddMovie }) => {
    const [title, setTitle] = useState("");
    const [poster, setPoster] = useState("");
    const [genre, setGenre] = useState("");
    const [year, setYear] = useState("");
    const [rating, setRating] = useState(5);

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddMovie({
            id: Date.now(),
            title,
            poster,
            genre,
            year: Number(year),
            rating: Number(rating),
            watched: false,
        });
         // TODO: reset all inputs back to their initial values
    };
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Movie title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                type="text"
                placeholder="Poster URL"
                value={poster}
                onChange={(e) => setPoster(e.target.value)}
            />

            <input
                type="text"
                placeholder="Genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
            />

            <input
                type="number"
                placeholder="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
            />

            <input
                type="number"
                min="1"
                max="10"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
            />
            
            {/* TODO: inputs bound to value + onChange */}
            <button type="submit" className="btn btn-primary">Add Movie</button>
        </form>
     );
};
export default AddMovieForm;
