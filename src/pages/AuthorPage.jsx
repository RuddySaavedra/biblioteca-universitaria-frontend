import {Routes} from "react-router-dom";
import AuthorForm from "../components/Author/AuthorForm.jsx";
import AuthorList from "../components/Author/AuthorList.jsx";

 /**
  * AuthorPage — Gestiona rutas internas:
  * /authors, /authors/add, /authors/edit/:id
  */
const AuthorPage = () => {
    return (
        <Routes>
            <Route index element={<AuthorList />} />
            <Route path="add" element={<AuthorForm />} />
            <Route path="edit/:id" element={<AuthorForm />} />
        </Routes>
    )
}

export default AuthorPage;