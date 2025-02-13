import { useMemo } from 'react';
import { MeshStandardMaterial } from 'three';
import { Vector3 } from '@react-three/fiber';

interface SphereObjectProps {
  position?: Vector3;
  radius?: number;
  widthSegments?: number;
  heightSegments?: number;
  color?: string;
  opacity?: number;
}

// ✅ 공유할 Material을 생성하여 메모리 최적화
const sharedMaterial = new MeshStandardMaterial({ transparent: true });

const SphereObject = ({
  position = [0, 0, 0],
  radius = 1,
  widthSegments = 16, // ✅ 세그먼트 수 감소하여 성능 개선
  heightSegments = 16,
  color = 'white',
  opacity = 1,
}: SphereObjectProps) => {
  // ✅ useMemo를 활용하여 동일한 재질을 재사용
  const material = useMemo(() => {
    sharedMaterial.color.set(color);
    sharedMaterial.opacity = opacity;
    return sharedMaterial;
  }, [color, opacity]);

  return (
    <mesh position={position} material={material}>
      <sphereGeometry args={[radius, widthSegments, heightSegments]} />
    </mesh>
  );
};

export default SphereObject;
