import React, { useState } from "react";
import "./App.css";
import { data } from "../database/database";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

function App() {
  const [items, setItems] = useState(data);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const newItems = [...items];
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setItems(newItems);
  };

  const Main = styled.main`
    width: 410px;
    margin: 40px auto 0;
    border-radius: 5px;
    padding: 15px 15px 1px 15px;
  `;

  const MainCard = styled.div`
    width: 380px;
    margin-bottom: 15px;
    display: flex;
    flex-direction: row;
    border-radius: 5px;
    border: 1px solid black;
    background-color: #f3f3f3;
    cursor: grab;
  `;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <Main
            ref={provided.innerRef}
            className="main__container"
            style={{
              backgroundColor: snapshot.isDraggingOver ? "#96fbff" : "#9edbff",
              ...provided.droppableProps.style,
            }}
            {...provided.droppableProps}
          >
            {items.map((item, index) => (
              <Draggable draggableId={item.id} index={index} key={item.id}>
                {(provided, snapshot) => (
                  <MainCard
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      backgroundColor: snapshot.isDragging
                        ? "#afffd7"
                        : "#f3f3f3",
                      ...provided.draggableProps.style,
                    }}
                  >
                    <div className="card__img">
                      <img src={item.img} alt={item.name} />
                    </div>
                    <div className="card__info">
                      <div className="info__message">
                        <p>"{item.message}"</p>
                      </div>
                      <div className="info__bottom">
                        <p className="info__id">id({item.id})</p>
                        <p className="info__name">{item.name}</p>
                      </div>
                    </div>
                  </MainCard>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Main>
        )}
      </Droppable>
    </DragDropContext>
  );
}
export default App;

/*
draggable
onDragStart={() => handleDragStart(index)}
                onDragEnter={(e) => handleDragEnter(e, index)}
                onDragLeave={(e) => handleDragLeave(e)}
                onDrop={(e) => handleDrop(e)}
                onDragOver={(e) => e.preventDefault()}



  const [dragItem, setDragItem] = useState();
  const [list, setList] = useState(peopleFromAT);

  const handleDragStart = (index) => {
    setColor(true);
    setDragItem(index);
  };

  const handleDragEnter = (e, index) => {
    e.target.style.backgroundColor = "#afffd7";
    const newList = [...list];
    const item = newList[dragItem];
    newList.splice(dragItem, 1);
    newList.splice(index, 0, item);
    setDragItem(index);
    setList(newList);
    setColor(true);
  };

  const handleDragLeave = (e) => {
    e.target.style.backgroundColor = "white";
  };

  const handleDrop = (e) => {
    setColor(false);
    e.target.style.backgroundColor = "white";
  };
  */
