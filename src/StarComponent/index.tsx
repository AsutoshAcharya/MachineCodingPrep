import { useState } from "react";
const totalStars: Array<number> = Array.from(
  { length: 10 },
  (_d, idx) => idx + 1
);
const StarComponent = () => {
  console.log(totalStars);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [rating, setRating] = useState(0);
  return (
    <div className="container">
      <div
        style={{
          marginTop: "auto",
          marginBottom: "auto",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",

          gap: "10px",
        }}
        onMouseOut={() => setHoveredStar(0)}
      >
        {totalStars.map((star, idx) => (
          <div
            style={{
              fontSize: 30,
              cursor: "pointer",
              color:
                hoveredStar >= star || (rating >= star && hoveredStar === 0)
                  ? "yellow"
                  : "black",
              transition: "color 0.4s ease-in-out",
            }}
            onMouseOver={() => setHoveredStar(star)}
            onClick={() => setRating(star)}
          >
            ★
          </div>
        ))}
      </div>
    </div>
  );
};

export default StarComponent;
