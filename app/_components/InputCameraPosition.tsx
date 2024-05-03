'use client';

import React, { useState } from 'react';
import { Vector3 } from 'three';

type InputCameraPositionProps = {
  cameraPosition: Vector3;
  setCameraPosition: React.Dispatch<React.SetStateAction<Vector3>>;
};

export const InputCameraPosition: React.FC<InputCameraPositionProps> = ({
  cameraPosition,
  setCameraPosition,
}) => {
  const [tempPosition, setTempPosition] = useState<Vector3>(cameraPosition);

  const setTempPositionInput = (axis: 'x' | 'y' | 'z', value: string) => {
    const parsedValue = parseFloat(value);
    const newValue = isNaN(parsedValue) ? 0 : parsedValue;
    setTempPosition(
      (prev) =>
        new Vector3(
          axis === 'x' ? newValue : prev.x,
          axis === 'y' ? newValue : prev.y,
          axis === 'z' ? newValue : prev.z,
        ),
    );
  };

  // Enterキーでカメラの位置を変更します。
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setCameraPosition(tempPosition);
    }
  };

  return (
    <div style={{ position: 'absolute', zIndex: '1' }}>
      <input
        type='text'
        value={tempPosition.x}
        onChange={(e) => setTempPositionInput('x', e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <input
        type='text'
        value={tempPosition.y}
        onChange={(e) => setTempPositionInput('y', e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <input
        type='text'
        value={tempPosition.z}
        onChange={(e) => setTempPositionInput('z', e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={() => setCameraPosition(tempPosition)}>Set Camera Position</button>
    </div>
  );
};
