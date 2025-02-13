export interface Layer {
  type: string; // 레이어의 유형 (e.g., "input", "conv", "pooling", "output")
  size: [number, number, number]; // 박스의 크기 (width, height, depth)
  color: string; // 레이어의 색상
  position: [number, number, number]; // 레이어의 위치 (x, y, z)
}

interface LayerInfo {
  layerSize: [number, number, number];
  nChannels: number;
  type: string;
  out_channels?: number;
  in_features?: number;
  out_features?: number;
}

export interface CNNProps {
  layers: LayerInfo[];
  gapBetweenLayers?: number;
}
