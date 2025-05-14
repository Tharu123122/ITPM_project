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