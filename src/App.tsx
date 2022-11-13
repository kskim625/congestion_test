import { useState } from "react";
import { KtApiTest, SktApiTest } from "./components/";
import "./App.css";

function App() {
  const [isKt, setIsKt] = useState<boolean>(true);

  const handleButtonClick = () => {
    setIsKt(!isKt);
  };

  return (
    <div className="wrap">
      <button onClick={handleButtonClick}>{"KT <-> SKT 전환"}</button>
      {isKt ? <KtApiTest /> : <SktApiTest />}
    </div>
  );
}

export default App;
