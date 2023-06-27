import Logo from "../assets/Logo.svg";
import { useLocation } from "react-router-dom";

const GameInterface = () => {
  const location = useLocation();
  const { gridSize } = location.state;

  console.log(location);
  console.log(gridSize);
  return (
    <>
      <div className="gameInterfaceMainDiv">
        <div className="header">
          <img src={Logo} className="logoSize" />
          <button className="menuButton">Menu</button>
        </div>
      </div>
    </>
  );
};

export default GameInterface;
