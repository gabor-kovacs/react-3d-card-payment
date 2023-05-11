import { card } from "./lib";
import { useTexture } from "@react-three/drei";
import { creditCardType } from "./lib";

const Logo: React.FC<{ cardType: creditCardType }> = ({ cardType }) => {
  const [amex, mastercard, visa] = useTexture([
    "/icons/american-express.png",
    "/icons/mastercard.png",
    "/icons/visa.png",
  ]);

  return cardType ? (
    <>
      <mesh
        rotation={[0, 0, 0]}
        position={[card.width - 15, card.height - 10, card.depth + 0.02]}
      >
        <planeBufferGeometry args={[22, 13]} />
        <meshStandardMaterial
          transparent
          map={
            cardType === "amex"
              ? amex
              : cardType === "mastercard"
              ? mastercard
              : visa
          }
          metalness={0.1}
          roughness={0.2}
        />
      </mesh>
      <mesh rotation={[0, Math.PI, 0]} position={[15, 10, -0.2]}>
        <planeBufferGeometry args={[22, 13]} />
        <meshStandardMaterial
          transparent
          map={
            cardType === "amex"
              ? amex
              : cardType === "mastercard"
              ? mastercard
              : visa
          }
          metalness={0.1}
          roughness={0.2}
        />
      </mesh>
    </>
  ) : (
    <></>
  );
};
export default Logo;
