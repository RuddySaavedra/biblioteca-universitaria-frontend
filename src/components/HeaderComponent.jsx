import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderComponent = () => {
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="/">
                        Biblioteca Universitaria
                    </a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/books">Books</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/authors">Authors</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/students">Students</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/inventories">Inventories</NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default HeaderComponent;