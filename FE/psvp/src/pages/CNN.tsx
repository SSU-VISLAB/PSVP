import { Canvas } from '@react-three/fiber';
import { OrthographicCamera, GizmoHelper, GizmoViewport } from '@react-three/drei';
import CameraController from '../components/CameraController';
import Layer from '../components/Layer.tsx';
import Flatten from '../components/Flatten.tsx';
import FullyConnected from '../components/FullyConnected.tsx';
import { CNNProps } from '../types/cnn.ts';
import { useMemo } from 'react';

const CNN = ({ layers, gapBetweenLayers = 6 }: CNNProps) => {
  // ✅ 기본 간격 증가
  const processedLayers = useMemo(() => {
    let lastChannels = 3;
    let currentX = 0;

    return layers.map((layer, index) => {
      let Component = null;
      const defaultWidth = 5; // ✅ 기본 너비 설정

      if (layer.type === 'Conv2d' && typeof layer.out_channels !== 'undefined') {
        lastChannels = layer.out_channels;
      }

      if (layer.type === 'Conv2d' || layer.type === 'MaxPool2d') {
        Component = (
          <group key={index} position={[currentX, 0, 0]}>
            <Layer {...layer} nChannels={lastChannels} layoutOffset={[currentX, 0, 0]} />
          </group>
        );
        currentX += (layer.layerSize?.[0] || defaultWidth) + gapBetweenLayers * 1.3; // ✅ 간격을 더 증가
      } else if (layer.type === 'Flatten') {
        Component = <Flatten key={index} inputSize={1} position={[currentX, 0, 0]} />;
        currentX += 8; // ✅ Flatten 이후 간격 증가
      } else if (layer.type === 'Linear') {
        Component = (
          <FullyConnected
            key={index}
            inputSize={layer.in_features || lastChannels}
            outputSize={layer.out_features || 1}
            position={[currentX, 0, 0]}
          />
        );
        currentX += 12; // ✅ Fully Connected 간격 조정
      }

      return Component;
    });
  }, [layers, gapBetweenLayers]);

  return (
    <Canvas style={{ width: '100%', height: '100vh' }} shadows={false}>
      <OrthographicCamera makeDefault zoom={3} position={[50, 40, 250]} near={0.1} far={1000} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />

      {/* 🎮 카메라 컨트롤 */}
      <CameraController />

      {/* 📌 Gizmo 클릭 충돌 방지 */}
      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport labelColor="white" />
      </GizmoHelper>

      {processedLayers}
    </Canvas>
  );
};
export default CNN;
