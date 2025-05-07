import { useState, useEffect } from 'react';
import { Search, Edit2, Trash2, AlertCircle, Loader2, Download, MapPin, Truck } from 'lucide-react';
import { AdminSidebar } from '../components/AdminSidebar';

export function AdminDeliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('/api/deliveries', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch deliveries');
      }
      
      const data = await response.json();
      setDeliveries(data);
    } catch (err) {
      setError('Failed to load deliveries. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (deliveryId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/deliveries/${deliveryId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update delivery status');
      }

      const updatedDelivery = await response.json();
      setDeliveries(deliveries.map(delivery => 
        delivery._id === deliveryId ? updatedDelivery : delivery
      ));
    } catch (err) {
      setError('Failed to update delivery status. Please try again.');
    }
  };

  const handleDeleteDelivery = async (deliveryId) => {
    if (!window.confirm('Are you sure you want to delete this delivery?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/deliveries/${deliveryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete delivery');
      }

      setDeliveries(deliveries.filter(delivery => delivery._id !== deliveryId));
    } catch (err) {
      setError('Failed to delete delivery. Please try again.');
    }
  };

  const handleDownloadReport = () => {
    // Prepare data for CSV
    const reportData = deliveries.map(delivery => ({
      'Delivery ID': delivery._id,
      'Order ID': delivery.order._id,
      'Customer Name': delivery.customer.name,
      'Customer Email': delivery.customer.email,
      'Delivery Address': `${delivery.address.street}, ${delivery.address.city}, ${delivery.address.postalCode}`,
      'Preferred Time': delivery.preferredTime,
      Status: delivery.status,
      'Driver Name': delivery.driver?.name || 'Not Assigned',
      'Driver Phone': delivery.driver?.phone || 'N/A',
      'Created At': new Date(delivery.createdAt).toLocaleDateString()
    }));

    // Convert to CSV
    const headers = Object.keys(reportData[0]);
    const csv = [
      headers.join(','),
      ...reportData.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `deliveries-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesSearch = 
      delivery.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.address.street.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.address.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || delivery.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'assigned':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminSidebar />
        <div className="ml-64 p-8 flex items-center justify-center">
          <div className="flex items-center gap-2 text-purple-600">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading deliveries...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Delivery Management</h1>
            <p className="text-gray-600">Manage all deliveries and track their status</p>
          </div>
          <button
            onClick={handleDownloadReport}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Download className="h-5 w-5" />
            Download Report
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by customer, address, or delivery ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="assigned">Assigned</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Deliveries Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Driver
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDeliveries.map((delivery) => (
                <tr key={delivery._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Truck className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          #{delivery._id}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(delivery.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {delivery.customer.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {delivery.customer.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <div className="text-sm text-gray-900">
                        {delivery.address.street}, {delivery.address.city}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      Preferred Time: {delivery.preferredTime}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {delivery.driver ? (
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {delivery.driver.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {delivery.driver.phone}
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Not Assigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={delivery.status}
                      onChange={(e) => handleUpdateStatus(delivery._id, e.target.value)}
                      className={`px-2 py-1 text-xs rounded-full font-semibold ${getStatusColor(delivery.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="assigned">Assigned</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDeleteDelivery(delivery._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}