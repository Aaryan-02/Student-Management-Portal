import React, { useState, useEffect } from 'react';

const EditUserForm = ({ user, onSave, onCancel }) => {
    const [editedUser, setEditedUser] = useState(user);

    useEffect(() => {
        setEditedUser(user);
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSave = () => {
        onSave(editedUser);
    };

    return (
        <div className="modal-container bg-indigo-800 w-96 p-4 rounded-md relative z-10">
            <div className="flex justify-end">
                <button className="text-gray-700 text-lg bg-red-500 rounded-full hover:bg-red-600 focus:outline-none" style={{ width: '2rem', height: '2rem' }} onClick={onCancel}>
                    X
                </button>
            </div>
            <div className="content text-center text-white mt-2">
                <div className="mb-4">
                    <span className="text-lg font-bold text-gray-300">Username:</span>
                    <input type="text" name="username" value={editedUser.username} onChange={handleChange} className="text-md font-semibold text-black px-2 py-1"
                    />
                </div>
                <div className="mb-4">
                    <span className="text-lg font-bold text-gray-300">Email:</span>
                    <input type="text" name="email" value={editedUser.email} onChange={handleChange} className="text-md font-semibold text-black px-2 py-1"
                    />
                </div>
                <div className="mb-4">
                    <span className="text-md font-bold text-gray-300">Phone:</span>
                    <input type="text" name="phone" value={editedUser.phone} onChange={handleChange} className="text-md font-semibold text-black px-2 py-1"
                    />
                </div>
                <div className="mb-4">
                    <span className="text-md font-bold text-gray-300">Course:</span>
                    <input type="text" name="course" value={editedUser.course || ''} onChange={handleChange} className="text-md font-semibold text-black px-2 py-1" />
                </div>
                <div className="flex justify-center mt-6">
                    <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded" onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditUserForm;
