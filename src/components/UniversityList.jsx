'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import UniversityCard from './UniversityCard';
import UniversityForm from './UniversityForm';
import UniversityDetails from './UniversityDetails';

export default function UniversityList() {
  const router = useRouter();
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [viewingUniversity, setViewingUniversity] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  const [filterDeadline, setFilterDeadline] = useState('');
  const [filterScholarship, setFilterScholarship] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      sessionStorage.removeItem('authenticated');
      router.push('/login');
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/universities');
      setUniversities(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching universities:', err);
      setError('Failed to load universities. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setEditingId(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingId(null);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingId) {
        await axios.put(`/api/universities/${editingId}`, formData);
        setSuccess('University entry updated successfully!');
      } else {
        await axios.post('/api/universities', formData);
        setSuccess('University entry added successfully!');
      }
      await fetchUniversities();
      handleFormClose();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Error saving university:', err);
      if (err.response?.status === 409) {
        setError('This university entry already exists!');
      } else {
        setError(err.response?.data?.error || 'Failed to save university entry');
      }
    }
  };

  const handleEdit = (university) => {
    setEditingId(university._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      try {
        await axios.delete(`/api/universities/${id}`);
        setSuccess('University entry deleted successfully!');
        await fetchUniversities();
        setTimeout(() => setSuccess(null), 3000);
      } catch (err) {
        console.error('Error deleting university:', err);
        setError('Failed to delete university entry');
      }
    }
  };

  const handleViewUniversity = (university) => {
    setViewingUniversity(university);
  };

  const handleCloseDetails = () => {
    setViewingUniversity(null);
  };

  // Get unique countries for filter
  const countries = [...new Set(universities.map((u) => u.country).filter(Boolean))];

  // Filter universities
  let filteredUniversities = universities;

  if (searchTerm) {
    filteredUniversities = filteredUniversities.filter(
      (u) =>
        u.universityName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.courseName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (filterCountry) {
    filteredUniversities = filteredUniversities.filter(
      (u) => u.country === filterCountry
    );
  }

  if (filterScholarship === 'yes') {
    filteredUniversities = filteredUniversities.filter(
      (u) => u.scholarshipAvailable
    );
  }

  if (filterDeadline === 'urgent') {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const in7Days = new Date(today);
    in7Days.setDate(in7Days.getDate() + 7);
    filteredUniversities = filteredUniversities.filter((u) => {
      if (!u.deadline) return false;
      const deadlineDate = new Date(u.deadline);
      deadlineDate.setHours(0, 0, 0, 0);
      return deadlineDate <= in7Days && deadlineDate >= today;
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                University Admission Tracker
              </h1>
              <p className="text-gray-600 mt-2">
                Track your university applications and deadlines
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleAddClick}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
              >
                + Add University
              </button>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Success/Error Messages */}
      {success && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-4 rounded-lg flex justify-between items-center">
            <span>{success}</span>
            <button
              onClick={() => setSuccess(null)}
              className="text-green-600 hover:text-green-800"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-4 rounded-lg flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-800"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <UniversityForm
              onSubmit={handleFormSubmit}
              onCancel={handleFormClose}
              editingId={editingId}
              universities={universities}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        {universities.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Search & Filter
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Search by university or course..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={filterCountry}
                onChange={(e) => setFilterCountry(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Countries</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <select
                value={filterScholarship}
                onChange={(e) => setFilterScholarship(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Scholarships</option>
                <option value="yes">With Scholarship</option>
              </select>
              <select
                value={filterDeadline}
                onChange={(e) => setFilterDeadline(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Deadlines</option>
                <option value="urgent">Urgent (7 days)</option>
              </select>
            </div>
          </div>
        )}

        {/* Universities Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="text-gray-600 mt-4">Loading universities...</p>
          </div>
        ) : filteredUniversities.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-4 text-5xl">📚</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              {universities.length === 0
                ? 'No universities yet'
                : 'No universities match your filters'}
            </h3>
            <p className="text-gray-600 mb-6">
              {universities.length === 0
                ? 'Get started by adding your first university application!'
                : 'Try adjusting your search or filter criteria.'}
            </p>
            {universities.length === 0 && (
              <button
                onClick={handleAddClick}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add Your First University
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredUniversities.map((university) => (
              <UniversityCard
                key={university._id}
                university={university}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleViewUniversity}
              />
            ))}
          </div>
        )}

        {/* University Details Modal */}
        {viewingUniversity && (
          <UniversityDetails
            university={viewingUniversity}
            onClose={handleCloseDetails}
          />
        )}
      </main>
    </div>
  );
}
