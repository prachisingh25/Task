import TodoItem from "./TodoItem";
import styles from "../styles/TodoList.module.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


const DraggableTodoList = ({ toDoList, setToDoList, filteredList, setFilteredList, slct, setEditToggle, setEditItem, setRemoveMsg }) => {

  const reOrderList = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };


  const onEnd = (result) => {
    if (!result.destination) return;
    setFilteredList(
      reOrderList(filteredList, result.source.index, result.destination.index)
    );

    setToDoList(
      reOrderList(filteredList, result.source.index, result.destination.index)
    );

  }


  return (
    <div>
      <DragDropContext onDragEnd={onEnd}>
        <Droppable droppableId="123456">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
            >
              <div className={styles["toDoListContainer"]}>
                <ul className={styles["toDoList"]}>
                  {filteredList.map((item, index) => (
                    <Draggable
                      draggableId={item.id.toString()}
                      index={index}
                      key={item.id}
                    >
                      {(provided, snapshot) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          style={{
                            ...provided.draggableProps.style,
                            opacity: snapshot.isDragging ? "0.8" : "0.98",
                            border: snapshot.isDragging ? "dotted 2.6px whitesmoke" : "solid 0.6px rgba(0,0,0,0.01)",
                          }}
                        >
                          <TodoItem
                            clickedItem={item}
                            toDoList={toDoList}
                            setToDoList={setToDoList}
                            slct={slct}
                            setEditToggle={setEditToggle}
                            setEditItem={setEditItem}
                            setRemoveMsg={setRemoveMsg}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </ul>
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {toDoList.length > 1 && <p className={styles.dragTip}></p>}
    </div>
  );
};


export default DraggableTodoList;
