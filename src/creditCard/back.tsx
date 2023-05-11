import { RectangleRounded, card } from "./lib";
import { useTexture } from "@react-three/drei";

const Back: React.FC = () => {
  const [backGraphic] = useTexture([
    "/materials/richard-horvath-cPccYbPrF-A-unsplash.jpg",
  ]);

  return (
    <mesh
      rotation={[0, Math.PI, 0]}
      position={[card.width / 2, card.height / 2, -0.005]}
      geometry={RectangleRounded(card.width, card.height, card.radius, 32)}
    >
      <meshStandardMaterial
        flatShading
        map={backGraphic}
        metalness={0.1}
        roughness={0.2}
      />
    </mesh>
  );
};

export default Back;
