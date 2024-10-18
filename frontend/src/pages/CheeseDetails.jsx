/**
 * Page for formatting indiviudal cheese details
 *
 * @author Nikolah McWin
 * October 2024
 *
 * NOTE:
 *  Shouldn't hardcode API URL
 *  Likely could separate out the fetchData to make it reusable
 *  No conditional rendering or loading used
 *  This whole page should probably be a child route in Cheeses too
 */

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const API_ENDING = "/cheeses";
const API_URL_CHEESES = `${API_URL}${API_ENDING}`;

// Default export function
export default function CheeseDetails() {
  const [cheese, setCheese] = useState([]);
  const { id } = useParams();

  // Use effect loader
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL_CHEESES}/${id}`);
        const result = await response.json();
        setCheese(result);
      } catch (error) {
        console.error("Error fetching cheese", error);
      }
    };
    fetchData();
  }, [id]);

  // Format cheeese data
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
