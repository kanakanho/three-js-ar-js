'use client';

import React from 'react';

type ThreeLightProps = {
  cameraPosition: { x: number; y: number; z: number };
};

export const ThreeLight: React.FC<ThreeLightProps> = ({ cameraPosition }) => {
  return (
    <>
      <ambientLight intensity={2} />
      <directionalLight
        position={[cameraPosition.x, cameraPosition.y + 200, cameraPosition.z]}
        intensity={2}
        castShadow
        shadow-mapSize={[8192, 8192]}
      >
        <orthographicCamera attach='shadow-camera' args={[-2500, 2500, 2500, -2500, 1, 5000]} />
      </directionalLight>
    </>
  );
};
