import { Todo, TodoMaker } from "./2";

export class TodoComponent implements TodoMaker {
  private todolist: Todo[];
  constructor() {
    this.todolist = [];
  }

  // 할 일을 추가할 수 있다.
  // 내용없이 추가할 수 없다.
  create(id: string, contents?: string) {
    this.todolist.push({
      id: id,
      contents: contents,
      isCompleted: false,
      category: "summer",
      tags: [],
    });
  }

  // 모든 할 일을 조회할 수 있다.
  // ID를 기반으로 특정 할 일을 조회할 수 있다.
  read(id?: string): Todo | Todo[] {
    if (id != null) {
      //null !== undefined의 경우 true이기 떄문에 strict equality로 비교시 optional매개변수 넣지않을때 값이 undefined이라 조건에 걸려버리므로 !=로만 비교
      return this.todolist.filter((el) => el.id === id);
    }
    return this.todolist;
  }

  // ID를 제외한 모든 속성을 수정할 수 있다.
  update(
    id: string,
    contents: string,
    isCompleted: boolean,
    category: string,
    tags?: string[]
  ) {
    const item = {
      id,
      contents: contents,
      isCompleted: isCompleted,
      category: category,
      tags: tags,
    };
    const targetIdx = this.todolist.findIndex((el) => el.id === id);
    return (this.todolist[targetIdx] = { ...item });
  }

  // 특정 할 일의 특정 태그를 수정할 수 있다.
  updateTag(id: string, tagFromSwap: string, tagToSwap: string) {
    const targetItem = this.todolist.find((el) => el.id === id);
    if (targetItem != null && targetItem.tags != null) {
      const tagIdx = targetItem.tags?.findIndex((el) => el === tagFromSwap);
      console.log("tagIdx", tagIdx);
      //tagIdx가 tag 배열에 속해있으면?
      if (0 <= tagIdx && tagIdx < targetItem.tags.length) {
        targetItem.tags[tagIdx] = tagToSwap;
        return targetItem.tags;
      }
      //tagIdx가 범위를 넘어가면?
      else {
        throw new Error("no such tag exists!");
      }
    }
  }

  // ID를 기반으로 특정 할 일을 삭제할 수 있다.
  // 모든 할 일을 제거할 수 있다.
  delete(id?: string) {
    if (id != null) {
      return this.todolist.filter((el) => el.id !== id);
    }
    return (this.todolist = []);
  }

  // 특정 할 일의 특정 태그를 삭제할 수 있다.
  // 특정 할 일의 모든 태그를 제거할 수 있다.
  deleteTag(id: string, tagToRemove?: string) {
    const targetIdx = this.todolist.findIndex((el) => el.id === id);
    if (tagToRemove != null) {
      const itemIdx = this.todolist.findIndex((el) => el.id === id);
      return this.todolist[itemIdx].tags?.filter((tag) => tag !== tagToRemove);
    }
    return (this.todolist[targetIdx].tags = []);
  }
}

const todo = new TodoComponent();
// console.log(todo); //TodoComponent { todolist: [] }
todo.create("1");
todo.create("2", "컨텐츠");
console.log(todo);
console.log("전체read", todo.read());
console.log("아이디로 read", todo.read("1"));
console.log(
  "업데이트",
  todo.update("1", "수정", true, "winter", ["one", "two", "three"])
);
console.log(todo.updateTag("1", "one", "correcto~")); //존재하는 태그로 수정 //[ 'correcto~', 'two', 'three' ]
// console.log(todo.updateTag("1", "tag", "not correcto")); //기존 태그에 없는 태그로 수정
console.log("tag삭제", todo.deleteTag("1", "three")); //tag삭제 [ 'correcto~'', 'two' ]
console.log("tag삭제", todo.deleteTag("1")); //tag삭제 []
console.log("딜리트", todo.delete("2"));
console.log("없는 아이디 딜리트", todo.delete("4"));
console.log(todo);
