import { PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useCallback, useEffect, useState } from 'react';
import { Camera, Vector3 } from 'three';

type ThreeCameraProps = {
  cameraPosition: Vector3;
  setCameraPosition: React.Dispatch<React.SetStateAction<Vector3>>;
};

type Keys = {
  w: boolean;
  a: boolean;
  s: boolean;
  d: boolean;
  ArrowLeft: boolean;
  ArrowRight: boolean;
  ArrowUp: boolean;
  ArrowDown: boolean;
};

export const ThreeCamera: React.FC<ThreeCameraProps> = ({ cameraPosition, setCameraPosition }) => {
  // キー入力を管理するための状態を追加します。
  const [keys, setKeys] = useState<Keys>({
    w: false,
    a: false,
    s: false,
    d: false,
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
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

  const moveCamera = useCallback(
    (camera: Camera, moveSpeed: number, rotateSpeed: number) => {
      // w,a,s,dでカメラの位置を変更する
      if (keys.w) {
        camera.position.add(new Vector3(0, 0, -moveSpeed).applyQuaternion(camera.quaternion));
      }
      if (keys.s) {
        camera.position.add(new Vector3(0, 0, moveSpeed).applyQuaternion(camera.quaternion));
      }
      if (keys.a) {
        camera.position.add(new Vector3(-moveSpeed, 0, 0).applyQuaternion(camera.quaternion));
      }
      if (keys.d) {
        camera.position.add(new Vector3(moveSpeed, 0, 0).applyQuaternion(camera.quaternion));
      }

      // ArrowLeft, ArrowRightでカメラの視野を左右に動かす

      if (keys.ArrowLeft) {
        camera.rotateY(rotateSpeed);
      }
      if (keys.ArrowRight) {
        camera.rotateY(-rotateSpeed);
      }
      if (keys.ArrowUp) {
        camera.rotateX(rotateSpeed/10);
      }
      if (keys.ArrowDown) {
        camera.rotateX(-rotateSpeed/10);
      }
    },
    [keys],
  );

  useFrame(({ camera }) => {
    moveCamera(camera, 0.5, 0.1);
    setCameraPosition(camera.position);
  });

  return <PerspectiveCamera makeDefault position={cameraPosition} near={1} far={1000} />;
};
