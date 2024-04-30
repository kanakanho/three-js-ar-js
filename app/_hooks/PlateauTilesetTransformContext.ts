'use client';

import { createContext } from 'react';
import { Vector3 } from 'three';

export const PlateauTilesetTransformContext = createContext({
  // eslint-disable-next-line no-unused-vars
  setCenter: (center: Vector3): void => {},
});
