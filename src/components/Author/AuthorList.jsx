import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {getAllAuthors} from "../../services/AuthorService.js";

const AuthorList = () => {
    const [authors, setAuthors] = useState([]);
    const navigate = useNavigate();

    const loadAuthors = async () => {
        try {
            const res = await getAllAuthors();
            setAuthors(res.data);
        } catch (error) {
            console.error("Error loading authors: ", error);
        }
    };

    useEffect(() => {
        loadAuthors();
    }, []);

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Delete "
        })
    }
}