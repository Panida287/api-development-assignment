import { API_MOVIES, API_DIRECTORS, API_CATEGORIES } from "@/js/api/constants.js";
import * as querystring from "node:querystring";

export async function getMovies( director = null, category = null, limit = null ) {
    try {
        const params = []
        if (director) params.push(`director=${encodeURIComponent(director)}`);
        if (category) params.push(`category=${encodeURIComponent(category)}`);
        if (limit) params.push(`limit=${limit}`);

        const queryString = params.length > 0 ? `?${params.join("&")}` : '';

        const response = await fetch(`${API_MOVIES}${queryString}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();

    } catch (error) {
        throw error;
    }
}

export async function getDirectors( gender = null ) {
    try {
        const params = new URLSearchParams();
        const response = await fetch(`${API_DIRECTORS}?${params.toString()}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (gender) {
            params.append("gender", gender);
        }

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    } catch (error) {
        throw error;
    }
}

export async function getCategories() {
    try {

        const response = await fetch(API_CATEGORIES, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    } catch (error) {
        throw error;
    }
}