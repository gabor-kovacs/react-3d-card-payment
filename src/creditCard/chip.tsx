import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { chip, card } from "./lib";

const Chip: React.FC = () => {
  const chipShape = new THREE.Shape();

  const extrudeSettings = {
    steps: 2,
    depth: card.depth,
    bevelEnabled: false,
  };

  chipShape.moveTo(chip.offsetX, chip.offsetY + chip.radius);
  chipShape.lineTo(chip.offsetX, chip.offsetY + chip.height - chip.radius);
  chipShape.absarc(
    chip.offsetX + chip.radius,
    chip.offsetY + chip.height - chip.radius,
    chip.radius,
    1,
    2,
    true
  );
  chipShape.lineTo(
    chip.offsetX + chip.width - chip.radius,
    chip.offsetY + chip.height
  );
  chipShape.absarc(
    chip.offsetX + chip.width - chip.radius,
    chip.offsetY + chip.height - chip.radius,
    chip.radius,
    Math.PI / 2,
    0,
    true
  );
  chipShape.lineTo(chip.offsetX + chip.width, chip.offsetY + chip.radius);
  chipShape.absarc(
    chip.offsetX + chip.width - chip.radius,
    chip.offsetY + chip.radius,
    chip.radius,
    0,
    (Math.PI / 2) * 3,
    true
  );
  chipShape.lineTo(chip.offsetX + chip.radius, chip.offsetY);
  chipShape.absarc(
    chip.offsetX + chip.radius,
    chip.offsetY + chip.radius,
    chip.radius,
    (Math.PI / 2) * 3,
    Math.PI,
    true
  );

  const [chip_texture, chip_bw] = useTexture([
    "/materials/chip.jpg",
    "/materials/chip_bw.jpg",
  ]);
  chip_texture.wrapS = chip_texture.wrapT = THREE.RepeatWrapping;
  chip_texture.repeat.set(0.105, 0.105);
  chip_texture.offset.set(0.925, 0.34);
  chip_bw.wrapS = chip_bw.wrapT = THREE.RepeatWrapping;
  chip_bw.repeat.set(0.105, 0.105);
  chip_bw.offset.set(0.925, 0.34);

  return (
    <mesh position={[0, 0, 0.05]}>
      <extrudeGeometry attach="geometry" args={[chipShape, extrudeSettings]} />
      <meshStandardMaterial
        map={chip_texture}
        metalness={0.7}
        roughness={2}
        roughnessMap={chip_bw}
      />
    </mesh>
  );
};

export default Chip;
