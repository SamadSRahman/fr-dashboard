export function formatDateForAPI(value){
    const newDate = value.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).replace(/\//g, '-');
      return newDate;
}