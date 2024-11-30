import React, { useState } from "react";
import Navbar from "./Navbar";
import image1 from "../assets/music1.jpg";
import image2 from "../assets/music2.jpg";
import image3 from "../assets/music3.jpg";
import image4 from "../assets/music4.jpg";

const AboutUs: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

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

  const cardStyle = (bgImage: string, isExpanded: boolean) => ({
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: isExpanded ? "brightness(0.6)" : "brightness(1)",
    width: isExpanded ? "300px" : "150px",
    height: isExpanded ? "350px" : "250px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: isExpanded ? "1.2rem" : "1rem",
    fontWeight: "bold",
    color: "white",
    textShadow: `-1px -1px 2px black,
    1px -1px 2px black,  
    -1px 1px 2px black,  
    1px 1px 2px black 
  `,
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "all 0.3s ease",
    cursor: "pointer",
    textAlign: "center" as const,
  });

  const messages = [
    "A scripting language is sometimes referred to as a very high-level programming language if it operates at a high level of abstraction, or as a control language.",
    "SQL is a fourth-generation language, meaning it is a scripting language that does not require compiling to run. Like most fourth-generation languages, SQL requires an interpreter that translates rather than compiles code.",
    "Ease of use. Although Python has a straightforward syntax, SQL is more beginner-friendly, has fewer concepts, and is easier to learn.",
    "This is a placeholder message for Container 4. Customize this message as needed.",
  ];
  const images = [image1, image2, image3, image4];

  return (
    <div>
      <Navbar />
      <div style={containerStyle}>
        <h1 style={headerStyle}>ABOUT US</h1>
        <div style={cardContainerStyle}>
          {images.map((image, index) => (
            <div
              key={index}
              style={cardStyle(image, expandedCard === index)}
              onClick={() =>
                setExpandedCard(expandedCard === index ? null : index)
              }
            >
              {expandedCard === index
                ? messages[index]
                : `Container ${index + 1}`}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
