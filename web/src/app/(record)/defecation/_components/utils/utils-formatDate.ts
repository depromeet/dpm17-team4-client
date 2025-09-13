export const formatDate = (date: Date) => {
  const datePart = new Intl.DateTimeFormat('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  }).format(date);
  const hour = date.getHours();
  const ampm = hour >= 12 ? '오후' : '오전';
  return `${datePart} ${ampm} ${hour}시`;
};
