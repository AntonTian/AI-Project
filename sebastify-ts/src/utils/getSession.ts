import axios from "axios";

export const BackendUrl = process.env.REACT_APP_BACKEND_URL;

export const getSession = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return false;
    }
    
    try {
        const session = await axios.get(`${BackendUrl}/api/auth/session`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        console.log("Session:", session.data.claims);
        return session; // Only set true if session is valid
    } catch (error) {
        if (axios.isAxiosError(error)) {
        console.error("Error:", error.response || error.message); // Log detailed error
        } else {
        console.error("Error:", error);
        }
        return false;
    }
}