import {Route, Routes} from "react-router-dom";
import BookReturnForm from "../components/BookReturn/BookReturnForm.jsx";
import BookReturnList from "../components/BookReturn/BookReturnList.jsx";


/**
 * Gestiona rutas internas:
 * /book-returns, /book-returns/add, /book-returns/edit/:id
 */

const BookReturnPage = () => {
    return (
        <Routes>
            <Route index element={<BookReturnList />} />
            <Route path="add" element={<BookReturnForm />} />
            <Route path="edit/:id" element={<BookReturnForm />} />
        </Routes>
    )
}

export default BookReturnPage;