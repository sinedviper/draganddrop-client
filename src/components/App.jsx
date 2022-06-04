import "./App.css";
import { peopleFromAT } from "../database/database";

function App() {
  return (
    <main>
      {peopleFromAT.map(({ id, name, message, img }) => {
        return (
          <div className="main__card" key={id}>
            <div className="card__img">
              <img src={img} alt={name} />
            </div>
            <div className="card__info">
              <div className="info__message">
                <p>{message}</p>
              </div>
              <div className="info__id">
                <p>({id})</p>
              </div>
              <div className="info__name">
                <p>{name}</p>
              </div>
            </div>
          </div>
        );
      })}
    </main>
  );
}

export default App;
