import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Trash2, LogOut, Save, X, Loader2, AlertCircle } from 'lucide-react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { useAuth } from '../contexts/AuthContext';

export function DriverProfile() {
  const navigate = useNavigate();
  const { user, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    licenseNumber: '',
    vehicleLicenseNumber: '',
    nicNumber: '',
    vehicleType: '',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  });

  // Image cropper state
  const [image, setImage] = useState(null);
  const [cropper, setCropper] = useState(null);

   useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        licenseNumber: user.licenseNumber || '',
        vehicleLicenseNumber: user.vehicleLicenseNumber || '',
        nicNumber: user.nicNumber || '',
        vehicleType: user.vehicleType || '',
        profileImage: user.profileImage || formData.profileImage
      });
    }
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setShowImageModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = () => {
    if (cropper) {
      const croppedImage = cropper.getCroppedCanvas().toDataURL();
      setFormData({ ...formData, profileImage: croppedImage });
      setShowImageModal(false);
      setImage(null);
    }
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const result = await updateProfile(formData);
      if (result.success) {
        setIsEditing(false);
        setSuccessMessage('Profile updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      await fetch('/api/users/profile', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      logout();
      navigate('/role-selection');
    } catch (err) {
      setError('Failed to delete account. Please try again.');
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/role-selection');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-32 bg-orange-600">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <img
                  src={formData.profileImage}
                  alt={formData.name}
                  className="w-32 h-32 rounded-full border-4 border-white object-cover"
                />
                {isEditing && (
                  <label className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md cursor-pointer hover:bg-gray-50">
                    <Camera className="h-5 w-5 text-gray-600" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>