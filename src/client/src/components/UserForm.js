import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { CForm, CFormInput, CFormLabel, CButton } from '@coreui/react';

const UserForm = ({ selectedUser, onFormSubmit, onReset, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        bod: ''
    });
    const [id, setId] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [label, setLabel] = useState("Create User");

    useEffect(() => {
        if (selectedUser) {
            setLabel('Update User')
            setId(selectedUser.id)
            setFormData({
                name: selectedUser.name,
                email: selectedUser.email,
                age: selectedUser.age,
                bod: selectedUser.bod 
            });
        } else {
            setLabel('Create User')
            resetForm();
        }
    }, [selectedUser]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFormSubmit();
        if (label === 'Update User') {
            $.ajax({
                url: `http://127.0.0.1:5000/api/users/${id}`,
                method: "PUT",
                data: JSON.stringify(formData),
                contentType: "application/json",
                dataType: "json",
                success: (response) => {
                    setResponseMessage(response.message); // Handle success response
                    resetForm();
                    onSuccess()
                },
                error: (xhr, status, error) => {
                    console.error("API request failed:", error);
                    setResponseMessage("Error submitting data!");
                }
            })
        }
        else {
            delete formData.id
            $.ajax({
                url: "http://127.0.0.1:5000/api/users",
                method: "POST",
                data: JSON.stringify(formData),
                contentType: "application/json",
                dataType: "json",
                success: (response) => {
                    setResponseMessage(response.message); // Handle success response
                    resetForm();
                    onSuccess()
                },
                error: (xhr, status, error) => {
                    console.error("API request failed:", error);
                    setResponseMessage("Error submitting data!");
                }
            })
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            age: '',
            bod: ''
        });
    };

    const handleReset = () => {
        resetForm();
        onReset();
    };

    return (
        <div className="container mt-5">
            <h2>{label}</h2>
            <CForm onSubmit={handleSubmit}>
                <div className="mb-3">
                    <CFormLabel htmlFor="name">Name</CFormLabel>
                    <CFormInput
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <CFormLabel htmlFor="email">Email</CFormLabel>
                    <CFormInput
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <CFormLabel htmlFor="age">Age</CFormLabel>
                    <CFormInput
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        min="18"
                    />
                </div>
                <div className="mb-3">
                    <CFormLabel htmlFor="bod">Date of Birth</CFormLabel>
                    <CFormInput
                        type="date"
                        id="bod"
                        name="bod"
                        value={formData.bod}
                        onChange={handleChange}
                        required
                    />
                </div>
                <CButton type="submit" color="primary">{selectedUser ? 'Update' : 'Submit'}</CButton>
                <CButton type="button" color="secondary" onClick={handleReset}>Reset</CButton>
            </CForm>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default UserForm;
