import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteInventory, getAllInventories } from "../../services/InventoryService.js";

const InventoryList = () => {
    const [inventories, setInventories] = useState([]);
    const navigate = useNavigate();

    const loadInventories = async () => {
        try {
            const response = await getAllInventories();
            setInventories(response.data || []);
        } catch (error) {
            console.error("Error loading inventory:", error);
            await Swal.fire("Error", "Failed to load inventory.", "error");
        }
    };

    function addInventory()  {
        navigate("/inventory/add");
    }

    const performDelete = async (id) => {
        try {
            await deleteInventory(id);
            void Swal.fire("Deleted!", "Inventory deleted successfully!", "success");
            await loadInventories();
        } catch (error) {
            console.error("Error deleting inventory:", error);
            void Swal.fire("Error", "Failed to delete the inventory.", "error");
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This inventory will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            await performDelete(id);
        }
    };

    useEffect(() => {
        void loadInventories();
    }, []);

    const renderStatusBadge = (available, minT) => {
        if (available < minT)
            return <span className="badge text-bg-danger">LOW</span>;
        return <span className="badge text-bg-success">OK</span>;
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Inventory List</h2>
                <button className="btn btn-primary" onClick={addInventory}>
                    Add Inventory
                </button>
            </div>

            <table className="table table-striped align-middle">
                <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Book</th>
                    <th>ISBN</th>
                    <th>Available / Total</th>
                    <th>Min. Threshold</th>
                    <th>Status</th>
                    <th style={{ width: "160px" }}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {inventories.length > 0 ? (
                    inventories.map((inventory) => {
                        return (
                            <tr key={inventory.id}>
                                <td>{inventory.id}</td>
                                <td>{inventory.bookTitle}</td>
                                <td>{inventory.bookIsbn}</td>
                                <td>
                                    {inventory.availableCopies} / {inventory.totalCopies}
                                </td>
                                <td>{inventory.minThreshold}</td>
                                <td>{renderStatusBadge(inventory.availableCopies, inventory.minThreshold)}</td>
                                <td>
                                    <Link to={`/inventory/edit/${inventory.id}`} className="btn btn-warning btn-sm me-2">
                                        Edit
                                    </Link>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(inventory.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })
                ) : (
                    <tr>
                        <td colSpan="7" className="text-center text-muted">
                            No inventories found.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default InventoryList;
