import { startTransition, useEffect, useState } from "react";
import Online from "./components/Online"
import Offline from "./components/Offline";
import Landing from "./components/Landing";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
function App() {
  const [showlanding, setshowlanding] = useState(true);
  // const invertlanding = ()=>{
  //   showlanding==true?setshowlanding(false):setshowlanding(true);
  // }
  return (
    <>
      {/* {showlanding && <Landing hidelanding={setshowlanding} />} */}
      <Router>
        <Routes>
          <Route exact path='/' element={<Landing />} />
          <Route exact path='/online' element={<Online />} />
          <Route exact path='/offline' element={<Offline />} />
        </Routes>
      </Router>


    </>
  );
}

export default App;
