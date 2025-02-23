import './App.css';
import CNN from './pages/CNN.tsx';
import cnnConfig from './data/cnn/complexDummy.json';

// JSON 데이터에서 필요한 정보를 추출하여 시각화를 위한 데이터로 변환
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

const cnnLayers = cnnConfig.map((layer, index, array) => {
  let inFeatures = layer.in_features ?? null;
  const outFeatures = layer.out_features ?? null;

  // 🚀 Flatten 이후 첫 Linear 레이어의 `in_features` 자동 설정
  if (layer.type === 'Linear' && inFeatures === null) {
    const lastConvLayer = array
      .slice(0, index) // Flatten 이전까지의 레이어를 찾음
      .reverse()
      .find((l) => l.type === 'Conv2d');

    if (lastConvLayer) {
      inFeatures = lastConvLayer.out_channels ?? 256; // 기본값 256
    }
  }

  return {
    ...layer, // 기존 데이터 유지
    type: layer.type,
    layerSize: [
      layer.kernel_size ? layer.kernel_size[0] : 1,
      layer.kernel_size ? layer.kernel_size[1] : 1,
      0.2,
    ],
    nChannels: layer.out_channels || layer.num_features || 1,
    in_features: inFeatures ?? 256, // 기본값 설정
    out_features: outFeatures ?? 10, // 기본값 설정
    color: mapLayerTypeToColor(layer.type),
    gap: 0.2,
    label: layer.type + (layer.id ? ` ${layer.id}` : ''),
  };
});

function App() {
  return <CNN layers={cnnLayers} gapBetweenLayers={5} />;
}

export default App;
