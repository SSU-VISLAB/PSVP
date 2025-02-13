import { useEffect, useMemo } from 'react';
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

  useEffect(() => {
    console.log(
      `🧠 FullyConnected Layer Debug → inputSize: ${inputSize}, outputSize: ${outputSize}, position: ${position}`,
    );
  }, [inputSize, outputSize, position]);

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

  return (
    <group position={position}>
      {inputNeurons}
      {inputSize > maxVisibleNeurons && (
        <SphereObject
          key="input-ellipsis"
          position={[
            position[0] - 2,
            position[1] - ((maxVisibleNeurons - 1) / 2 + 1) * gap,
            position[2] - 2,
          ]}
          radius={0.3}
          color="gray"
        />
      )}
      {outputNeurons}
      {outputSize > maxVisibleNeurons && (
        <SphereObject
          key="output-ellipsis"
          position={[
            position[0] + 4,
            position[1] - ((maxVisibleNeurons - 1) / 2 + 1) * gap,
            position[2] - 2,
          ]}
          radius={0.3}
          color="gray"
        />
      )}
    </group>
  );
};

export default FullyConnected;
