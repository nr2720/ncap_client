import { swatch, fileIcon, ai, logoShirt, stylishShirt, colour, file1, cap, tile, pen } from "../assets";

export const EditorTabs = [
  {
    name: "colorpicker",
    icon: colour,
  },
  {
    name: "filepicker",
    icon: file1,
  },
  {
    name: "aipicker",
    icon: pen,
  },
];

export const FilterTabs = [
  {
    name: "logoShirt",
    icon: cap,
  },
  {
    name: "textLogo",
    icon: pen,
  },
  {
    name: 'turnAroundButt',
    icon: pen,
  }
];

export const DecalTypes = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShirt",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt",
  },
};
