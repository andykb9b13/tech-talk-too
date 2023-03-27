module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(
      date
    ).getDate()}/${new Date(date).getFullYear()}`;
  },
  truncateWords: (text) => {
    const words = text.split(" ");
    return words.slice(0, 20).join(" ");
  },
};
