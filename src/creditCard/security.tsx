import { Text3D } from "@react-three/drei";
import React, { Suspense } from "react";

const Security: React.FC<{ cvc: string }> = ({ cvc }) => {
  return (
    <Suspense fallback={null}>
      <Text3D
        rotation={[0, Math.PI, 0]}
        position={[33, 30.5, -0.015]}
        font={"/courier_prime_regular.json"}
        size={3}
        height={0}
      >
        {cvc}
        <meshStandardMaterial color={"black"} />
      </Text3D>
    </Suspense>
  );
};

export default Security;
