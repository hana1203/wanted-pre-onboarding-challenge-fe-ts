//Interface로 설계 & 모델링
export interface Component {
  id: string;
  contents: string;
  isCompleted: boolean;
  category: string;
  tags?: string[];
  create(id: string, contents?: string): void;
  read(id: string): void;
  update(
    contents: string,
    isCompleted: boolean,
    category: string,
    tags?: string
  ): void;
  delete(id: string): void;
}

export class TodoComponent implements Component {
  id: string;
  contents: string;
  isCompleted: boolean;
  category: string;
  tags?: string[];

  create(id: string, contents?: string) {}
  read(id: string) {}
  update(
    contents: string,
    isCompleted: boolean,
    category: string,
    tags?: string
  ) {}
  delete(id: string) {}
}
