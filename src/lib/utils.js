export function formatDate(date) {
  if (!date) return 'Not specified';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getDaysUntilDeadline(deadline) {
  if (!deadline) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(0, 0, 0, 0);
  const timeDifference = deadlineDate - today;
  return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
}

export function getDeadlineUrgency(deadline) {
  const daysLeft = getDaysUntilDeadline(deadline);
  if (!daysLeft) return null;
  if (daysLeft < 0) return 'passed';
  if (daysLeft <= 7) return 'urgent';
  if (daysLeft <= 14) return 'warning';
  if (daysLeft <= 30) return 'upcoming';
  return 'safe';
}

export function getUrgencyColor(urgency) {
  const colors = {
    urgent: 'bg-red-100 text-red-800 border-red-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    upcoming: 'bg-blue-100 text-blue-800 border-blue-200',
    safe: 'bg-green-100 text-green-800 border-green-200',
    passed: 'bg-gray-100 text-gray-800 border-gray-200',
  };
  return colors[urgency] || colors.safe;
}

export function getUrgencyLabel(daysLeft) {
  if (!daysLeft && daysLeft !== 0) return '';
  if (daysLeft < 0) return 'Deadline passed';
  if (daysLeft === 0) return 'Deadline today!';
  if (daysLeft === 1) return '1 day left';
  return `${daysLeft} days left`;
}
