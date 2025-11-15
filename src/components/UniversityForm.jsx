'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UniversityForm({
  onSubmit,
  onCancel,
  editingId,
  universities,
}) {
  const [formData, setFormData] = useState({
    universityName: '',
    country: '',
    courseName: '',
    deadline: '',
    ieltsRequired: false,
    scholarshipAvailable: false,
    scholarshipAmount: '',
    additionalInfo: '',
    applyingLink: '',
    universityLink: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingId) {
      const university = universities.find((u) => u._id === editingId);
      if (university) {
        setFormData({
          universityName: university.universityName || '',
          country: university.country || '',
          courseName: university.courseName || '',
          deadline: university.deadline
            ? new Date(university.deadline).toISOString().split('T')[0]
            : '',
          ieltsRequired: university.ieltsRequired || false,
          scholarshipAvailable: university.scholarshipAvailable || false,
          scholarshipAmount: university.scholarshipAmount || '',
          additionalInfo: university.additionalInfo || '',
          applyingLink: university.applyingLink || '',
          universityLink: university.universityLink || '',
        });
      }
    }
  }, [editingId, universities]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {editingId ? 'Edit University Entry' : 'Add New University'}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 text-2xl"
        >
          ×
        </button>
      </div>

      <div className="space-y-6">
        {/* University Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            University Name <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            type="text"
            name="universityName"
            value={formData.universityName}
            onChange={handleChange}
            placeholder="e.g., University of Oxford"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="e.g., United Kingdom"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Course Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course/Program Name <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            placeholder="e.g., Master of Computer Science"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Deadline */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Application Deadline <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* IELTS Required Toggle */}
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200">
          <label className="text-sm font-medium text-gray-700">
            IELTS Required
          </label>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, ieltsRequired: !prev.ieltsRequired }))}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              formData.ieltsRequired
                ? 'bg-blue-500'
                : 'bg-gray-300'
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                formData.ieltsRequired ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
            <span className="sr-only">IELTS Required</span>
          </button>
          <span className="text-xs text-gray-600 font-semibold">
            {formData.ieltsRequired ? '✓ Required' : '✗ Not Required'}
          </span>
        </div>

        {/* Scholarship Available Toggle */}
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200">
          <label className="text-sm font-medium text-gray-700">
            Scholarship Available
          </label>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, scholarshipAvailable: !prev.scholarshipAvailable }))}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              formData.scholarshipAvailable
                ? 'bg-green-500'
                : 'bg-gray-300'
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                formData.scholarshipAvailable ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
            <span className="sr-only">Scholarship Available</span>
          </button>
          <span className="text-xs text-gray-600 font-semibold">
            {formData.scholarshipAvailable ? '✓ Yes' : '✗ No'}
          </span>
        </div>

        {/* Scholarship Amount */}
        {formData.scholarshipAvailable && (
          <div className="animate-in">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Scholarship Amount <span className="text-gray-400">(Optional)</span>
            </label>
            <input
              type="text"
              name="scholarshipAmount"
              value={formData.scholarshipAmount}
              onChange={handleChange}
              placeholder="e.g., 50% tuition or $10,000 per year"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        )}

        {/* Additional Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Information <span className="text-gray-400">(Optional)</span>
          </label>
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            placeholder="Add any additional notes or requirements..."
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Applying Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Application Link <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            type="url"
            name="applyingLink"
            value={formData.applyingLink}
            onChange={handleChange}
            placeholder="e.g., https://apply.university.edu/application"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* University Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            University Website Link <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            type="url"
            name="universityLink"
            value={formData.universityLink}
            onChange={handleChange}
            placeholder="e.g., https://www.university.edu"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : editingId ? 'Update Entry' : 'Add University'}
        </button>
      </div>
    </form>
  );
}
