import {Route, Routes} from "react-router-dom";
import AddressList from "../components/Address/AddressList.jsx";
import AddressForm from "../components/Address/AddressForm.jsx";

/**
 * AuthorPage — Gestiona rutas internas:
 * /authors, /authors/add, /authors/edit/:id
 */
const AddressPage = () => {
    return (
        <Routes>
            <Route index element={<AddressList />} />
            <Route path="add" element={<AddressForm />} />
            <Route path="edit/:id" element={<AddressForm />} />
        </Routes>
    )
}

export default AddressPage;