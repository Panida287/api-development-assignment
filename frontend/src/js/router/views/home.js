import { renderMovies } from "@/js/ui/movie/display.js";
import { getDirectors, getCategories } from "@/js/api/movie/read.js";

renderMovies();
getDirectors();
getCategories();
populateDropdowns()

export async function populateDropdowns() {
    try {
        const directors = await getDirectors();
        const categoriesResponse = await getCategories();
        const categories = categoriesResponse.categories;

        const directorDropdown = document.getElementById("director-dropdown");
        const categoryDropdown = document.getElementById("category-dropdown");

        const directorInput = document.getElementById("director-input");
        const categoryInput = document.getElementById("category-input");

        directorInput.innerHTML = '<option value="" disabled selected>Choose Director</option>';
        categoryInput.innerHTML = '<option value="" disabled selected>Choose Category</option>';

        directorDropdown.innerHTML = '<option value="">All Directors</option>';
        categoryDropdown.innerHTML = '<option value="">All Categories</option>';


        directors.forEach((director) => {
            const option = document.createElement("option");
            option.value = director.name;
            option.textContent = director.name;
            directorDropdown.appendChild(option);
            directorInput.appendChild(option);
        });

        categories.forEach((category) => {
            const option = document.createElement("option");
            option.value = category.category_name;
            option.textContent = category.category_name;
            categoryDropdown.appendChild(option);
            categoryInput.appendChild(option);
        });
    } catch (error) {
        console.error("Error populating dropdowns:", error);
    }
}

const filterButton = document.getElementById("filter-button")
filterButton.addEventListener("click", (e) => {
    e.preventDefault();
    const category = document.getElementById("category-dropdown").value;
    const director = document.getElementById("director-dropdown").value;
    renderMovies(director, category);
})

