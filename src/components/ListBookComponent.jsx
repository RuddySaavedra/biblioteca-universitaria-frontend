import React from 'react'

const ListBookComponent = () => {
    const BookData = [
        {
            id: 1,
            title: 'Química',
            subject: 'Química General',
            isbn: '978-84-96837-15-4',
            publicationYear: 2013,
        },
        {
            id: 2,
            title: 'Cálculo Diferencial e Integral',
            subject: 'Matemáticas',
            isbn: '978-60-71509-93-3',
            publicationYear: 2018,
        },
        {
            id: 3,
            title: 'Fundamentos de Física',
            subject: 'Física',
            isbn: '978-11-19456-33-9',
            publicationYear: 2017,
        },
        {
            id: 4,
            title: 'Introducción a la Programación con C++',
            subject: 'Informática',
            isbn: '978-84-20545-63-2',
            publicationYear: 2015,
        },
        {
            id: 5,
            title: 'Microeconomía: Principios y Aplicaciones',
            subject: 'Economía',
            isbn: '978-60-71508-02-8',
            publicationYear: 2014,
        },
        {
            id: 6,
            title: 'Historia de América Latina',
            subject: 'Historia',
            isbn: '978-84-37622-55-1',
            publicationYear: 2011,
        },
        {
            id: 7,
            title: 'Psicología del Aprendizaje',
            subject: 'Psicología',
            isbn: '978-60-74811-23-1',
            publicationYear: 2016,
        },
        {
            id: 8,
            title: 'Mecánica de Materiales',
            subject: 'Ingeniería',
            isbn: '978-60-74813-87-7',
            publicationYear: 2019,
        },
        {
            id: 9,
            title: 'Sociología Contemporánea',
            subject: 'Sociología',
            isbn: '978-60-75191-37-0',
            publicationYear: 2020,
        },
        {
            id: 10,
            title: 'Derecho Constitucional Comparado',
            subject: 'Derecho',
            isbn: '978-84-99820-60-3',
            publicationYear: 2012,
        }
    ]

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
                {BookData.map((book) => (
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

export default ListBookComponent