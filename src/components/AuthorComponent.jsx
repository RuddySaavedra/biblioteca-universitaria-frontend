import { useState, useEffect } from "react";
import { addAuthor, getAuthor, updateAuthor } from "../services/AuthorService.js";
import { useNavigate, useParams } from "react-router-dom";

const AuthorComponent = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
    });
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            getAuthor(id).then(response => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
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

        setErrors(errorsCopy);
        return valid;
    }

    function saveOrUpdateAuthor(event) {
        event.preventDefault();
        if (validateform()) {
            const author = {firstName, lastName};
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
                        <button type="submit" className="btn btn-success" onClick={saveOrUpdateAuthor}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AuthorComponent;