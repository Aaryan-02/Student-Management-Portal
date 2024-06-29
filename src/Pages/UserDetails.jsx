import React, { useState } from 'react';
import userData from '../Data/userData.json';
import Menu from '../Components/Menu';
import EditUserForm from '../Components/EditUserForm';
import Pagination from '../Components/Pagination';

const UserTable = ({ users, setUsers }) => {
  const [sortOrder, setSortOrder] = useState({ column: 'username', order: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [modal, setModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    if (currentPage > Math.ceil(updatedUsers.length / itemsPerPage)) {
      setCurrentPage(Math.ceil(updatedUsers.length / itemsPerPage));
    }
  };

  const filterUsers = (users, term) => {
    return users.filter((user) => {
      const searchableColumns = ['username', 'email', 'phone', 'course'];

      return searchableColumns.some((column) => user[column].toLowerCase().includes(term.toLowerCase()));
    });
  };

  const handleSearch = () => {
    const filteredUsers = filterUsers(userData.users, searchTerm);
    setUsers(filteredUsers);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setUsers(userData.users);
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleSortOption = (option, column) => {
    const sortedUsers = [...users];
    sortedUsers.sort((a, b) => {
      return option === 'asc' ? a[column].localeCompare(b[column]) : b[column].localeCompare(a[column]);
    });
    setUsers(sortedUsers);
    setSortOrder({ column, order: option });
  };

  const handleEdit = (userId) => {
    const userToEdit = users.find(user => user.id === userId);
    setSelectedUser(userToEdit);
    setModal(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModal(false);
  };

  const handleSaveUser = (updatedUser) => {
    console.log('Updating user:', updatedUser);
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers([...updatedUsers]);
    closeModal();
  };

  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  return (
    <div className="flex justify-center items-center flex-col h-[90vh] bg-gray-800">
      <div className="flex items-center flex-col mb-4 sm:flex-row">
        <input type="text" placeholder="Search for students..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="px-4 py-2 border rounded-l focus:outline-none w-full sm:w-64"
        />
        <div className="mt-2 sm:mt-0 sm:ml-2">
          <button onClick={handleSearch} className="bg-indigo-600 text-white px-4 py-2 rounded-tl rounded-bl sm:rounded-l sm:rounded-t hover:bg-indigo-700 focus:outline-none"
          >
            Search
          </button>
          <button onClick={handleClearSearch} className="bg-gray-500 text-white px-4 py-2 rounded-tr rounded-br sm:rounded-r sm:rounded-b ml-2 sm:ml-0 hover:bg-gray-600 focus:outline-none"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="max-w-5xl overflow-auto">
        <table className="table-auto border-collapse sm:w-36 md:w-full h-3/4 bg-white shadow-md over">
          <thead className="text-left">
            <tr className="bg-indigo-800 text-white md:text-2xl sm:tect-sm">
              <th className="py-2 px-2 sm:py-1 sm:px-1">ID</th>
              <Menu column="username" sortOrder={sortOrder} handleSortOption={(option) => handleSortOption(option, 'username')}>Username</Menu>
              <Menu column="email" sortOrder={sortOrder} handleSortOption={(option) => handleSortOption(option, 'email')}>Email</Menu>
              <Menu column="phone" sortOrder={sortOrder} handleSortOption={(option) => handleSortOption(option, 'phone')}>Phone</Menu>
              <Menu column="phone" sortOrder={sortOrder} handleSortOption={(option) => handleSortOption(option, 'course')}>Course</Menu>
              <th className="py-2 px-2 sm:py-4 sm:px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((user) => (
              <tr key={user.id} className="border-t border-gray-300 md:text-lg">
                <td className="px-2 py-2 sm:px-3 sm:py-3">{user.id}</td>
                <td className="px-2 py-2 sm:px-3 sm:py-3">{user.username}</td>
                <td className="px-2 py-2 sm:px-3 sm:py-3">{user.email}</td>
                <td className="px-2 py-2 sm:px-3 sm:py-3">{user.phone}</td>
                <td className="px-2 py-2 sm:px-3 sm:py-3">{user.course}</td>
                <td className="px-2 py-2 sm:px-3 sm:py-3">
                  <button className="text-blue-600 mr-2">
                    <span className="border border-blue-600 hover:border-blue-800 hover:text-blue-900 px-2 py-1 rounded transition duration-300 font-bold w-10" onClick={() => handleEdit(user.id)}>
                      Edit
                    </span>
                  </button>
                  <button className="text-red-600" onClick={() => handleDelete(user.id)}>
                    <span className="border border-red-600 hover:border-red-800 hover:text-red-900 px-2 py-1 rounded transition duration-300 font-bold w-10">
                      Delete
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
      </div>

      {modal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <EditUserForm user={selectedUser} onSave={handleSaveUser} onCancel={closeModal} />
        </div>
      )}
    </div>
  );
};


export default UserTable;
