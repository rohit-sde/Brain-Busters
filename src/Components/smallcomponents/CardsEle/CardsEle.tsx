import { useEffect, useState } from "react";
import value from "../../../Store/Store";
import "./CardsEle.css";
import { useDispatch } from "react-redux";
import { SetCards } from "../../../Store/AboutGame";

const CardsEle = () => {
  const [cardType, setCardsType] = useState("ABC");
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = value.subscribe(() => {
      const cardsType = value.getState().Board.Cards.TypeOfCards;
      console.log(cardsType, "CardsEle");
      setCardsType(cardsType);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  function checkTypeOfCards(val: string) {
    if (cardType === val) return true;
  }
  return (
    <div className="CardsEleWrapper">
      <span>
        <button
          className={`${checkTypeOfCards("EMOJIS") && "currentType"}`}
          onClick={() => dispatch(SetCards("EMOJIS"))}
        >
          😁😉
        </button>
        <button
          className={`${checkTypeOfCards("ABC") && "currentType"}`}
          onClick={() => dispatch(SetCards("ABC"))}
        >
          ABC
        </button>
      </span>
      <span>
        <button
          className={`${checkTypeOfCards("123") && "currentType"}`}
          onClick={() => dispatch(SetCards("123"))}
        >
          123
        </button>
        <button
          className={`colors ${checkTypeOfCards("COLORS") && "currentType"}`}
          onClick={() => dispatch(SetCards("COLORS"))}
        ></button>
      </span>
    </div>
  );
};

export default CardsEle;
