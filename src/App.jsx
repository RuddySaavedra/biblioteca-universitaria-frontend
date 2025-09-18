import './App.css'
import ListBookComponent from "./components/ListBookComponent.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import HeaderComponent from "./components/HeaderComponent.jsx";
import BookComponent from "./components/BookComponent.jsx";
import ListAuthorComponent from "./components/ListAuthorComponent.jsx";
import AuthorComponent from "./components/AuthorComponent.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";

// imports de Student
import ListStudentComponent from "./components/ListStudentComponent.jsx";
import StudentComponent from "./components/StudentComponent.jsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <HeaderComponent/>
                <Routes>
                    <Route path="/" element={<ListBookComponent/>}/>

                    {/* Rutas de Book */}
                    <Route path="/books" element={<ListBookComponent/>}/>
                    <Route path="/add-book" element={<BookComponent/>}/>
                    <Route path="/edit-book/:id" element={<BookComponent/>}/>

                    {/* Rutas de Author */}
                    <Route path="/authors" element={<ListAuthorComponent />} />
                    <Route path="/add-author" element={<AuthorComponent />} />
                    <Route path="/edit-author/:id" element={<AuthorComponent />} />

                    {/* Rutas de Student */}
                    <Route path="/students" element={<ListStudentComponent />} />
                    <Route path="/add-student" element={<StudentComponent />} />
                    <Route path="/edit-student/:id" element={<StudentComponent />} />
                </Routes>
            </BrowserRouter>
            <FooterComponent/>
        </>
    )
}

export default App
