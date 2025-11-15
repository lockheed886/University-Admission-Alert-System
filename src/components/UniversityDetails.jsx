'use client';

import { formatDate, getDaysUntilDeadline, getDeadlineUrgency, getUrgencyLabel } from '@/lib/utils';

export default function UniversityDetails({ university, onClose }) {
  if (!university) return null;

  const urgency = getDeadlineUrgency(university.deadline);
  const daysLeft = getDaysUntilDeadline(university.deadline);
  const urgencyLabel = getUrgencyLabel(daysLeft);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl my-8">
        {/* Header with Color Bar */}
        <div className={`h-2 ${
          urgency === 'urgent' ? 'bg-red-500' : 
          urgency === 'warning' ? 'bg-yellow-500' : 
          urgency === 'upcoming' ? 'bg-blue-500' : 
          'bg-green-500'
        }`}></div>

        {/* Content */}
        <div className="p-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="float-right text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ✕
          </button>

          {/* Title Section */}
          <div className="mb-8 clear-both">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {university.universityName}
            </h1>
            
            {/* Quick Info Badges */}
            <div className="flex flex-wrap gap-3 mb-4">
              {university.country && (
                <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg font-semibold text-sm">
                  📍 {university.country}
                </span>
              )}
              {university.ieltsRequired ? (
                <span className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-semibold text-sm">
                  🎯 IELTS Required
                </span>
              ) : (
                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold text-sm">
                  ✓ IELTS Not Required
                </span>
              )}
              {university.scholarshipAvailable && (
                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold text-sm">
                  💰 Scholarship Available
                </span>
              )}
              {university.deadline && (
                <span className={`px-4 py-2 rounded-lg font-semibold border-2 text-sm ${
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
                <p className="text-xl font-bold text-gray-900">
                  {university.courseName || 'Not specified'}
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Application Deadline
                </h3>
                {university.deadline ? (
                  <div>
                    <p className="text-xl font-bold text-gray-900">
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
                  <p className="text-xl font-bold text-green-900">
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
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-sm">
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
                    className="text-purple-600 hover:text-purple-800 break-all text-sm underline font-semibold"
                  >
                    Open Application Portal
                  </a>
                </div>
              )}

              {university.universityLink && (
                <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
                  <h3 className="text-sm font-semibold text-indigo-700 uppercase tracking-wider mb-3">
                    University Website
                  </h3>
                  <a
                    href={university.universityLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 break-all text-sm underline font-semibold"
                  >
                    Visit University Website
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
                <p className="text-indigo-700 font-semibold">University</p>
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
                className="flex-1 min-w-48 bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors font-bold text-center"
              >
                🚀 Apply Now
              </a>
            )}
            {university.universityLink && (
              <a
                href={university.universityLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-48 bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors font-bold text-center"
              >
                🌐 Visit Website
              </a>
            )}
            <button
              onClick={onClose}
              className="flex-1 min-w-48 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-bold text-center"
            >
              ← Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
