import React, { useState, useEffect } from 'react';

const Distance = ({ selectedPoints }) => {
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (selectedPoints.length === 2) {
      const [point1, point2] = selectedPoints;
      const dx = point2.x - point1.x;
      const dy = point2.y - point1.y;
      const dz = point2.z - point1.z;
      const distance = Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2);
      setDistance(distance);
    } else {
      setDistance(0);
    }
  }, [selectedPoints]);

  return (
    <div>
      <h2>Distance Calculator</h2>
      {selectedPoints.length === 2 && (
        <p>
          Distance between points: {distance.toFixed(2)} units
        </p>
      )}
    </div>
  );
};

export default Distance;
