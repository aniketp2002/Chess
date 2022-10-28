import { startTransition, useEffect, useState } from "react";
import Online from "./components/Online"
import Offline from "./components/Offline";
import Landing from "./components/Landing";
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
function App() {
  const [showlanding, setshowlanding] = useState(true);
  // const invertlanding = ()=>{
  //   showlanding==true?setshowlanding(false):setshowlanding(true);
  // }
return (
  <>
  {showlanding && <Landing hidelanding={setshowlanding}/>}
  <Routes>
                  <Route exact path='/' element={<Landing/>}></Route>
                 
            </Routes>


  </>
);
}
   
export default App;
