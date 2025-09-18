import { useEffect, useState } from "react";
import { getAllInventories, deleteInventory} from "../services/InventoryService.js";
import {useNavigate} from "react-router-dom";

const InventoryListComponent = () => {
    const [inventories, setInventories] = useState([]);
    const navigate = useNavigate();

    function ListAllInventories()
    {
        getAllInventories().then((response) => {
            setInventories(response.data);
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    }

    function addInventory(){
        navigate('/add-inventory');
    }

    function updateInventory(id) {
        navigate(`/edit-inventory/${id}`);
    }

    function removeInventory(id) {
        deleteInventory(id).then((response) => {
            console.log(response);
            ListAllInventories();
        })
    }

    useEffect(() => {
        ListAllInventories();
    });

    return (
        <div className='container'>
            <h2 className='text-center'>Listado de Inventarios</h2>
            <button className="btn btn-primary mb-2" onClick={addInventory}>Add Inventory</button>
            <table className='table table-striped table-dark table-bordered'>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Total Copies</th>
                    <th>Available Copies</th>
                    <th>Minimum Required</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {inventories.map((inventory) => (
                    <tr key={inventory.id}>
                        <td>{inventory.id}</td>
                        <td>{inventory.totalCopies}</td>
                        <td>{inventory.availableCopies}</td>
                        <td>{inventory.minThreshold}</td>
                        <td>
                            <button className='btn btn-info' onClick={()=>updateInventory(inventory.id)}>Update</button>
                            <button className='btn btn-danger ms-3' onClick={()=>removeInventory(inventory.id)}>Delete</button>
                        </td>
                    </tr>)
                )
                }
                </tbody>
            </table>
        </div>
    )
}

export default InventoryListComponent;