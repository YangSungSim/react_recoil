import React from "react";
import { useSetRecoilState } from "recoil";
import { categories, IToDo, toDoState } from "./atoms";

function ToDo({text, category, id}:IToDo) {
    const setToDos = useSetRecoilState(toDoState);
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {currentTarget: { name },} = event;
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
            const newToDo = {text, id, category:name as any}; //name으로 cateogory를 변경
            
            return [...oldToDos.slice(0, targetIndex),
                 newToDo, 
                 ...oldToDos.slice(targetIndex+1)];
        })
    };

    return <li><span>{text}</span> 
    {category !== categories.DOING && <button name={categories.DOING + ""} onClick={onClick}>To Do</button>}
    {category !== categories.TO_DO && <button name={categories.TO_DO + ""} onClick={onClick}>Done</button>}
    {category !== categories.DONE && <button  name={categories.DONE + ""} onClick={onClick}>Doing</button>}
    </li>;
}

export default ToDo;