import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Default function
export default function CheeseDetails() {
  const [cheese, setCheese] = useState([]);
  const { id } = useParams();

  // Data Loader
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/cheeses/" + id);
        const result = await response.json();
        console.log(result);
        setCheese(result);
      } catch (error) {
        console.error("Error fetching cheese", error);
      }
    };
    fetchData();
  }, [id]);

  // Data formatting
  return (
    <div className="details">
      <div className="details-info">
        <h1>{cheese.name}</h1>
        <p>Price: ${cheese.price}</p>
        <ul>
          <li>Origin: {cheese.origin}</li>
          <li>Colour: {cheese.colour}</li>
          <li>Milk type: {cheese.milk}</li>
          <li>Texture: {cheese.texture}</li>
        </ul>
      </div>
      <div className="details-photo">
        <img src={cheese.photo} alt={cheese.name} />
      </div>
    </div>
  );
}
