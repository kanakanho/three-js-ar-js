'use client';

import { Canvas } from '@react-three/fiber';
import { EffectComposer, SSAO } from '@react-three/postprocessing';
import { XR, ARButton } from '@react-three/xr';
import React, { useState } from 'react';
import { Vector3 } from 'three';
import { PlateauTileset } from './_components/PlateauTileset';
import { PlateauTilesetTransform } from './_components/PlateauTilesetTransform';
import { ThreeCamera } from './_components/ThreeCamera';
import { ThreeLight } from './_components/ThreeLight';

const Home: React.FC = () => {
  const [cameraPosition, setCameraPosition] = useState<Vector3>(new Vector3(960, 12, -180));

  return (
    <>
      <ARButton />
      <Canvas>
        <XR>
          <fogExp2 attach='fog' color='white' density={0.0002} />
          <ThreeCamera cameraPosition={cameraPosition} setCameraPosition={setCameraPosition} />
          <ThreeLight cameraPosition={cameraPosition} />
          <PlateauTilesetTransform>
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
