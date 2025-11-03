import {Route, Routes} from "react-router-dom";
import BookList from "../components/Book/BookList.jsx";
import BookForm from "../components/Book/BookForm.jsx";

/**
 * Gestiona rutas internas:
 * /books, /books/add, /books/edit/:id
 */

const BookPage = () => {
    return (
        <Routes>
            <Route index element={<BookList />} />
            <Route path="add" element={<BookForm />} />
            <Route path="edit/:id" element={<BookForm />} />
        </Routes>
    )
}

export default BookPage;