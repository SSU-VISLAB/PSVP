import { useMemo } from 'react';
import { MeshStandardMaterial } from 'three';
import { Vector3 } from '@react-three/fiber';

interface ChipObjectProps {
  position?: Vector3;
  radius?: number;
  height?: number; // ✅ Chip 형태를 위한 높이 조절
  color?: string;
  opacity?: number;
}

// ✅ 공유할 Material을 생성하여 메모리 최적화
const sharedMaterial = new MeshStandardMaterial({ transparent: true });

const ChipObject = ({
  position = [0, 0, 0],
  radius = 1,
  height = 0.1, // ✅ 얇은 원반 형태 (기본값 0.1)
  color = 'white',
  opacity = 1,
}: ChipObjectProps) => {
  // ✅ useMemo를 활용하여 동일한 재질을 재사용
  const material = useMemo(() => {
    sharedMaterial.color.set(color);
    sharedMaterial.opacity = opacity;
    return sharedMaterial;
  }, [color, opacity]);

  return (
    <mesh position={position} rotation={[Math.PI / 2, 0, 0]} material={material}>
      {/* ✅ Sphere 대신 Cylinder 사용 → 얇은 Chip 형태로 만듦 */}
      <cylinderGeometry args={[radius, radius, height, 32]} />
    </mesh>
  );
};

export default ChipObject;
