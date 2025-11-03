import { Route, Routes } from "react-router-dom";
import InventoryList from "../components/Inventory/InventoryList.jsx";
import InventoryForm from "../components/Inventory/InventoryForm.jsx";

/**
 * Gestiona rutas internas:
 * /inventories, /inventories/add, /inventories/edit/:id
 */
const InventoryPage = () => {
    return (
        <Routes>
            <Route index element={<InventoryList />} />
            <Route path="add" element={<InventoryForm />} />
            <Route path="edit/:id" element={<InventoryForm />} />
        </Routes>
    );
};

export default InventoryPage;
