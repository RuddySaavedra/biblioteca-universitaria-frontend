import { Route, Routes } from "react-router-dom";
import LoanList from "../components/Loan/LoanList.jsx";
import LoanForm from "../components/Loan/LoanForm.jsx";

/**
 * Gestiona rutas internas:
 * /loans, /loans/add, /loans/edit/:id
 */
const LoanPage = () => {
    return (
        <Routes>
            <Route index element={<LoanList />} />
            <Route path="add" element={<LoanForm />} />
            <Route path="edit/:id" element={<LoanForm />} />
        </Routes>
    );
};

export default LoanPage;
