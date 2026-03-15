import { useState } from 'react';
import { userService } from '../../services/userService';

export const useUserManagement = (setUsersList) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const initialFormState = {
    name: '',
    email: '',
    avatar: '',
    role: 'user'
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleShowModal = (user = null) => {
    if (user) {
      setCurrentUser(user);
      setFormData({
        name: user.name || '',
        email: user.email || '',
        avatar: user.avatar || '',
        role: user.role || 'user'
      });
    } else {
      setCurrentUser(null);
      setFormData(initialFormState);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentUser(null);
    setFormData(initialFormState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      let savedUser;

      if (currentUser) {
        savedUser = await userService.update(currentUser.id, payload);
        setUsersList(prev => prev.map(u => (u.id === currentUser.id ? savedUser : u)));
      } else {
        const newId = Date.now().toString();
        payload.id = newId;
        savedUser = await userService.create(payload);
        setUsersList(prev => [...prev, savedUser]);
      }
      handleCloseModal();
    } catch (err) {
      alert('Error saving user!');
      console.error(err);
    }
  };

  const handleShowConfirm = (user) => {
    setCurrentUser(user);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (currentUser) {
      try {
        await userService.delete(currentUser.id);
        setUsersList(prev => prev.filter(u => u.id !== currentUser.id));
        setShowDeleteModal(false);
        setCurrentUser(null);
      } catch (err) {
        alert('Error deleting user!');
      }
    }
  };

  return {
    showModal,
    currentUser,
    showDeleteModal,
    formData,
    handleInputChange,
    handleShowModal,
    handleCloseModal,
    handleSubmit,
    handleDelete,
    handleShowConfirm,
    setShowDeleteModal,
    setCurrentUser
  };
};
