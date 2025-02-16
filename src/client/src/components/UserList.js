import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { CTable, CTableHead, CTableHeaderCell, CTableBody, CTableRow, CTableDataCell, CButton } from '@coreui/react';

const UserList = ({ onEdit, refresh }) => {
    const [users, setUsers] = useState([]);
    const [responseMessage, setResponseMessage] = useState("");

    useEffect(() => {
        $.ajax({
            url: "http://127.0.0.1:5000/api/users",
            type: "GET",
            dataType: "json",
            success: (response) => {
                setUsers(response)
            }
        })

    }, [refresh]); // Fetch data when `refresh` prop changes

    const handleDelete = (id) => {
        $.ajax({
            url: `http://127.0.0.1:5000/api/users/${id}`,
            type: 'DELETE',
            success: (response) => {
                setUsers(users.filter(user => user.id !== id));
                setResponseMessage(response.message);
            },
            error: (xhr, status, error) => {
                console.error('Error:', error);
            }
        });
    };

    return (
        <div className="container mt-5">
            <h2>User List</h2>
            {responseMessage && <p>{responseMessage}</p>}
            <CTable>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell>ID</CTableHeaderCell>
                        <CTableHeaderCell>Name</CTableHeaderCell>
                        <CTableHeaderCell>Email</CTableHeaderCell>
                        <CTableHeaderCell>Age</CTableHeaderCell>
                        <CTableHeaderCell>Bod</CTableHeaderCell>
                        <CTableHeaderCell>Actions</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {users.map(user => (
                        <CTableRow key={user.id}>
                            <CTableDataCell>{user.id}</CTableDataCell>
                            <CTableDataCell>{user.name}</CTableDataCell>
                            <CTableDataCell>{user.email}</CTableDataCell>
                            <CTableDataCell>{user.age}</CTableDataCell>
                            <CTableDataCell>{user.bod}</CTableDataCell>
                            <CTableDataCell>
                                <CButton color="info" onClick={() => onEdit(user)}>Edit</CButton>
                                <CButton color="danger" onClick={() => handleDelete(user.id)}>Delete</CButton>
                            </CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
        </div>
    );
};

export default UserList;