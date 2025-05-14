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