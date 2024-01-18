import React from "react";
import styles from "../styles/Form.module.css";

const Form = ({ input, setInput, toDoList, setToDoList, day }) => {

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const addNewTaskHandler = (e) => {
    e.preventDefault(); 
    if (input.trim() === "") {
      setInput("");  
      e.target.querySelector('input').focus();
      return;
    }
    setToDoList([
      ...toDoList,
      { text: input, completed: false, id: Math.random() * 1000, day: day },
    ]);
    setInput("");
  };


  return (
    <div className={styles["form-container"]}>
      <form className={styles["form"]} action="" onSubmit={addNewTaskHandler}>
        <input
          className={styles["form-input"]}
          onChange={inputHandler}
          value={input}
          placeholder="New task"
          type="text"
        />
        <button className={`${styles["form-btn"]} fas fa-plus-square`}></button>
      </form>
    </div>
  );
};


export default Form;
