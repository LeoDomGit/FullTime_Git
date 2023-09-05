import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Todo from "./components/Todo";
import Products from "./pages/Products";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/todo" element={<Todo/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
