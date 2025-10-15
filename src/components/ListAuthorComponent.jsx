import { useState, useEffect } from "react";
import { getAllAuthors, deleteAuthor } from "../services/AuthorService";
import {useNavigate} from "react-router-dom";

const AuthorListComponent = () => {
    const [authors, setAuthors] = useState([]);
    const navigate = useNavigate();

  function ListAllAuthors()
  {
      getAllAuthors().then((response) => {
          setAuthors(response.data);
          console.log(response);
      }).catch((error) => {
          console.log(error);
      })
  }

  function addAuthor(){
      navigate(`/add-author`);
  }

  function updateAuthor(id){
      navigate(`/edit-author/${id}`);
  }

  function removeAuthor(id){
      deleteAuthor(id).then((response) => {
          console.log(response);
          ListAllAuthors();
      })
  }

    useEffect(() => {
        ListAllAuthors();
    });

    return (
        <div className="container">
            <h2 className="text-center">Listado de Autores</h2>
            <button className="btn btn-primary mb-2" onClick={addAuthor}>Add Author</button>
            <table className="table table-bordered table-striped table-dark">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Address</th>
                    <th>Type</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {authors.map((author) => (
                    <tr key={author.id}>
                        <td>{author.id}</td>
                        <td>{author.firstName}</td>
                        <td>{author.lastName}</td>
                        <td>{author.address}</td>
                        <td>{author.type}</td>
                        <td>
                            <button className="btn btn-info" onClick={() =>updateAuthor(author.id)}>Update</button>
                            <button className="btn btn-danger ms-3" onClick={() =>removeAuthor(author.id)}>Delete</button>
                        </td>
                    </tr>)
                )
                }
                </tbody>
            </table>
        </div>
    )
}

export default AuthorListComponent;
