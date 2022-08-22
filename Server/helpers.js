module.exports = {
  getDateAsMonthDayYear: function (date) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const dateAsMonthDayYear =
      months[date.getMonth()] + " " + date.getDate() + ", " + date.getYear();
    return dateAsMonthDayYear;
  },
};
