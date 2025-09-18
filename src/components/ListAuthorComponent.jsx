import { useState, useEffect } from "react";
import { getAllAuthors, deleteAuthor } from "../services/AuthorService"; // Ajusta la ruta según tu proyecto
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
      navigate(`/author`);
  }

  function updateAuthor(id){
      navigate(`/author/${id}`);
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
            <h2 className="text-center">Lista de Autores</h2>
            <button className="btn btn-primary" onClick={addAuthor}>Add Author</button>
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {authors.map((author) => (
                    <tr key={author.id}>
                        <td>{author.id}</td>
                        <td>{author.firstName}</td>
                        <td>{author.lastName}</td>
                        <td>{author.email}</td>
                        <td>
                            <button className="btn btn-info" onClick={() =>updateAuthor(author.id)}>Update</button>
                            <button className="btn btn-danger" onClick={() =>removeAuthor(author.id)} style={{marginLeft:'10px'}}>Delete</button>
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
