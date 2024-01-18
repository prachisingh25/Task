import React, { useEffect, useState } from "react";
import styles from "../styles/TodoItem.module.css";

const TodoItem = ({ clickedItem, toDoList, setToDoList, slct, setEditToggle, setEditItem, setRemoveMsg }) => {
  const [isDraggable, setIsDraggable] = useState(true);

  useEffect(() => {
    slct === 'all' ? setIsDraggable(true) : setIsDraggable(false);
  }, [slct])

  const deleteTaskHandler = () => {
    
    setToDoList(toDoList.filter((el) => el.id !== clickedItem.id));
    setRemoveMsg(false);
  };

  const deleteConfirm = () => {
    
    setRemoveMsg(true);
  }

  const editTaskHandler = () => {
    setEditToggle(true);
    setEditItem(clickedItem);
  }

  const completedTaskHandler = () => {
    setToDoList(
      toDoList.map((todo) => {
        if (todo.id === clickedItem.id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  return (
    <div className={`${styles["TodoContainer"]} ${!isDraggable ? styles["notDraggable"] : styles[""]}`}>
      {isDraggable ?
        <div>
          <div className={styles["drag-btn"]} disabled>
            <i className="fas fa-grip-lines"></i>
          </div>
        </div>
        :
        <div></div>
      }
      <li
        className={`${styles["TodoItem"]} 
        ${clickedItem.completed ? styles["completed"] : styles[""]}`}
        onClick={completedTaskHandler}
      >
        <div>{clickedItem.text}</div>
      </li>

      <button className={`${styles["check-btn"]} ${clickedItem.completed ? styles.checkDone : ''}`} onClick={completedTaskHandler}>
        <i className="far fa-check-circle fa-lg"></i>
      </button>

      <button className={styles["edit-btn"]} onClick={editTaskHandler}>
        <i className="fas fa-edit"></i>
      </button>

      <button className={styles["trash-btn"]} onClick={deleteTaskHandler} onDoubleClick={deleteConfirm}>
        <i className="far fa-times-circle fa-lg"></i>
      </button>
    </div>
  );
};

export default TodoItem;
