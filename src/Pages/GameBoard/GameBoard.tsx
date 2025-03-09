import { gamestate, SetPlayerDetails } from "../../Store/AboutGame.ts";
import { useDispatch, useSelector } from "react-redux";
import "./GameBoard.css";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import CurrentPlayer from "./Sections/CurrentPlayer/CurrentPlayer.tsx";
import BoardSetter from "./Sections/BoardSetter/BoardSetter.tsx";
import LiveRanking from "./Sections/LiveRanking/LiveRanking.tsx";
import GridCards from "./Sections/GridCards/GridCards.tsx";
import { fetchr } from "../../funcs & conts/fetcher.ts";
import Backdrop from "../../Components/Backdrop/Backdrop.tsx";

const GameBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const playersDetail = useSelector(
    (val: gamestate) => val.About.PlayersDetails
  );
  const isPlayStart = useSelector((val: gamestate) => val.Board.isPlayStart);

  useEffect(() => {
    if (playersDetail.length === 0) {
      navigate("/");
    }
  });

  useEffect(() => {
    const fetchPlayerImages = async () => {
      const updatedPlayer = await Promise.all(
        playersDetail.map(async (player) => {
          const image = await fetchr(player);
          return { ...player, character: image };
        })
      );
      dispatch(SetPlayerDetails(updatedPlayer));
    };
    fetchPlayerImages();
  }, []);

  return (
    <>
      {!isPlayStart && <Backdrop />}
      <div className="GameBoard">
        {/* <LeaderBoard /> */}
        <CurrentPlayer />
        <div className="Lowerpart">
          <LiveRanking />
          <GridCards />
          <BoardSetter />
        </div>
      </div>
    </>
  );
};

export default GameBoard;
