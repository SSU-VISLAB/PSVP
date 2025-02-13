interface CollapsedFiltersProps {
  position: [number, number, number];
  rotation?: [number, number, number]; // 회전값 (예: [x, y, z])
  layerSize: [number, number, number];
  nCollapsed: number; // 생략된 필터 개수
  computedGap: number;
  compressionFactor: number; // 압축 비율: 1이면 압축 없음, 0에 가까울수록 더 압축됨
  color?: string;
}

const CollapsedFilters = ({
  position,
  rotation = [0, 0, 0],
  layerSize,
  nCollapsed,
  computedGap,
  compressionFactor,
  color = 'gray',
}: CollapsedFiltersProps) => {
  const [width, height, depth] = layerSize;
  // 생략된 필터들이 있다면, 깊이를 압축 비율에 따라 조정합니다.
  const collapsedDepth = depth + (nCollapsed - 1) * (depth + computedGap) * compressionFactor;

  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={[width, height, collapsedDepth]} />
      <meshStandardMaterial color={color} opacity={0.7} transparent />
    </mesh>
  );
};

export default CollapsedFilters;
