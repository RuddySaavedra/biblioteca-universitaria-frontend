import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteAddress, getAllAddresses } from "../../services/AddressService.js";

const AddressList = () => {
    const [addresses, setAddresses] = useState([]);
    const navigate = useNavigate();

    const loadAddresses = async () => {
        try {
            const res = await getAllAddresses();
            setAddresses(res.data || []);
        } catch (error) {
            console.error("Error loading addresses:", error);
            void Swal.fire("Error", "Failed to load addresses.", "error");
        }
    };

    useEffect(() => {
        void loadAddresses();
    }, []);

    const performDelete = async (id) => {
        try {
            await deleteAddress(id);
            void Swal.fire("Deleted!", "Address deleted successfully!", "success");
            await loadAddresses();
        } catch (error) {
            console.error("Error deleting address:", error);
            const backendMessage = error.response?.data?.message || error.message;
            void Swal.fire("Error", String(backendMessage), "error");
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This address will be permanently deleted.",
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

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Address List</h2>
                <button className="btn btn-primary" onClick={() => navigate("/addresses/add")}>Add Address</button>
            </div>

            <table className="table table-striped align-middle">
                <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Street</th>
                    <th>Condominium</th>
                    <th>Apartment</th>
                    <th>Floor</th>
                    <th style={{ width: "160px" }}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {addresses.length > 0 ? (
                    addresses.map((address) => (
                        <tr key={address.id}>
                            <td>{address.id}</td>
                            <td>{address.street || "-"}</td>
                            <td>{address.condominium || "-"}</td>
                            <td>{address.apartment || "-"}</td>
                            <td>{address.floor || "-"}</td>
                            <td>
                                <Link to={`/addresses/edit/${address.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(address.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" className="text-center text-muted">No addresses found.</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default AddressList;
