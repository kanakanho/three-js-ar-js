import { Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef, useState } from 'react';
import { ColorRepresentation, Group, Plane, Raycaster, Vector3 } from 'three';

export const Illuminator: React.FC<{
  elevation?: number;
  color?: ColorRepresentation;
}> = ({
  elevation = 100,
  color = '#ff9f46', // T = 2500K
}) => {
  const ref = useRef<Group>(null);
  const [raycaster] = useState(() => new Raycaster());
  const [plane] = useState(() => new Plane(new Vector3(0, 1, 0)));
  plane.constant = -elevation;

  useFrame(({ camera, mouse }) => {
    if (ref.current == null) {
      return;
    }
    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(plane, ref.current.position);
    // console.log(ref.current.position)
  });

  return (
    <group ref={ref}>
      <pointLight
        distance={1000}
        intensity={2}
        color={color}
        castShadow
        shadow-radius={20}
        shadow-mapSize={[2048, 2048]}
      />
      <Sphere args={[5, 32]}>
        <meshStandardMaterial emissive={color} emissiveIntensity={10} />
      </Sphere>
    </group>
  );
};
