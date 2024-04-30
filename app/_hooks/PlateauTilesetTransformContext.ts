'use client';

import { createContext } from 'react';

export const PlateauTilesetTransformContext = createContext({
  setCenter: (center: Vector3): void => {},
});
