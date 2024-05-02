import { useFrame } from '@react-three/fiber';
import { useCallback, useEffect, useState } from 'react';
import * as THREE from 'three';

type Keys = {
  w: boolean;
  a: boolean;
  s: boolean;
  d: boolean;
};

export const UseChangeCamera = () => {
  // キー入力を管理するための状態を追加します。
  const [keys, setKeys] = useState<Keys>({
    w: false,
    a: false,
    s: false,
    d: false,
  });

  // キーイベントのハンドラを設定します。
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key in keys) {
        // console.log('Key:', event.key);
        setKeys((prevKeys) => ({ ...prevKeys, [event.key]: true }));
      }
    },
    [keys],
  );

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (event.key in keys) {
        // console.log('Key:', event.key);
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

  const [position, setPosition] = useState<THREE.Vector3>(new THREE.Vector3(0, 12, 0));

  useEffect(() => {
    // console.log('Position:', position);
  }, [position]);

  useFrame(({ camera }) => {
    // w,a,s,dでカメラの位置を変更する
    const moveSpeed = 1;
    // 入力が1回あったら x,z方向に1ずつ移動する
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
    // カメラの位置と回転を更新する
    setPosition(camera.position.clone());
  });
};
