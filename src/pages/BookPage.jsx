import {Route, Routes} from "react-router-dom";
import BookList from "../components/Book/BookList.jsx";

/**
 * Gestiona rutas internas:
 * /books, /books/add, /books/edit/:id
 */

const BookPage = () => {
    return (
        <Routes>
            <Route index element={<BookList />} />

        </Routes>
    )
}

export default BookPage;