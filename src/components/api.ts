import { ShipGeometry } from "../types";

export const moveShipForward = (g: ShipGeometry): ShipGeometry => {
  const rot = g.rotation - 90; // Adjust rotation offset.
  const dis = 5;
  const x = g.x + dis * Math.cos((rot * Math.PI) / 180);
  const y = g.y + dis * Math.sin((rot * Math.PI) / 180);
  return { ...g, x, y };
};

export const turnShipLeft = (g: ShipGeometry) => {
  return {
    ...g,
    rotation: g.rotation - 5
  };
};

export const turnShipRight = (g: ShipGeometry) => {
  return {
    ...g,
    rotation: g.rotation + 5
  };
};
