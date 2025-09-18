import {useEffect, useState} from "react";
import {addInventory, getInventory, updateInventory} from "../services/InventoryService.js";
import { useNavigate, useParams } from "react-router-dom";

const InventoryComponent = () => {
    // Campos del backend: totalCopies, availableCopies, minThreshold
    const [totalCopies, setTotalCopies] = useState(0);
    const [availableCopies, setAvailableCopies] = useState(0);
    const [minThreshold, setMinThreshold] = useState(0);

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
                setTotalCopies(s.totalCopies ?? 0);
                setAvailableCopies(s.availableCopies ?? 0);
                setMinThreshold(s.minThreshold ?? 0);
            });
        }
    }, [id]);

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        // totalCopies
        if (totalCopies <= 0) {
            errorsCopy.totalCopies = "Total copies must be greater than 0";
            valid = false;
        }

        // availableCopies
        if (availableCopies < 0) {
            errorsCopy.availableCopies = "Available copies cannot be negative";
            valid = false;
        } else if (availableCopies > totalCopies) {
            errorsCopy.availableCopies = "Available copies cannot exceed total copies";
            valid = false;
        }

        // minThreshold
        if (minThreshold < 0) {
            errorsCopy.minThreshold = "Minimum threshold cannot be negative";
            valid = false;
        } else if (minThreshold > totalCopies) {
            errorsCopy.minThreshold = "Minimum threshold cannot exceed total copies";
            valid = false;
        }

        setErrors(errorsCopy);
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
                                name="totalCopies"
                                value={totalCopies}
                                placeholder="Enter Total Copies"
                                className={`form-control ${errors.totalCopies ? 'is-invalid' : ""}`}
                                onChange={(e) => setTotalCopies(Number(e.target.value))}
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
                                onChange={(e) => setAvailableCopies(Number(e.target.value))}
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
                                onChange={(e) => setMinThreshold(Number(e.target.value))}
                            />
                            {errors.minThreshold && <div className="invalid-feedback">{errors.minThreshold}</div>}
                        </div>
                        <button type="submit" className="btn btn-success" onClick={saveOrUpdateInventory}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default InventoryComponent;