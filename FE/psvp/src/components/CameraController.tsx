import { useThree, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { OrbitControls } from '@react-three/drei';

const CameraController = () => {
  const { camera, gl } = useThree();
  const [isFirstPerson, setIsFirstPerson] = useState(false);
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const mouseMovement = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Shift') {
        setIsFirstPerson(true);
      }
      keysPressed.current[event.key.toLowerCase()] = true;
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Shift') {
        setIsFirstPerson(false);
      }
      keysPressed.current[event.key.toLowerCase()] = false;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isFirstPerson) return;
      mouseMovement.current.x = event.movementX * 0.002;
      mouseMovement.current.y = event.movementY * 0.002;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    gl.domElement.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      gl.domElement.removeEventListener('mousemove', handleMouseMove);
    };
  }, [gl, isFirstPerson]);

  useFrame(() => {
    if (!isFirstPerson) return;

    const speed = 2;
    const rotationSpeed = 0.05;

    if (keysPressed.current['w']) camera.position.z -= speed;
    if (keysPressed.current['s']) camera.position.z += speed;
    if (keysPressed.current['a']) camera.position.x -= speed;
    if (keysPressed.current['d']) camera.position.x += speed;
    if (keysPressed.current['q']) camera.position.y += speed;
    if (keysPressed.current['e']) camera.position.y -= speed;

    camera.rotation.y -= mouseMovement.current.x * rotationSpeed;
    camera.rotation.x -= mouseMovement.current.y * rotationSpeed;
    mouseMovement.current.x = 0;
    mouseMovement.current.y = 0;
  });

  return !isFirstPerson ? <OrbitControls makeDefault /> : null;
};

export default CameraController;
