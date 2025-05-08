import React from "react";
import ReactDOM from "react-dom/client"; //prvo se importase od react-dom sega od react-dom/client
import App from "./components/App";

//ova e noviot nacin na koj se rendira root od react 18 i nagore
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
//stariot nacin
//ReactDOM.render(<App/>,document.getElementById("root"))
