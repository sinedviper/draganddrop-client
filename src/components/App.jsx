import { useState } from "react";
import "./App.css";
import { peopleFromAT } from "../database/database";

function App() {
  const [color, setColor] = useState();
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

  return (
    <main className={color ? "active" : ""}>
      <ul>
        {list &&
          list.map(({ id, name, message, img }, index) => {
            return (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <li
                className="main__card"
                draggable
                key={index}
                onDragStart={() => handleDragStart(index)}
                onDragEnter={(e) => handleDragEnter(e, index)}
                onDragLeave={(e) => handleDragLeave(e)}
                onDrop={(e) => handleDrop(e)}
                onDragOver={(e) => e.preventDefault()}
              >
                <div className="card__img">
                  <img src={img} alt={name} />
                </div>
                <div className="card__info">
                  <div className="info__message">
                    <p>"{message}"</p>
                  </div>
                  <div className="info__bottom">
                    <p className="info__id">id({id})</p>
                    <p className="info__name">{name}</p>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </main>
  );
}

export default App;
