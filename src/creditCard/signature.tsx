import { RectangleRounded, card } from "./lib";
import { useTexture } from "@react-three/drei";

const Signature: React.FC = () => {
  const [signature] = useTexture(["/materials/signature.png"]);

  return (
    <mesh
      rotation={[0, Math.PI, 0]}
      position={[card.width / 2, card.height / 2, -0.01]}
      geometry={RectangleRounded(card.width, card.height, card.radius, 32)}
    >
      <meshStandardMaterial
        flatShading
        transparent
        map={signature}
        roughness={0.4}
      />
    </mesh>
  );
};
export default Signature;
