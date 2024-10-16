import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Cheeses() {
  const [cheeses, setCheeses] = useState([]);

  // Data Loader
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/cheeses");
        const result = await response.json();
        console.log(result);
        setCheeses(result);
      } catch (error) {
        console.error("Error fetching cheese", error);
      }
    };
    fetchData();
  }, []);

  // Data formatting
  return (
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
  );
}
