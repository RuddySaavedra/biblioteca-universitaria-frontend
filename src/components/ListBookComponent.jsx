import { useEffect, useState } from "react";
import { getAllBooks, deleteBook} from "../services/BookService.js";
import {useNavigate} from "react-router-dom";

const BookListComponent = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    function ListAllBooks()
    {
        getAllBooks().then((response) => {
            setBooks(response.data);
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    }

    function addBook(){
        navigate('/add-book');
    }

    function updateBook(id) {
        navigate(`/edit-book/${id}`);
    }

    function removeBook(id) {
        deleteBook(id).then((response) => {
            console.log(response);
            ListAllBooks();
        })
    }

    useEffect(() => {
        ListAllBooks();
    });

    return (
        <div className='container'>
            <h2 className='text-center'>Listado de Libros</h2>
            <button className="btn btn-primary mb-2" onClick={addBook}>Add Book</button>
            <table className='table table-striped table-dark table-bordered'>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Subject</th>
                    <th>ISBN</th>
                    <th>Publication Year</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {books.map((book) => (
                    <tr key={book.id}>
                        <td>{book.id}</td>
                        <td>{book.title}</td>
                        <td>{book.subject}</td>
                        <td>{book.isbn}</td>
                        <td>{book.publicationYear}</td>
                        <td>
                            <button className='btn btn-info' onClick={()=>updateBook(book.id)}>Update</button>
                            <button className='btn btn-danger ms-3' onClick={()=>removeBook(book.id)}>Delete</button>
                        </td>
                    </tr>)
                )
                }
                </tbody>
            </table>
        </div>
    )
}

export default BookListComponent;