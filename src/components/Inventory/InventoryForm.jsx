import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { addInventory, getInventory, updateInventory } from "../../services/InventoryService.js";
import { getAllBooks } from "../../services/BookService.js";

const InventoryForm = () => {
    const [inventory, setInventory] = useState({
        totalCopies: "",
        availableCopies: "",
        minThreshold: "",
        bookId: "",
    });

    const [books, setBooks] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const loadBooks = async () => {
        try {
            const res = await getAllBooks();
            setBooks(res.data || []);
        } catch (e) {
            console.error("Error loading books:", e);
            void Swal.fire("Error", "Failed to load books", "error");
        }
    };

    const loadInventory = async () => {
        try {
            const res = await getInventory(id);
            const data = res.data;
            setInventory({
                totalCopies: data.totalCopies ?? "",
                availableCopies: data.availableCopies ?? "",
                minThreshold: data.minThreshold ?? "",
                bookId: data.bookId ?? data.book?.id ?? "",
            });
        } catch (e) {
            console.error("Error loading inventory:", e);
            void Swal.fire("Error", "Failed to load inventory data", "error");
        }
    };

    useEffect(() => {
        void loadBooks();
        if (id) void loadInventory();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInventory({ ...inventory, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones simples en cliente
        const t = Number(inventory.totalCopies);
        const a = Number(inventory.availableCopies);
        const m = Number(inventory.minThreshold);

        if (a > t) {
            void Swal.fire("Validation", "Available copies cannot exceed total copies.", "warning");
            return;
        }
        if (t < 0 || a < 0 || m < 0) {
            void Swal.fire("Validation", "Values must be non-negative.", "warning");
            return;
        }

        const payload = {
            totalCopies: t,
            availableCopies: a,
            minThreshold: m,
            bookId: Number(inventory.bookId),
        };

        try {
            if (id) {
                await updateInventory(id, payload);
                void Swal.fire("Updated", "Inventory updated successfully", "success");
            } else {
                await addInventory(payload);
                void Swal.fire("Created", "Inventory created successfully", "success");
            }
            navigate("/inventories");
        } catch (error) {
            console.error("Error saving inventory:", error);
            void Swal.fire("Error", "Failed to save inventory", "error");
        }
    };

    return (
        <div className="container mt-4">
            <h2>{id ? "Edit Inventory" : "Add Inventory"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Book</label>
                    <select
                        className="form-select"
                        name="bookId"
                        value={inventory.bookId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Select Book --</option>
                        {books.map((b) => (
                            <option key={b.id} value={b.id}>
                                {b.title} {b.isbn ? `(${b.isbn})` : ""}
                            </option>
                        ))}
                    </select>
                    <div className="form-text">
                        * Relación 1:1 (cada libro tiene un único registro de inventario).
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Total Copies</label>
                    <input
                        type="number"
                        min="0"
                        className="form-control"
                        name="totalCopies"
                        value={inventory.totalCopies}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Available Copies</label>
                    <input
                        type="number"
                        min="0"
                        className="form-control"
                        name="availableCopies"
                        value={inventory.availableCopies}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Minimum Threshold</label>
                    <input
                        type="number"
                        min="0"
                        className="form-control"
                        name="minThreshold"
                        value={inventory.minThreshold}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-success me-2">Save</button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate("/inventories")}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default InventoryForm;
