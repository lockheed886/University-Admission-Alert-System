'use client';

import { formatDate, getDaysUntilDeadline, getDeadlineUrgency, getUrgencyColor, getUrgencyLabel } from '@/lib/utils';

export default function UniversityCard({ university, onEdit, onDelete, onView }) {
  const urgency = getDeadlineUrgency(university.deadline);
  const daysLeft = getDaysUntilDeadline(university.deadline);
  const urgencyColor = getUrgencyColor(urgency);
  const urgencyLabel = getUrgencyLabel(daysLeft);

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-slate-200 overflow-hidden flex items-center justify-between p-4 min-h-16 cursor-pointer" onClick={() => onView(university)}>
      {/* Left Content */}
      <div className="flex-1 flex items-center gap-4">
        {/* Color indicator bar */}
        <div className={`w-1 h-12 rounded-full ${urgency === 'urgent' ? 'bg-red-500' : urgency === 'warning' ? 'bg-yellow-500' : urgency === 'upcoming' ? 'bg-blue-500' : 'bg-green-500'}`}></div>

        {/* Main Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {/* University Name */}
            {university.universityName && (
              <h3 className="text-base font-bold text-gray-900">
                {university.universityName}
              </h3>
            )}

            {/* Country */}
            {university.country && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {university.country}
              </span>
            )}

            {/* IELTS Badge - Show both required and not required */}
            {university.ieltsRequired ? (
              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded font-semibold border border-red-300">
                🎯 IELTS Required
              </span>
            ) : (
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-semibold border border-blue-300">
                ✓ IELTS Not Required
              </span>
            )}

            {/* Scholarship Badge */}
            {university.scholarshipAvailable && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-semibold">
                💰 Scholarship
              </span>
            )}

            {/* Deadline Urgency */}
            {university.deadline && (
              <span className={`text-xs px-2 py-1 rounded font-semibold border ${urgencyColor}`}>
                {urgencyLabel}
              </span>
            )}
          </div>

          {/* Course and Details in second row */}
          <div className="text-xs text-gray-600 mt-1 flex gap-3 flex-wrap items-center">
            {/* Course Name */}
            {university.courseName && (
              <span>� {university.courseName}</span>
            )}

            {/* Deadline */}
            {university.deadline && (
              <span>📅 {formatDate(university.deadline)}</span>
            )}

            {/* Scholarship Amount */}
            {university.scholarshipAmount && (
              <span className="text-green-700 font-semibold">Amount: {university.scholarshipAmount}</span>
            )}

            {/* Additional Info (truncated) */}
            {university.additionalInfo && (
              <span className="italic text-gray-500 truncate max-w-xs">
                {university.additionalInfo}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex gap-2 ml-4">
        {university.applyingLink && (
          <a
            href={university.applyingLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="bg-purple-500 text-white px-3 py-1 rounded text-xs hover:bg-purple-600 transition-colors font-medium whitespace-nowrap"
          >
            Apply
          </a>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(university);
          }}
          className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition-colors font-medium whitespace-nowrap"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(university._id);
          }}
          className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 transition-colors font-medium whitespace-nowrap"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
