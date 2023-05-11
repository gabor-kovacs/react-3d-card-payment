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
  // thanks to Klaus Hoffmeister
  const pi2 = Math.PI * 2;
  const n = (s + 1) * 4;
  let indices = [];
  let positions = [];
  let uvs = [];
  let qu, sgx, sgy, x, y;

  for (let j = 1; j < n + 1; j++) indices.push(0, j, j + 1);
  indices.push(0, n, 1);
  positions.push(0, 0, 0);
  uvs.push(0.5, 0.5);
  for (let j = 0; j < n; j++) contour(j);

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
    qu = Math.trunc((4 * j) / n) + 1;
    sgx = qu === 1 || qu === 4 ? 1 : -1;
    sgy = qu < 3 ? 1 : -1;
    x = sgx * (w / 2 - r) + r * Math.cos((pi2 * (j - qu + 1)) / (n - 4));
    y = sgy * (h / 2 - r) + r * Math.sin((pi2 * (j - qu + 1)) / (n - 4));

    positions.push(x, y, 0);
    uvs.push(0.5 + x / w, 0.5 + y / h);
  }
}

export const ChromeMaterial = () => (
  <meshStandardMaterial color={"white"} metalness={0.95} roughness={0.05} />
);
