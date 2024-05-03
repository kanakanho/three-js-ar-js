'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { Quaternion, Vector3 } from 'three';
import { PlateauTilesetTransformContext } from '../_hooks/PlateauTilesetTransformContext';
import { PlateauTilesetTransformProps } from '../_types/PlateauTilesetTransformProps';

export const PlateauTilesetTransform: React.FC<PlateauTilesetTransformProps> = ({ children }) => {
  const [{ offset, rotation }, setState] = useState<{
    offset?: Vector3;
    rotation?: Quaternion;
  }>({});

  const setCenter = useCallback((center: Vector3) => {
    const direction = center.clone().normalize();
    const up = new Vector3(0, 1, 0);
    const rotation = new Quaternion();
    rotation.setFromUnitVectors(direction, up);
    setState({
      offset: new Vector3(0, -center.length(), 0),
      rotation,
    });
  }, []);

  const context = useMemo(() => ({ setCenter }), [setCenter]);

  return (
    <PlateauTilesetTransformContext.Provider value={context}>
      <group position={offset} quaternion={rotation}>
        {children}
      </group>
    </PlateauTilesetTransformContext.Provider>
  );
};
