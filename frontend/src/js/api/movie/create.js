import { API_MOVIES } from "@/js/api/constants.js";
import { getToken } from "@/js/utils/getToken.js";

export async function createMovie(title, year, category, director) {
    try {

        const token = await getToken();

        const response = await fetch(API_MOVIES, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ title, year, category, director }),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to create movie: ${response.status} ${errorMessage}`);
        }

        const result = await response.json();
        console.log("Movie created successfully:", result);
        return result;

    } catch (error) {
        console.error("Error during creating movie:", error);
        throw error;
    }
}
