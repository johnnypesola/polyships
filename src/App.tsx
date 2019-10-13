import React, { useRef } from "react";
import "./App.css";
import styled from "styled-components";
import Ship from "./components/Ship";
import { Key } from "ts-key-enum";
import { ShipGeometry } from "./types";
import { moveShipForward, turnShipLeft, turnShipRight } from "./components/api";

interface Movement {
  isAccelerating: boolean;
  isDeAccelerating: boolean;
  isTurningLeft: boolean;
  isTurningRight: boolean;
}

const MainSvg = styled.svg`
  background: black;
`;

const App: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const movement = React.useRef<Movement>({
    isAccelerating: false,
    isDeAccelerating: false,
    isTurningLeft: false,
    isTurningRight: false
  });
  const [shipGeometry, setShipGeometry] = React.useState<ShipGeometry>({
    x: 50,
    y: 50,
    rotation: 0
  });

  const requestRef = React.useRef<number>(0);

  // Game loop
  const animate = () => {
    // The 'state' will always be the initial value here
    requestRef.current = requestAnimationFrame(animate);

    handleShipMovement();
  };

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // useEffect only runs once

  const handleShipMovement = () => {
    if (movement.current.isAccelerating)
      setShipGeometry(oldGeo => moveShipForward(oldGeo));

    if (movement.current.isTurningLeft)
      setShipGeometry(oldGeo => turnShipLeft(oldGeo));

    if (movement.current.isTurningRight)
      setShipGeometry(oldGeo => turnShipRight(oldGeo));
  };

  const handleOnKeyDown = (e: React.KeyboardEvent) => {
    e.preventDefault();
    if (e.key === Key.ArrowLeft) movement.current.isTurningLeft = true;
    if (e.key === Key.ArrowRight) movement.current.isTurningRight = true;
    if (e.key === Key.ArrowUp) movement.current.isAccelerating = true;
  };

  const handleOnKeyUp = (e: React.KeyboardEvent) => {
    e.preventDefault();
    if (e.key === Key.ArrowLeft) movement.current.isTurningLeft = false;
    if (e.key === Key.ArrowRight) movement.current.isTurningRight = false;
    if (e.key === Key.ArrowUp) movement.current.isAccelerating = false;
  };

  return (
    <div
      className="App"
      onKeyDown={handleOnKeyDown}
      onKeyUp={handleOnKeyUp}
      tabIndex={0}
    >
      <MainSvg
        ref={svgRef}
        viewBox={`0 0  550 450`}
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
      >
        <Ship color="green" geometry={shipGeometry} />
      </MainSvg>
    </div>
  );
};

export default App;
