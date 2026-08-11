// Each recipe category gets a consistent color, like labeled spice jars on
// a rack. The palette is fixed; which category lands on which color is
// decided deterministically from the category name so it never flickers
// between renders or sessions.
const TONES = [
  { name: "saffron", hex: "#D6A24C" },
  { name: "herb", hex: "#5F7350" },
  { name: "brick", hex: "#A64B3C" },
  { name: "plum", hex: "#7A4B6E" },
  { name: "clay-teal", hex: "#4C7A82" },
  { name: "olive", hex: "#8A8F4C" },
];

export function toneForLabel(label = "") {
  let hash = 0;
  for (let i = 0; i < label.length; i++) {
    hash = (hash * 31 + label.charCodeAt(i)) >>> 0;
  }
  return TONES[hash % TONES.length];
}
