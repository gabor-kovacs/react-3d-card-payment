import * as THREE from "three";

import Body from "./body";
import Chip from "./chip";
import Front from "./front";
import Back from "./back";
import Strip from "./strip";
import Signature from "./signature";
import CardNumber from "./cardNumber";
import Expiry from "./expiry";
import Name from "./name";
import Security from "./security";

import { useSpring, animated, config } from "@react-spring/three";
import { card } from "./lib";
import { useFrame, useThree } from "@react-three/fiber";
import type { creditCardType } from "./lib";
import Logo from "./logo";
import { useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

interface props {
  name: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
  showBack: boolean;
  cardType: creditCardType;
}

const CreditCard: React.FC<props> = (props) => {
  const { name, cardNumber, expiry, cvc, showBack, cardType } = props;

  const { flip } = useSpring({ flip: showBack ? Math.PI : 0 });

  const [springs, api] = useSpring(
    () => ({
      scale: 1,
      position: [-card.width / 2, -card.height / 2, 0],
      rotation: [0, 0, 0],
      config: config.slow,
    }),
    []
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    api.start({
      position: [
        -card.width / 2 + state.mouse.x * -0.5,
        -card.height / 2 + state.mouse.y * -0.5,
        0,
      ],
      rotation: [
        Math.cos(t * 0.5) / 20 + state.mouse.y * -0.02,
        Math.sin(t * 0.7) / 20 + state.mouse.x * -0.01,
        Math.sin(t * 0.4) / 20,
      ],
    });
  });

  const { camera } = useThree();
  const smaller = useMediaQuery("(max-width:450px)");
  useEffect(
    () => void camera.position.set(0, 0, smaller ? 100 : 70),
    [camera.position, smaller]
  );

  return (
    <animated.mesh rotation-y={flip}>
      <animated.mesh
        position={springs.position as any as THREE.Vector3}
        rotation={springs.rotation as any as THREE.Euler}
        scale={springs.scale}
        onPointerEnter={() => api.start({ scale: 1.02 })}
        onPointerLeave={() => api.start({ scale: 1 })}
      >
        <Body baseColor={"#00ffff" as any as THREE.Color} />
        <Chip />
        <CardNumber cardNumber={cardNumber} />
        <Expiry expiry={expiry.replace(/\s/g, "")} />
        <Name name={name.toUpperCase()} />
        <Front />
        <Back />
        <Strip />
        <Signature />
        <Security cvc={cvc} />
        <Logo cardType={cardType} />
      </animated.mesh>
    </animated.mesh>
  );
};

export default CreditCard;
