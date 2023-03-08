import { Routes, Route } from "react-router-dom";
import List from './DiaryList';
import Item from './DiaryItem';

function App() {
    return (
        <Routes>
            <Route path="/" element={<List/>}/>
            <Route path="/item" element={<Item/>}/>
        </Routes>
    );
  }
  
  export default App;