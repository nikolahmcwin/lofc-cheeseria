/**
 * Page for formatting all cheese as a gallery
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
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
const API_ENDING = "/cheeses";
const API_URL_CHEESES = `${API_URL}${API_ENDING}`;

// Main export function
export default function Cheeses() {
  const [cheeses, setCheeses] = useState([]);

  // Use effect loader
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL_CHEESES);
        const result = await response.json();
        setCheeses(result);
      } catch (error) {
        console.error("Error fetching cheese", error);
      }
    };
    fetchData();
  }, []);

  // Format data
  return (
    <>
      <div>
        <h1>Our fine cheese gallery</h1>
        <div className="gallery">
          {cheeses.map((cheese) => (
            <div className="gallery-cheese" key={cheese.id}>
              <div className="gallery-photo">
                <Link to={`/cheeses/${cheese.id.toString()}`}>
                  <img src={cheese.photo} alt={cheese.name} />
                </Link>
              </div>
              <div className="gallery-info">
                <h2>
                  <Link to={`/cheeses/${cheese.id.toString()}`}>
                    {cheese.name}
                  </Link>
                </h2>
                <p>
                  A {cheese.colour.toLowerCase()} from {cheese.origin}.
                </p>
                <p> ${cheese.price} per kg.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
