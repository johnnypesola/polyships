export interface ShipGeometry {
  x: number;
  y: number;
  rotation: number;
}

export interface Coords {
  x: number;
  y: number;
}

export interface Movement {
  isAccelerating: boolean;
  isDeAccelerating: boolean;
  isTurningLeft: boolean;
  isTurningRight: boolean;
}
