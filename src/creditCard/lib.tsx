import * as THREE from "three";

export type creditCardType = "visa" | "amex" | "mastercard" | undefined;

export const card = {
  width: 85.6,
  height: 53.98,
  depth: 0.76,
  radius: 3.48,
};
export const chip = {
  width: 9.62,
  height: 9.23,
  radius: 1.0,
  offsetX: 10.25,
  offsetY: card.height - 19.23 - 9.23,
};

export function RectangleRounded(w: number, h: number, r: number, s: number) {
  // width, height, radiusCorner, smoothness
  const pi2 = Math.PI * 2;
  const n = (s + 1) * 4; // This defines the number of segments for the rounded corners.
  let indices = [];
  let positions = [];
  let uvs = [];

  // Push center vertex (for the fan triangulation)
  positions.push(0, 0, 0);
  uvs.push(0.5, 0.5);

  // Generate positions and uvs
  for (let j = 0; j < n; j++) {
    contour(j);
  }

  // Create indices for triangulation (fan)
  for (let j = 1; j < n; j++) {
    indices.push(0, j, j + 1);
  }
  indices.push(0, n, 1); // Close the loop

  const geometry = new THREE.BufferGeometry();
  geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(indices), 1));
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(positions), 3)
  );
  geometry.setAttribute(
    "uv",
    new THREE.BufferAttribute(new Float32Array(uvs), 2)
  );

  return geometry;

  function contour(j: number) {
    // Calculate which quadrant (corner) we're in for the rounded corners
    const qu = Math.floor((4 * j) / n) + 1;
    const sgx = qu === 1 || qu === 4 ? 1 : -1;
    const sgy = qu < 3 ? 1 : -1;

    // Calculate the positions for each point around the contour
    const angle = (pi2 * (j - qu + 1)) / (n - 4); // This creates the rounded effect
    const x = sgx * (w / 2 - r) + r * Math.cos(angle);
    const y = sgy * (h / 2 - r) + r * Math.sin(angle);

    positions.push(x, y, 0);
    uvs.push(0.5 + x / w, 0.5 + y / h);
  }
}

export const ChromeMaterial = () => (
  <meshStandardMaterial color={"white"} metalness={0.95} roughness={0.05} />
);
