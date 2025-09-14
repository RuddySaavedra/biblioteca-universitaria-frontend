import { useEffect, useState } from "react";
import { getAllBooks } from "../services/BookService.js";

function BookListComponent() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        getAllBooks().then((response) => {
            setBooks(response.data);
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    })

    return (
        <div className='container'>
            <h2 className='text-center'>Listado de Libros</h2>
            <table className='table table-striped table-dark table-bordered'>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Subject</th>
                    <th>ISBN</th>
                    <th>Publication Year</th>
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
                    </tr>)
                )
                }
                </tbody>
            </table>
        </div>
    )
}

export default BookListComponent;