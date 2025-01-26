import { createMovie } from "@/js/api/movie/create.js";

export async function onCreateMovie(event) {
    event.preventDefault();

    try {
        const title = document.getElementById('movie-title').value.trim();
        const year = document.getElementById('movie-year').value.trim();
        const category = document.getElementById('category-input').value.trim();
        const directorName = document.getElementById('director-input').value.trim();

        if (!title || !year || !category || !directorName) {
            throw new Error("All fields are required to create a movie.");
        }

        const director = {
            name: directorName,
        };

        const result = await createMovie(title, year, category, director);

        if (result) {
            alert("Movie created successfully.");
        } else {
            throw new Error("Failed to create the movie. Please try again.");
        }
    } catch (error) {
        console.error("Error during movie creation:", error);
        alert(`Error: ${error.message}`);
    }
}
