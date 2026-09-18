export interface ZineTextBlock {
  id: string;
  text: string;
}

export interface ZinePageData {
  id: string;
  textBlocks: ZineTextBlock[];
}

export const ZINE_BLOCK_CAPACITY = 26;
export const TITLE_PAGE_ID = "page-title";

const CHARS_PER_LINE = 42;
const DEFAULT_TEXT = "Click edit to add your text here.";

let idCounter = 0;

function nextId(prefix: string) {
  idCounter += 1;
  return `${prefix}-${Date.now()}-${idCounter}`;
}

export function createTitlePage(): ZinePageData {
  return { id: TITLE_PAGE_ID, textBlocks: [] };
}

export function createBlankPage(): ZinePageData {
  return { id: nextId("page"), textBlocks: [] };
}

export function createTextBlock(): ZineTextBlock {
  return { id: nextId("block"), text: DEFAULT_TEXT };
}

export function getPageLabel(index: number): string {
  return index === 0 ? "Title Page" : `Page ${index + 1}`;
}

export function estimateTextBlockCost(text: string): number {
  if (text.length === 0) return 1;
  const lines = text
    .split("\n")
    .reduce((total, line) => total + Math.max(1, Math.ceil(line.length / CHARS_PER_LINE)), 0);
  return Math.max(1, lines);
}

export function getPageZineBlockCount(page: ZinePageData): number {
  if (page.id === TITLE_PAGE_ID) return ZINE_BLOCK_CAPACITY;
  return page.textBlocks.reduce((sum, block) => sum + estimateTextBlockCost(block.text), 0);
}
