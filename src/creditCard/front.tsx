import { RectangleRounded, card } from "./lib";
import { useTexture } from "@react-three/drei";

const Front: React.FC = () => {
  const frontGraphic = useTexture(
    "/materials/richard-horvath-cPccYbPrF-A-unsplash.jpg"
  );

  return (
    <mesh
      position={[card.width / 2, card.height / 2, card.depth + 0.105]}
      geometry={RectangleRounded(card.width, card.height, card.radius, 32)}
    >
      <meshStandardMaterial
        flatShading
        map={frontGraphic}
        metalness={0.1}
        roughness={0.2}
      />
    </mesh>
  );
};

export default Front;
