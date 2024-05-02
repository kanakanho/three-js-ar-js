'use client';

import { PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, SSAO } from '@react-three/postprocessing';
import { XR, ARButton } from '@react-three/xr';
import React from 'react';
import { PlateauTileset } from './_components/PlateauTileset';
import { PlateauTilesetTransform } from './_components/PlateauTilesetTransform';

const Home: React.FC = () => {
  return (
    <>
      <ARButton />
      <Canvas>
        <XR>
          <PerspectiveCamera makeDefault position={[0, 12, 0]} near={10} far={1e5} />
          <directionalLight
            position={[500, 1000, 1000]}
            intensity={1}
            castShadow
            shadow-mapSize={[8192, 8192]}
          >
            <orthographicCamera attach='shadow-camera' args={[-2500, 2500, 2500, -2500, 1, 5000]} />
          </directionalLight>
          <PlateauTilesetTransform>
            <PlateauTileset path='bldg/23100_nagoya/23101_chikusa-ku/notexture' />
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
