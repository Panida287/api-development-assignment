export async function getToken() {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("accessToken");

    if (!username || !token) {
        throw new Error('Please log in to create a movie');
    }

    return token;
}
