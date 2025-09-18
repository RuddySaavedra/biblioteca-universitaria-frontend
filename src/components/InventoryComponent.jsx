import { useEffect, useState } from "react";
import { addInventory, getInventory, updateInventory } from "../services/InventoryService.js";
import { useNavigate, useParams } from "react-router-dom";
import {addBook, updateBook} from "../services/BookService.js";

const InventoryComponent = () => {
    // Campos del backend: totalCopies, availableCopies, minThreshold
    const [totalCopies, settotalCopies] = useState("");
    const [availableCopies, setavailableCopies] = useState("");
    const [minThreshold, setminThreshold] = useState("");

    const [errors, setErrors] = useState({
        totalCopies: "",
        availableCopies: "",
        minThreshold: ""
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getInventory(id).then((res) => {
                const s = res.data;
                settotalCopies(s.totalCopies ?? "");
                setavailableCopies(s.availableCopies ?? "");
                setminThreshold(s.minThreshold ?? "");
            });
        }
    }, [id]);

    function validateForm() {
        let valid = true;
        const copy = { ...errors };

        if (totalCopies.trim()) copy.totalCopies = ""; else { copy.totalCopies = "Copies required"; valid = false; }

       if (availableCopies.trim() && /^\S+@\S+\.\S+$/.test(availableCopies)) copy.availableCopies = "";
        else { copy.availableCopies = "Valid Copies required"; valid = false; }

        if (minThreshold.trim()) copy.minThreshold = "";
        else { copy.minThreshold = "Minimun # required"; valid = false; }

        setErrors(copy);
        return valid;
    }

    function saveOrUpdateInventory(event) {
        event.preventDefault();
        if (validateForm()) {
            const inventory = {totalCopies, availableCopies, minThreshold};
            if (id) {
                updateInventory(id, inventory).then(response => {
                    console.log(response.data);
                    navigate('/inventories');
                }).catch(error => {
                    console.log(error);
                })
            } else {
                addInventory(inventory).then(response => {
                    console.log(response.data);
                    navigate('/inventories');
                }).catch(error => {
                    console.log(error);
                })
            }
        }
    }

    function pageTitle() {
        if (id) {
            return <h2 className="text-center">Update Inventory</h2>;
        } else {
            return <h2 className="text-center">Add Inventory</h2>;
        }
    }

    return (
        <div className="container">
            {/*<br/> Salta una linea*/}
            <br/>
            <div className="card col-md-6 offset-md-3">
                {
                    pageTitle()
                }
                <div className="card-body">
                    <form>
                        <div className="form-group mb-2">
                            <label className="form-label">Total Copies</label>
                            <input
                                type="number"
                                name="total copies"
                                value={totalCopies}
                                placeholder="Enter Total Copies"
                                className={`form-control ${errors.totalCopies ? 'is-invalid' : ""}`}
                                onChange={(e) => settotalCopies(e.target.value)}
                            />
                            {errors.totalCopies && <div className="invalid-feedback">{errors.totalCopies}</div>}
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Available Copies</label>
                            <input
                                type="number"
                                name="availableCopies"
                                value={availableCopies}
                                placeholder="Enter Available Copies"
                                className={`form-control ${errors.availableCopies ? 'is-invalid' : ""}`}
                                onChange={(e) => setavailableCopies(e.target.value)}
                            />
                            {errors.availableCopies && <div className="invalid-feedback">{errors.availableCopies}</div>}
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Minimum Required</label>
                            <input
                                type="number"
                                name="minimum Required"
                                value={minThreshold}
                                placeholder="Enter Minimum Required"
                                className={`form-control ${errors.minThreshold ? 'is-invalid' : ""}`}
                                onChange={(e) => setminThreshold(e.target.value)}
                            />
                            {errors.minThreshold && <div className="invalid-feedback">{errors.minThreshold}</div>}
                        </div>
                        //es el boton submit, llama a saveorupdatebook responsable de enviar,
                        //validar y luego agregar o actualizar un libro
                        <button type="submit" className="btn btn-success" onClick={saveOrUpdateInventory}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default InventoryComponent;