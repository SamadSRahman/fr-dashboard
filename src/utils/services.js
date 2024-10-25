export function formatDateForAPI(value){
    const newDate = value.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).replace(/\//g, '-');
      return newDate;
}

export  const calculateColor = (percentage) => {
  if (percentage <= 35) {
    return "#FA6F6F"; // Red for <= 35%
  } else if (percentage <= 75) {
    return "#FDCD4B"; // Yellow for <= 75%
  } else {
    return "#5AFD4B"; // Green for > 75%
  }
};
