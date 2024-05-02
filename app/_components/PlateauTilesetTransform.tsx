'use client';

import { useFrame } from '@react-three/fiber';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Camera, Group, Quaternion, Vector3 } from 'three';
import { PlateauTilesetTransformContext } from '../_hooks/PlateauTilesetTransformContext';
import { PlateauTilesetTransformProps } from '../_types/PlateauTilesetTransformProps';

type Keys = {
  w: boolean;
  a: boolean;
  s: boolean;
  d: boolean;
  ArrowLeft: boolean;
  ArrowRight: boolean;
};

export const PlateauTilesetTransform: React.FC<PlateauTilesetTransformProps> = ({
  children,
  setCameraPosition,
}) => {
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

  // キー入力を管理するための状態を追加します。
  const [keys, setKeys] = useState<Keys>({
    w: false,
    a: false,
    s: false,
    d: false,
    ArrowLeft: false,
    ArrowRight: false,
  });

  // キーイベントのハンドラを設定します。
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key in keys) {
        setKeys((prevKeys) => ({ ...prevKeys, [event.key]: true }));
      }
    },
    [keys],
  );

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (event.key in keys) {
        setKeys((prevKeys) => ({ ...prevKeys, [event.key]: false }));
      }
    },
    [keys],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  const cameraHolder = useRef<Group>(null);

  const moveCamera = useCallback(
    (camera: Camera, moveSpeed: number, rotateSpeed: number) => {
      // w,a,s,dでカメラの位置を変更する
      if (keys.w) {
        camera.position.z -= moveSpeed;
      }
      if (keys.s) {
        camera.position.z += moveSpeed;
      }
      if (keys.a) {
        camera.position.x -= moveSpeed;
      }
      if (keys.d) {
        camera.position.x += moveSpeed;
      }

      // ArrowLeft, ArrowRightでカメラの視野を左右に動かす

      if (keys.ArrowLeft) {
        cameraHolder.current?.rotateY(rotateSpeed);
      }
      if (keys.ArrowRight) {
        cameraHolder.current?.rotateY(-rotateSpeed);
      }
    },
    [keys],
  );

  useFrame(({ camera }) => {
    moveCamera(camera, 0.1, 0.000000000001);
    setCameraPosition(camera.position);
    console.log(keys);
  });

  return (
    <PlateauTilesetTransformContext.Provider value={context}>
      <group position={offset} quaternion={rotation} ref={cameraHolder}>
        {children}
      </group>
    </PlateauTilesetTransformContext.Provider>
  );
};
