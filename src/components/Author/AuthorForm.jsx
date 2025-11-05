import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {addAuthor, getAuthor, updateAuthor} from "../../services/AuthorService.js";
import {getAllAddresses} from "../../services/AddressService.js";
import Swal from "sweetalert2";

const AuthorForm = () => {
    const [author, setAuthor] = useState({
        firstName: "",
        lastName: "",
        type: "",
        addressId: "",
    });
    const [addresses, setAddresses] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();

    const loadAuthor = async () => {
        try {
            const response = await getAuthor(id);
            setAuthor(response.data);
        } catch (error) {
            console.log("Error loading author: ", error);
        }
    };

    const loadAddresses = async () => {
        try {
            const res = await getAllAddresses();
            setAddresses(res.data || []);
        } catch (error) {
            console.error("Error loading addresses: ", error);
        }
    };

    useEffect(() => {
        void loadAddresses();
        if (id) void loadAuthor();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuthor({ ...author, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            id: author.id,
            firstName: author.firstName,
            lastName: author.lastName,
            type: author.type,
            addressId: author.addressId ? Number(author.addressId) : null,
        }

        try {
            if (id) {
                await updateAuthor(id, payload);
                void Swal.fire("Updated", "Author updated successfully", "success");
            } else {
                await addAuthor(payload);
                void Swal.fire("Created", "Author created successfully", "success");
            }
            navigate("/authors");
        } catch (error) {
            console.log("Error saving author:", error);
            const backendMessage = error.response?.data?.message || error.message;
            void Swal.fire("Error", String(backendMessage), "error");
        }
    };

    // Mostrar sólo direcciones no asignadas o la propia cuando editando
    const selectableAddresses = addresses.filter((a) => {
        if (!a.authorId) return true;
        if (id && Number(a.authorId) === Number(id)) return true;
        return false;
    });

    return (
        <div className="container mt-4">
            <h2>{id ? "Edit Author" : "Add Author"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        className="form-control"
                        value={author.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        className="form-control"
                        value={author.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Type</label>
                    <select
                        name="type"
                        className="form-control"
                        value={author.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Select Type --</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label>Address</label>
                    <select
                        name="addressId"
                        className="form-control"
                        value={author.addressId ?? ""}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- No Address --</option>
                        {selectableAddresses.map((a) => (
                            <option key={a.id} value={a.id}>
                                {a.street || "-"} {a.condominium ? `(${a.condominium})` : ""}
                                {a.authorId ? " — assigned" : ""}
                            </option>
                        ))}
                    </select>
                    <div className="form-text">
                        * Relación 1:1. Si el author seleccionado ya tiene una dirección, el backend o la lógica de actualización se encargará de ajustar la relación.
                    </div>
                </div>

                <button type="submit" className="btn btn-success me-2">Save</button>
                <button type="button" className="btn btn-secondary" onClick={()=> navigate("/authors")}>Cancel</button>
            </form>
        </div>
    );
};

export default AuthorForm;
