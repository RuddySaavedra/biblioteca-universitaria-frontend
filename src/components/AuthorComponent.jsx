import { useState, useEffect } from "react";
import { addAuthor, getAuthor, updateAuthor } from "../services/AuthorService.js";
import { useNavigate, useParams } from "react-router-dom";

const AuthorComponent = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        birthDate: "",
    });
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            getAuthor(id).then(response => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setAddress(response.data.address);
                setEmail(response.data.email);
                setBirthDate(response.data.birthDate);
            })
        }
    }, [id]);

    function validateform() {
        let valid = true;

        const errorsCopy = {...errors};
        if (firstName.trim()) {
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'First Name required';
            valid = false;
        }

        if (lastName.trim()) {
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Last Name required';
            valid = false;
        }

        if (address.trim()) {
            errorsCopy.address = '';
        } else {
            errorsCopy.address = 'Address required';
            valid = false;
        }

        // Validación para ver si está vacío
        if (email.trim()) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Email required';
            valid = false;
        }

        // Validación de formato
        if (email.trim()) {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                errorsCopy.email = 'Email is not valid';
                valid = false;
            }
        }

        // Validación para ver si está vacío
        if (birthDate.trim()) {
            errorsCopy.birthDate = '';
        } else {
            errorsCopy.birthDate = 'Birth Date required';
            valid = false;
        }

        // Validar que la fecha de nacimiento no sea en el futuro
        if (birthDate.trim()) {
            const today = new Date();
            const selectedDate = new Date(birthDate);

            if (selectedDate > today) {
                errorsCopy.birthDate = "Birth Date cannot be in the future";
                valid = false;
            }
        }

        setErrors(errorsCopy);
        return valid;
    }

    function saveOrUpdateAuthor(event) {
        event.preventDefault();
        if (validateform()) {
            const author = {firstName, lastName, address, email, birthDate};  // Nueva propiedad
            if (id) {
                updateAuthor(id, author).then(response => {
                    console.log(response.data);
                    navigate('/authors');
                }).catch(error => {
                    console.log(error);
                })
            } else {
                addAuthor(author).then(response => {
                    console.log(response.data);
                    navigate('/authors');
                }).catch(error => {
                    console.log(error);
                })
            }
        }
    }

    function pageTitle() {
        if (id) {
            return <h2 className="text-center">Update Author</h2>;
        } else {
            return <h2 className="text-center">Add Author</h2>;
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
                            <label className="form-label">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={firstName}
                                placeholder="Enter First Name"
                                className={`form-control ${errors.firstName ? 'is-invalid' : ""}`}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                        </div>
                        <div className="form-group mb-3">
                            <label>Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={lastName}
                                placeholder="Enter Last Name"
                                className={`form-control ${errors.lastName ? 'is-invalid' : ""}`}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                        </div>
                        <div className="form-group mb-3">
                            <label>Address</label>
                            <input
                                type="text"
                                name="address"
                                value={address}
                                placeholder="Enter address"
                                className={`form-control ${errors.address ? 'is-invalid' : ""}`}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                        </div>
                        <div className="form-group mb-3">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                placeholder="Enter email"
                                className={`form-control ${errors.email ? 'is-invalid' : ""}`}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        <div className="form-group mb-3">
                            <label>Birth Date</label>
                            <input
                                type="date"
                                name="birthDate"
                                value={birthDate}
                                placeholder="Enter Birth Date"
                                className={`form-control ${errors.birthDate ? 'is-invalid' : ""}`}
                                onChange={(e) => setBirthDate(e.target.value)}
                            />
                            {errors.birthDate && <div className="invalid-feedback">{errors.birthDate}</div>}
                        </div>
                        <button type="submit" className="btn btn-success" onClick={saveOrUpdateAuthor}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AuthorComponent;