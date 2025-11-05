// File: `src/components/Address/AddressForm.jsx`
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { addAddress, getAddress, updateAddress} from "../../services/AddressService.js";

const AddressForm = () => {
    const [address, setAddress] = useState({
        condominium: "",
        apartment: "",
        street: "",
        floor: "",
    });
    const { id } = useParams();
    const navigate = useNavigate();

    const loadAddress = async () => {
        try {
            const response = await getAddress(id);
            const data = response.data;
            setAddress({
                condominium: data.condominium || "",
                apartment: data.apartment || "",
                street: data.street || "",
                floor: data.floor || "",
            });
        } catch (e) {
            console.error(e);
            void Swal.fire("Error", "Failed to load address data", "error");
        }
    };

    useEffect(() => {
        if (id) void loadAddress();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress({ ...address, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            condominium: address.condominium,
            apartment: address.apartment,
            street: address.street,
            floor: address.floor,
        };

        try {
            if (id) {
                await updateAddress(id, payload);
                void Swal.fire("Updated", "Address updated successfully", "success");
            } else {
                await addAddress(payload);
                void Swal.fire("Created", "Address created successfully", "success");
            }
            navigate("/addresses");
        } catch (error) {
            console.error("Error saving address:", error);
            const backendMessage = error.response?.data?.message || error.message;
            void Swal.fire("Error", String(backendMessage), "error");
        }
    };

    return (
        <div className="container mt-4">
            <h2>{id ? "Edit Address" : "Add Address"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Condominium</label>
                    <input
                        type="text"
                        className="form-control"
                        name="condominium"
                        value={address.condominium}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Apartment</label>
                    <input
                        type="text"
                        className="form-control"
                        name="apartment"
                        value={address.apartment}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Street</label>
                    <input
                        type="text"
                        className="form-control"
                        name="street"
                        value={address.street}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Floor</label>
                    <input
                        type="text"
                        className="form-control"
                        name="floor"
                        value={address.floor}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-success me-2">Save</button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate("/addresses")}>Cancel</button>
            </form>
        </div>
    );
};

export default AddressForm;
