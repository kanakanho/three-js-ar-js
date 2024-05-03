import React from 'react';

type ThreeLightProps = {
  cameraPosition: { x: number; y: number; z: number };
};

export const ThreeLight: React.FC<ThreeLightProps> = ({ cameraPosition }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        name='directionalLight'
        position={[cameraPosition.x, cameraPosition.y, cameraPosition.z]}
        intensity={1}
        castShadow
        shadow-mapSize={[8192, 8192]}
      >
        <orthographicCamera attach='shadow-camera' args={[-2500, 2500, 2500, -2500, 1, 5000]} />
        {/* constructor(left?: number, right?: number, top?: number, bottom?: number, near?: number, far?: number); */}
      </directionalLight>
    </>
  );
};
