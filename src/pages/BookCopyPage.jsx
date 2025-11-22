import {Route, Routes} from "react-router-dom";
import BookCopyForm from "../components/BookCopy/BookCopyForm.jsx";
import BookCopyList from "../components/BookCopy/BookCopyList.jsx";


/**
 * Gestiona rutas internas:
 * /book-returns, /book-returns/add, /book-returns/edit/:id
 */

const BookCopyPage = () => {
    return (
        <Routes>
            <Route index element={<BookCopyList />} />
            <Route path="add" element={<BookCopyForm />} />
            <Route path="edit/:id" element={<BookCopyForm />} />
        </Routes>
    )
}

export default BookCopyPage;