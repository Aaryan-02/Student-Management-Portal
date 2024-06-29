import './index.css';
import Header from './Components/Header';
import UserDetails from "./Pages/UserDetails";
import AccountCreation from './Pages/AccountCreation';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import userData from './Data/userData.json';
import { useState } from 'react';


function App() {
  const [users, setUsers] = useState(userData.users);

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<UserDetails users={users} setUsers={setUsers} />} />
        <Route path="/createAccount" element={<AccountCreation addUser={addUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
