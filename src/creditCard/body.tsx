import * as THREE from "three";
import { card } from "./lib";

const Body: React.FC<{ baseColor: THREE.Color }> = ({ baseColor }) => {
  const extrudeSettings = {
    steps: 2,
    depth: card.depth,
    bevelEnabled: false,
  };

  const cardShape = new THREE.Shape();
  cardShape.moveTo(0, card.radius);
  cardShape.lineTo(0, card.height - card.radius);
  cardShape.absarc(
    card.radius,
    card.height - card.radius,
    card.radius,
    Math.PI,
    Math.PI / 2,
    true
  );
  cardShape.lineTo(card.width - card.radius, card.height);
  cardShape.absarc(
    card.width - card.radius,
    card.height - card.radius,
    card.radius,
    Math.PI / 2,
    0,
    true
  );
  cardShape.lineTo(card.width, card.radius);
  cardShape.absarc(
    card.width - card.radius,
    card.radius,
    card.radius,
    0,
    (Math.PI / 2) * 3,
    true
  );
  cardShape.lineTo(card.radius, 0);
  cardShape.absarc(
    card.radius,
    card.radius,
    card.radius,
    (Math.PI / 2) * 3,
    Math.PI,
    true
  );

  return (
    <mesh castShadow>
      <extrudeGeometry attach="geometry" args={[cardShape, extrudeSettings]} />
      <meshStandardMaterial
        color={baseColor ?? "#ffffff"}
        transparent
        roughness={0.5}
        metalness={0.5}
      />
    </mesh>
  );
};
export default Body;
