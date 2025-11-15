'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { formatDate, getDaysUntilDeadline, getDeadlineUrgency, getUrgencyColor, getUrgencyLabel } from '@/lib/utils';

export default function UniversityDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/universities/${params.id}`);
        setUniversity(response.data);
      } catch (err) {
        console.error('Error fetching university:', err);
        setError('Failed to load university details');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchUniversity();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading university details...</p>
        </div>
      </div>
    );
  }

  if (error || !university) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error || 'University not found'}</p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const urgency = getDeadlineUrgency(university.deadline);
  const daysLeft = getDaysUntilDeadline(university.deadline);
  const urgencyLabel = getUrgencyLabel(daysLeft);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <button
        onClick={() => router.push('/')}
        className="mb-6 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors font-medium inline-flex items-center gap-2"
      >
        ← Back to List
      </button>

      <div className="max-w-4xl mx-auto">
        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Header with Color Bar */}
          <div className={`h-2 ${
            urgency === 'urgent' ? 'bg-red-500' : 
            urgency === 'warning' ? 'bg-yellow-500' : 
            urgency === 'upcoming' ? 'bg-blue-500' : 
            'bg-green-500'
          }`}></div>

          {/* Content */}
          <div className="p-8">
            {/* Title Section */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {university.universityName}
              </h1>
              
              {/* Quick Info Badges */}
              <div className="flex flex-wrap gap-3 mb-4">
                {university.country && (
                  <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg font-semibold">
                    📍 {university.country}
                  </span>
                )}
                {university.ieltsRequired ? (
                  <span className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-semibold">
                    🎯 IELTS Required
                  </span>
                ) : (
                  <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold">
                    ✓ IELTS Not Required
                  </span>
                )}
                {university.scholarshipAvailable && (
                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold">
                    💰 Scholarship Available
                  </span>
                )}
                {university.deadline && (
                  <span className={`px-4 py-2 rounded-lg font-semibold border-2 ${
                    urgency === 'urgent' ? 'bg-red-50 text-red-700 border-red-300' :
                    urgency === 'warning' ? 'bg-yellow-50 text-yellow-700 border-yellow-300' :
                    urgency === 'upcoming' ? 'bg-blue-50 text-blue-700 border-blue-300' :
                    'bg-green-50 text-green-700 border-green-300'
                  }`}>
                    {urgencyLabel}
                  </span>
                )}
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Left Column - Key Details */}
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    Course/Program
                  </h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {university.courseName || 'Not specified'}
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    Application Deadline
                  </h3>
                  {university.deadline ? (
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatDate(university.deadline)}
                      </p>
                      <p className={`text-sm font-semibold mt-2 ${
                        daysLeft <= 0 ? 'text-red-600' :
                        daysLeft <= 30 ? 'text-orange-600' :
                        daysLeft <= 90 ? 'text-blue-600' :
                        'text-green-600'
                      }`}>
                        {daysLeft > 0 ? `${daysLeft} days remaining` : 'Deadline passed'}
                      </p>
                    </div>
                  ) : (
                    <p className="text-lg text-gray-500">Not specified</p>
                  )}
                </div>

                {university.scholarshipAvailable && university.scholarshipAmount && (
                  <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                    <h3 className="text-sm font-semibold text-green-700 uppercase tracking-wider mb-2">
                      Scholarship Amount
                    </h3>
                    <p className="text-2xl font-bold text-green-900">
                      {university.scholarshipAmount}
                    </p>
                  </div>
                )}
              </div>

              {/* Right Column - Additional Info & Links */}
              <div className="space-y-6">
                {university.additionalInfo && (
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
                      Additional Information
                    </h3>
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {university.additionalInfo}
                    </p>
                  </div>
                )}

                {university.applyingLink && (
                  <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                    <h3 className="text-sm font-semibold text-purple-700 uppercase tracking-wider mb-3">
                      Application Link
                    </h3>
                    <a
                      href={university.applyingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-800 break-all text-sm underline"
                    >
                      {university.applyingLink}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Full Width Summary */}
            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200 mb-8">
              <h3 className="text-lg font-bold text-indigo-900 mb-4">📋 Summary</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-indigo-700 font-semibold">University Name</p>
                  <p className="text-gray-800">{university.universityName}</p>
                </div>
                <div>
                  <p className="text-indigo-700 font-semibold">Country</p>
                  <p className="text-gray-800">{university.country || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-indigo-700 font-semibold">IELTS Required</p>
                  <p className="text-gray-800">{university.ieltsRequired ? '✓ Yes' : '✗ No'}</p>
                </div>
                <div>
                  <p className="text-indigo-700 font-semibold">Scholarship Available</p>
                  <p className="text-gray-800">{university.scholarshipAvailable ? '✓ Yes' : '✗ No'}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 flex-wrap">
              {university.applyingLink && (
                <a
                  href={university.applyingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-48 bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors font-bold text-center text-lg"
                >
                  🚀 Apply Now
                </a>
              )}
              <button
                onClick={() => router.push('/')}
                className="flex-1 min-w-48 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-bold text-center text-lg"
              >
                ← Back to List
              </button>
            </div>
          </div>

          {/* Footer with Meta Info */}
          <div className="bg-gray-50 p-4 border-t border-gray-200 text-xs text-gray-500 text-center">
            <p>Last updated: {new Date(university.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
