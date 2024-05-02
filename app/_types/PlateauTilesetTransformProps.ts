import { ReactNode } from 'react';
import { Vector3 } from 'three';

export interface PlateauTilesetTransformProps {
  // eslint-disable-next-line no-unused-vars
  setCameraPosition: (position: Vector3) => void;
  children: ReactNode;
}
