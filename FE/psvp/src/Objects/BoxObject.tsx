// BoxObject.tsx
import { useMemo } from 'react';
import { MeshStandardMaterial } from 'three';

interface BoxObjectProps {
  position?: [number, number, number]; // [x, y, z] 형태의 3D 위치
  size?: [number, number, number]; // [width, height, depth] 형태의 크기
  color?: string; // 박스 색상
  rotation?: [number, number, number]; // 회전값 (예: [x, y, z])
}

const BoxObject = ({ position, size, color, rotation = [0, 0, 0] }: BoxObjectProps) => {
  // ⚡ useMemo로 material을 캐싱
  const material = useMemo(
    () => new MeshStandardMaterial({ color, transparent: true, opacity: 1 }),
    [color],
  );

  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={size} />
      <primitive attach="material" object={material} />
    </mesh>
  );
};

export default BoxObject;
