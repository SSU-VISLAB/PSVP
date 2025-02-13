import { useMemo } from 'react';
import BoxObject from '../Objects/BoxObject.tsx';

interface FlattenProps {
  inputSize: number; // Flatten할 Feature Map의 총 개수
  position?: [number, number, number]; // 위치
  color?: string;
}

const Flatten = ({ inputSize, position = [0, 0, 0], color = 'blue' }: FlattenProps) => {
  // 🔥 Flatten 된 뉴런 간격 설정
  const flattenGap = useMemo(() => Math.max(0.2, 5 / Math.sqrt(inputSize)), [inputSize]);

  const neurons = useMemo(() => {
    return Array.from({ length: inputSize }, (_, i) => (
      <BoxObject
        key={i}
        position={[position[0] - i * flattenGap, position[1], position[2]]} // 가로로 배치
        size={[0.5, 0.5, 0.5]}
        color={color}
      />
    ));
  }, [inputSize, position, flattenGap, color]);

  return <>{neurons}</>;
};

export default Flatten;
