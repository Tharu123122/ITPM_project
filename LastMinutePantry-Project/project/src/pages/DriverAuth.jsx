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