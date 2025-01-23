import { getMovies } from "@/js/api/movie/read.js";

export async function renderMovies(director = null, category = null) {
    const template = document.getElementById("movies-template");
    const movieContainer = document.getElementById("movies-container");

    movieContainer.innerHTML = "";

    try {
        const movies = await getMovies(director, category);

        if (!movies || movies.length === 0) {
            movieContainer.innerHTML = "No movies found";
            return;
        }
        movies.forEach((movie) => {
            const movieClone = template.content.cloneNode(true);

            const movieTitle = movieClone.querySelector(".movie-title");
            if (movieTitle) movieTitle.textContent = movie.title;

            const movieYear = movieClone.querySelector(".movie-year");
            if (movieYear) movieYear.textContent = movie.year;

            const movieCategory = movieClone.querySelector(".movie-category");
            if (movieCategory) movieCategory.textContent = movie.category.category_name;

            const movieDirector = movieClone.querySelector(".movie-director");
            if (movieDirector) movieDirector.textContent = movie.director.name;

            movieContainer.appendChild(movieClone);
        });
    } catch (error) {
        movieContainer.innerHTML = "An error occurred while fetching movies.";
        console.error(error);
    }
}


