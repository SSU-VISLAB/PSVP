import BoxObject from '../Objects/BoxObject';
import { useMemo } from 'react';

interface LayerProps {
  layerSize: [number, number, number];
  nChannels: number;
  color?: string;
  layoutOffset?: [number, number, number];
}

const Layer = ({ layerSize, nChannels, color = 'white', layoutOffset = [0, 0, 0] }: LayerProps) => {
  const maxVisibleFilters = 20;
  const visibleIndices = useMemo(() => {
    if (nChannels <= maxVisibleFilters) return [...Array(nChannels).keys()];
    const step = (nChannels - 1) / (maxVisibleFilters - 1);
    return Array.from({ length: maxVisibleFilters }, (_, i) => Math.round(i * step));
  }, [nChannels]);

  return (
    <group position={layoutOffset}>
      {visibleIndices.map((currentVisibleIndex, index) => {
        const posX = visibleIndices.length > 1 ? (index / (visibleIndices.length - 1)) * 20 : 0;
        return (
          <BoxObject
            key={`filter-${currentVisibleIndex}`}
            position={[posX, 0, 0]}
            rotation={[0, Math.PI / 2, 0]}
            size={layerSize}
            color={color}
          />
        );
      })}
    </group>
  );
};

export default Layer;
