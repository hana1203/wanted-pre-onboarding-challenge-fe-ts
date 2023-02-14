//Interface로 설계 & 모델링
export interface Todo {
  readonly id: string;
  contents?: string; //create시 내용없이 추가가능해서 optional로
  isCompleted: boolean;
  category: string;
  tags?: string[];
}

export interface TodoMaker {
  create(id: string, contents?: string): void;
  read(id: string): Todo | Todo[];
  update(
    id: string,
    contents: string,
    isCompleted: boolean,
    category: string,
    tags?: string[]
  ): Todo;
  updateTag(
    id: string,
    tagFromSwap: string,
    tagToSwap: string
  ): string[] | undefined;
  delete(id: string): Todo[];
  deleteTag(id: string, tagToRemove?: string): string[] | undefined;
}
