import { Text3D } from "@react-three/drei";
import React, { Suspense } from "react";
import { ChromeMaterial } from "./lib";

const Name: React.FC<{ name: string }> = ({ name }) => {
  return (
    <Suspense fallback={null}>
      <Text3D
        position={[6, 5, 0.5]}
        font={"/courier_prime_regular.json"}
        size={3}
        height={0.2}
        bevelEnabled
        bevelOffset={-0.2}
        bevelSize={0.4}
        bevelThickness={0.4}
      >
        {name}
        <ChromeMaterial />
      </Text3D>
    </Suspense>
  );
};

export default Name;
