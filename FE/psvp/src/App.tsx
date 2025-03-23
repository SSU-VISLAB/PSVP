import './App.css';
import CNN from './pages/CNN.tsx';
import cnnConfig from './data/cnn/complexDummy.json';

// 레이어 타입별 색상 매핑 함수
const mapLayerTypeToColor = (type: string) => {
  switch (type) {
    case 'Conv2d':
      return '#0033FF';
    case 'MaxPool2d':
      return '#00CC66';
    case 'Flatten':
      return '#AA00FF';
    case 'Linear':
      return '#FF0000';
    default:
      return '#888888';
  }
};

// 레이어 타입 정의 (타입스크립트 인터페이스)
interface LayerInfo {
  id: number;
  type: string;
  in_channels?: number;
  out_channels?: number;
  kernel_size?: [number, number]; // 반드시 두 개의 숫자로 구성된 배열
  stride?: [number, number];
  padding?: [number, number];
  bias?: boolean;
  num_features?: number;
  eps?: number;
  momentum?: number;
  affine?: boolean;
  track_running_stats?: boolean;
  inplace?: boolean;
  in_features?: number; // Linear 전용
  out_features?: number; // Linear 전용
  layerSize: [number, number, number]; // 반드시 `[number, number, number]` 형식
  nChannels: number;
  color: string;
  gap: number;
  label: string;
}

// CNN 레이어 데이터 가공
const cnnLayers: LayerInfo[] = cnnConfig.map((layer, index, array) => {
  let inFeatures: number | undefined = layer.in_features;
  const outFeatures = layer.out_features;

  // 🚀 Flatten 이후 첫 Linear 레이어의 `in_features` 자동 설정
  if (layer.type === 'Linear' && inFeatures === undefined) {
    const lastConvLayer = array
      .slice(0, index) // Flatten 이전까지의 레이어를 찾음
      .reverse()
      .find((l) => l.type === 'Conv2d');

    if (lastConvLayer && lastConvLayer.out_channels) {
      inFeatures = lastConvLayer.out_channels; // Conv2d의 out_channels를 in_features로 사용
    } else {
      inFeatures = 256; // 기본값 256
    }
  }

  return {
    id: layer.id,
    type: layer.type,
    in_channels: layer.in_channels,
    out_channels: layer.out_channels,
    kernel_size: layer.kernel_size as [number, number] | undefined,
    stride: layer.stride as [number, number] | undefined,
    padding: layer.padding as [number, number] | undefined,
    bias: layer.bias,
    num_features: layer.num_features,
    eps: layer.eps,
    momentum: layer.momentum,
    affine: layer.affine,
    track_running_stats: layer.track_running_stats,
    inplace: layer.inplace,
    in_features: inFeatures,
    out_features: outFeatures,
    layerSize: [
      layer.kernel_size ? layer.kernel_size[0] : 1,
      layer.kernel_size ? layer.kernel_size[1] : 1,
      0.2,
    ] as [number, number, number], // `[number, number, number]`로 강제 변환
    nChannels: layer.out_channels || layer.num_features || 1,
    color: mapLayerTypeToColor(layer.type),
    gap: 0.5,
    label: `${layer.type} ${layer.id ?? ''}`,
  };
});

function App() {
  return <CNN layers={cnnLayers} gapBetweenLayers={5} />;
}

export default App;
