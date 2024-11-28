import React from "react";
import Navbar from "./Navbar";

const AboutUs: React.FC = () => {
    const containerStyle = {
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#1E1E2F", // Dark background
        color: "white",
        flexDirection: "column" as const,
    };

    const headerStyle = {
        fontSize: "3rem",
        marginBottom: "2rem",
    };

    const cardContainerStyle = {
        display: "flex",
        gap: "1rem",
    };

    const cardStyle = (bgColor: string) => ({
        backgroundColor: bgColor,
        width: "150px",
        height: "250px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "1rem",
        fontWeight: "bold",
        color: "black",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    });

    return (
        <div>
            <Navbar />
            <div style={containerStyle}>
                <h1 style={headerStyle}>ABOUT US</h1>
                <div style={cardContainerStyle}>
                    <div style={cardStyle("red")}>Container 1</div>
                    <div style={cardStyle("limegreen")}>Container 2</div>
                    <div style={cardStyle("yellow")}>Container 3</div>
                    <div style={cardStyle("cyan")}>Container 4</div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
