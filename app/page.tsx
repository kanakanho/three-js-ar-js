'use client';

import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, SSAO } from '@react-three/postprocessing';
import { XR, ARButton } from '@react-three/xr';
import React, { useState } from 'react';
import { Vector3 } from 'three';
import { PlateauTileset } from './_components/PlateauTileset';
import { PlateauTilesetTransform } from './_components/PlateauTilesetTransform';

const Home: React.FC = () => {
  const [cameraPosition, setCameraPosition] = useState<Vector3>(new Vector3(1050, 10000, -250));

  return (
    <>
      <ARButton />
      <Canvas>
        <XR>
          <PerspectiveCamera makeDefault position={cameraPosition} near={1} far={1e5} />
          <OrbitControls target={cameraPosition} />
          <directionalLight
            position={[cameraPosition.x, cameraPosition.y + 100, cameraPosition.z]}
            intensity={1}
            castShadow
            shadow-mapSize={[8192, 8192]}
          >
            <orthographicCamera attach='shadow-camera' args={[-2500, 2500, 2500, -2500, 1, 5000]} />
          </directionalLight>
          <PlateauTilesetTransform setCameraPosition={setCameraPosition}>
            {/* <PlateauTileset path='bldg/23100_nagoya/23101_chikusa-ku/notexture' /> */}
            <PlateauTileset path='bldg/23100_nagoya/23102_higashi-ku/notexture' center />
          </PlateauTilesetTransform>
          <EffectComposer>
            <SSAO intensity={5000} />
          </EffectComposer>
        </XR>
      </Canvas>
    </>
  );
};

export default Home;
