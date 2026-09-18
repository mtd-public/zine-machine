export interface ZinePageData {
  id: string;
  zineBlockCount: number;
}

export const ZINE_BLOCK_CAPACITY = 26;

let pageIdCounter = 0;

function nextPageId() {
  pageIdCounter += 1;
  return `page-${Date.now()}-${pageIdCounter}`;
}

export function createTitlePage(): ZinePageData {
  return { id: "page-title", zineBlockCount: 0 };
}

export function createBlankPage(): ZinePageData {
  return { id: nextPageId(), zineBlockCount: 0 };
}

export function getPageLabel(index: number): string {
  return index === 0 ? "Title Page" : `Page ${index + 1}`;
}
