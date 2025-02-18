import { useEffect, useMemo } from 'react';
import { Plane } from '@react-three/drei';
import SphereObject from '../Objects/SphereObject.tsx';

interface FullyConnectedProps {
  inputSize: number;
  outputSize: number;
  position?: [number, number, number];
  color?: string;
}

const FullyConnected = ({
  inputSize,
  outputSize,
  position = [0, 0, 0],
  color = 'red',
}: FullyConnectedProps) => {
  const gap = 1.5;
  const maxVisibleNeurons = 20;

  const getVisibleIndices = (totalNeurons: number) => {
    if (totalNeurons <= maxVisibleNeurons) return [...Array(totalNeurons).keys()];
    const step = totalNeurons / maxVisibleNeurons;
    return Array.from({ length: maxVisibleNeurons }, (_, i) => Math.round(i * step));
  };

  const inputNeurons = useMemo(() => {
    const visibleIndices = getVisibleIndices(inputSize);
    return visibleIndices.map((i, index) => (
      <SphereObject
        key={`input-${i}`}
        position={[
          position[0] - 2,
          position[1] - (index - (visibleIndices.length - 1) / 2) * gap,
          position[2] - 2,
        ]}
        radius={0.5}
        color="blue"
      />
    ));
  }, [inputSize, position]);

  const outputNeurons = useMemo(() => {
    const visibleIndices = getVisibleIndices(outputSize);
    return visibleIndices.map((i, index) => (
      <SphereObject
        key={`output-${i}`}
        position={[
          position[0] + 4,
          position[1] - (index - (visibleIndices.length - 1) / 2) * gap,
          position[2] - 2,
        ]}
        radius={0.6}
        color={color}
      />
    ));
  }, [outputSize, position, color]);

  // 🟦 반투명 직사각형 (Sphere 범위에 맞춤)
  const planeWidth = 8; // 너비를 기존보다 약간 늘림
  const planeHeight =
    Math.max(
      inputSize <= maxVisibleNeurons ? inputSize : maxVisibleNeurons,
      outputSize <= maxVisibleNeurons ? outputSize : maxVisibleNeurons,
    ) *
      gap +
    1;

  const transparentPlane = (
    <Plane
      args={[planeWidth, planeHeight]} // width, height
      position={[position[0] + 1, position[1], position[2] - 2.1]}
      rotation={[0, 0, 0]}
    >
      <meshStandardMaterial
        attach="material"
        color="lightgray"
        transparent
        opacity={0.2} // 반투명도
        depthWrite={false}
      />
    </Plane>
  );

  return (
    <group position={position}>
      {transparentPlane}
      {inputNeurons}
      {outputNeurons}
    </group>
  );
};

export default FullyConnected;
