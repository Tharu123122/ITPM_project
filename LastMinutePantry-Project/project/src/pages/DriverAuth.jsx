import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Truck, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function DriverAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    address: '',
    city: '',
    licenseNumber: '',
    vehicleLicenseNumber: '',
    nicNumber: '',
    vehicleType: ''
  });

  const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    
    const navigate = useNavigate();
    const location = useLocation();
    const { login, register, user } = useAuth();

    useEffect(() => {
    if (user) {
      if (user.role !== 'driver') {
        setError('Access denied. This login is for drivers only.');
        return;
      }
      navigate('/drivers');
    }
  }, [user, navigate]);

  const validateForm = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (!isLogin && formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    if (!isLogin) {
      if (!formData.name) errors.name = 'Full name is required';
      if (!formData.phone) errors.phone = 'Phone number is required';
      if (!formData.address) errors.address = 'Address is required';
      if (!formData.city) errors.city = 'City is required';
      if (!formData.licenseNumber) errors.licenseNumber = 'Driver license number is required';
      if (!formData.vehicleLicenseNumber) errors.vehicleLicenseNumber = 'Vehicle license number is required';
      if (!formData.nicNumber) errors.nicNumber = 'NIC number is required';
      if (!formData.vehicleType) errors.vehicleType = 'Vehicle type is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }
