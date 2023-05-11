import { Text3D } from "@react-three/drei";
import React, { Suspense } from "react";
import { ChromeMaterial } from "./lib";

const CardNumber: React.FC<{ cardNumber: string }> = ({ cardNumber }) => {
  return (
    <Suspense fallback={null}>
      <Text3D
        position={[8, 17, 0.5]}
        font={"/courier_prime_regular.json"}
        size={4.4}
        height={0.2}
        bevelEnabled
        bevelOffset={-0.2}
        bevelSize={0.4}
        bevelThickness={0.4}
      >
        {cardNumber}
        <ChromeMaterial />
      </Text3D>
    </Suspense>
  );
};

export default CardNumber;
