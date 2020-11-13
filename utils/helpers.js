const moment = require('moment');

module.exports = {
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`
    },
    isDaily: string => {
        if (string === 'daily') {
            return true;
        } else {
            return false;
        }
    },
    isBiWeekly: (string, dayOfTheWeek, dayOfTheMonth) => {
        const biWeeklyDays = ['1', '2', '3', '4', '5', '6', '7', '15', '16', '17', '18', '19', '20', '21', '29', '30', '31'];

        console.log(string, dayOfTheWeek, dayOfTheMonth);

        function confirm() {
            if (biWeeklyDays.includes(dayOfTheMonth)) {
                return true;
            };

            return false;
        };
        
        if ( string === 'bi-weekly' && dayOfTheWeek === 'Tuesday' && confirm ) {
            return true;
        } else {
            return false;
        };
    }
};