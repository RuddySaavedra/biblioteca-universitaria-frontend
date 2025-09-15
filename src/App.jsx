import './App.css'
import ListBookComponent from "./components/ListBookComponent.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import HeaderComponent from "./components/HeaderComponent.jsx";
import BookComponent from "./components/BookComponent.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <>
        <BrowserRouter>
            <HeaderComponent/>
            <Routes>
                <Route path="/" element={<ListBookComponent/>}/>
                <Route path="/books" element={<ListBookComponent/>}/>
                <Route path="/add-book" element={<BookComponent/>}/>
                <Route path="/edit-book/:id" element={<BookComponent/>}/>
            </Routes>
        </BrowserRouter>
        <FooterComponent/>
    </>
  )
}

export default App
