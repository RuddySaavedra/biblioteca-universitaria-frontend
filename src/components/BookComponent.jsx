import {useEffect, useState} from "react";
import {addBook, getBook, updateBook} from "../services/BookService.js";
import { useNavigate, useParams } from "react-router-dom";

const BookComponent = () => {
    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [isbn, setIsbn] = useState("");
    const [publicationYear, setPublicationYear] = useState("");
    const [errors, setErrors] = useState({
        title: "",
        subject: "",
        isbn: "",
        publicationYear: "",
    });
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
        if (id) {
            getBook(id).then(response => {
                setTitle(response.data.title);
                setSubject(response.data.subject);
                setIsbn(response.data.isbn);
                setPublicationYear(response.data.publicationYear);
            })
        }
    }, [id]);

    function validateForm() {
        let valid = true;

        const errorsCopy = {...errors};
        if (title.trim()) {
            errorsCopy.title = '';
        } else {
            errorsCopy.title = 'Title required';
            valid = false;
        }

        if (subject.trim()) {
            errorsCopy.subject = '';
        } else {
            errorsCopy.subject = 'Subject required';
            valid = false;
        }

        if (isbn.trim()) {
            errorsCopy.isbn = '';
        } else {
            errorsCopy.isbn = 'ISBN required';
            valid = false;
        }

        if (publicationYear.trim()) {
            errorsCopy.publicationYear = '';
        } else {
            errorsCopy.publicationYear = 'Publication Year required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function saveOrUpdateBook(event) {
        event.preventDefault();
        if (validateForm()) {
            const book = {title, subject, isbn, publicationYear};
            if (id) {
                updateBook(id, book).then(response => {
                    console.log(response.data);
                    navigate('/books');
                }).catch(error => {
                    console.log(error);
                })
            } else {
                addBook(book).then(response => {
                    console.log(response.data);
                    navigate('/books');
                }).catch(error => {
                    console.log(error);
                })
            }
        }
    }

    function pageTitle() {
        if (id) {
            return <h2 className="text-cemter">Update Book</h2>;
        } else {
            return <h2 className="text-cemter">Add Book</h2>;
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
                            <label className="form-label">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={title}
                                placeholder="Enter Title"
                                className={`form-control ${errors.title ? errors.title : ""}`}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={subject}
                                placeholder="Enter Subject"
                                className={`form-control ${errors.subject ? errors.subject : ""}`}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                            {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">ISBN</label>
                            <input
                                type="text"
                                name="isbn"
                                value={isbn}
                                placeholder="Enter ISBN"
                                className={`form-control ${errors.isbn ? errors.isbn : ""}`}
                                onChange={(e) => setIsbn(e.target.value)}
                            />
                            {errors.isbn && <div className="invalid-feedback">{errors.isbn}</div>}
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Publication Year</label>
                            <input
                                type="number"
                                name="publicationYear"
                                value={publicationYear}
                                className={`form-control ${errors.publicationYear ? errors.publicationYear : ""}`}
                                onChange={(e) => setPublicationYear(e.target.value)}
                            />
                            {errors.publicationYear && <div className="invalid-feedback">{errors.publicationYear}</div>}
                        </div>
                        <button type="submit" className="btn btn-success" onClick={saveOrUpdateBook}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BookComponent;