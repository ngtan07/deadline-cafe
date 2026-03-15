import { useState } from 'react';
import { cafeService } from '../../services/cafeService';

export const useCafeManagement = (locationsList, setCafesList) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentCafe, setCurrentCafe] = useState(null);

  const initialFormState = {
    name: '',
    image: '',
    locationId: '',
    address: '',
    rating: 5.0,
    priceMin: '',
    priceMax: '',
    openHours: '',
    description: '',
    amenities: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleShowModal = (cafe = null) => {
    if (cafe) {
      setCurrentCafe(cafe);
      setFormData({
        ...cafe,
        priceMin: cafe.priceRange?.min || '',
        priceMax: cafe.priceRange?.max || '',
        amenities: Array.isArray(cafe.amenities) ? cafe.amenities.join(', ') : cafe.amenities
      });
    } else {
      setCurrentCafe(null);
      setFormData({
        ...initialFormState,
        locationId: locationsList?.[0]?.id || ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCafeData = {
      ...formData,
      rating: parseFloat(formData.rating),
      amenities: formData.amenities.split(',').map(item => item.trim()).filter(Boolean),
      priceRange: {
        min: parseInt(formData.priceMin) || 0,
        max: parseInt(formData.priceMax) || 0
      }
    };

    delete newCafeData.priceMin;
    delete newCafeData.priceMax;

    try {
      if (currentCafe) {
        const updatedCafe = await cafeService.update(currentCafe.id, newCafeData);
        setCafesList(prev => prev.map(c => c.id === currentCafe.id ? updatedCafe : c));
      } else {
        const addedCafe = await cafeService.create(newCafeData);
        setCafesList(prev => [...prev, addedCafe]);
      }
      handleCloseModal();
    } catch (err) {
      alert('Có lỗi xảy ra khi lưu dữ liệu!');
    }
  };


  const handleShowConfirm = (cafe) => {
    setCurrentCafe(cafe);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (currentCafe) {
      try {
        await cafeService.delete(currentCafe.id);
        setCafesList(prev => prev.filter(c => c.id !== currentCafe.id));
        setShowDeleteModal(false);
        setCurrentCafe(null);
      } catch (err) {
        alert('Error deleting cafe!');
      }
    }
  };

  return {
    showModal,
    currentCafe,
    showDeleteModal,
    formData,
    handleInputChange,
    handleShowModal,
    handleCloseModal,
    handleSubmit,
    handleDelete,
    handleShowConfirm,
    setShowDeleteModal
  };
};
