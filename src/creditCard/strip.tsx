import { RectangleRounded, card } from "./lib";
import { useTexture } from "@react-three/drei";

const Strip: React.FC = () => {
  const [strip] = useTexture(["/materials/strip.png"]);
  return (
    <mesh
      rotation={[0, Math.PI, 0]}
      position={[card.width / 2, card.height / 2, -0.03]}
      geometry={RectangleRounded(card.width, card.height, card.radius, 32)}
    >
      <meshStandardMaterial
        flatShading
        transparent
        map={strip}
        roughness={0.1}
      />
    </mesh>
  );
};
export default Strip;
