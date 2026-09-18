export interface ZineSection {
  id: string;
  label: string;
  zineBlockCount: number;
}

export const ZINE_BLOCK_CAPACITY = 26;

export const zineSections: ZineSection[] = [
  { id: "section-title-page", label: "Title Page", zineBlockCount: 0 },
];
