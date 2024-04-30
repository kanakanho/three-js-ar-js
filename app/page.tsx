'use client';

import { OrbitControls, PerspectiveCamera, Plane } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, SSAO } from '@react-three/postprocessing';
import React from 'react';
import { PlateauTileset } from './_components/PlateauTileset';
import { PlateauTilesetTransform } from './_components/PlateauTilesetTransform';

const Home: React.FC = () => {
  return (
    <Canvas shadows>
      <fogExp2 attach='fog' color='white' density={0.0002} />
      <PerspectiveCamera makeDefault position={[-1600, 450, -1400]} near={10} far={1e5} />
      <OrbitControls target={[-1200, 0, -800]} />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[500, 1000, 1000]}
        intensity={1}
        castShadow
        shadow-mapSize={[8192, 8192]}
      >
        <orthographicCamera attach='shadow-camera' args={[-2500, 2500, 2500, -2500, 1, 5000]} />
      </directionalLight>
      {/* <Plane args={[1e5, 1e5]} position={[0, 12, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <meshStandardMaterial color='white' />
      </Plane> */}
      <PlateauTilesetTransform>
        <PlateauTileset path='bldg/13100_tokyo/13101_chiyoda-ku/notexture' center />
        <PlateauTileset path='bldg/13100_tokyo/13102_chuo-ku/notexture' />
        <PlateauTileset path='bldg/23100_nagoya/23101_chikusa-ku/notexture' />
        <PlateauTileset path='bldg/23100_nagoya/23102_higashi-ku/notexture' center />
      </PlateauTilesetTransform>
      <EffectComposer>
        <SSAO intensity={5000} />
      </EffectComposer>
    </Canvas>
  );
};

export default Home;
