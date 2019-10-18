import React from "react";
import { Coords, ShipGeometry } from "../types";

interface ShipProps {
  color: string;
  geometry: ShipGeometry;
}

const Ship: React.FC<ShipProps> = ({ color, geometry }) => {
  const { x, y, rotation } = geometry;
  const height = 20;
  const width = height / 1.5;
  const center: Coords = { x: x + width / 2, y: y + height / 2 };

  const pointsArray = [
    [0, height],
    [width / 2, 0],
    [width, height],
    [width / 2, height - height / 5]
  ].map(c => [c[0] + x, c[1] + y]);
  const points = pointsArray.join(",");

  return (
    <polygon
      transform={`rotate(${rotation}, ${center.x}, ${center.y})`}
      points={points}
      fill={color}
    ></polygon>
  );
};

export default Ship;
