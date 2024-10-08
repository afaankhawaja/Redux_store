import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import NavBar from "./components/NavBar";
import { Provider } from "react-redux";
import store from "./store/store";
import Contact from "./pages/Contact";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path='/contact' element={<Contact/>} />


        </Routes>
      </BrowserRouter>
      </Provider>
      
    </div>
  );
}

export default App;
