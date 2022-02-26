import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categories, categoryState, toDoSelector, toDoState } from "./atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

  
function ToDoList() {
  //const toDos = useRecoilValue(toDoSelector);
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  const clickDelete = (event:React.FormEvent<HTMLButtonElement>) => {
    console.log("delete");
    console.log(toDos);
    setToDos((oldTodo) => {
      //const targetIndex = oldTodo.findIndex(toDo => toDo.text === event.currentTarget.value);
      const newTodo = toDos.filter(function(data) {
        return data.text !== event.currentTarget.value
      });
      return newTodo;
    }

    );
  }

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={categories.TO_DO}>To Do</option>
        <option value={categories.DONE}>Doing</option>
        <option value={categories.DONE}>Done</option>
      </select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <div key={toDo.id}>
        <ToDo key={toDo.id} {...toDo} /><button value={toDo.text} onClick={clickDelete}>x</button>
        </div>
      ))}
    </div>
  );
}
  

export default ToDoList;