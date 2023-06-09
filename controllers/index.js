const moment = require('moment')
const zodiacData = require('../database')

const getZodiacName = (date)=> {
    return new Promise((resolve)=>{
        const inputDate = moment(date)
        let result = 'Unknown'
        for (const zodiac of zodiacData) {
            const startDate = moment(zodiac.startDate)
            const endDate = moment(zodiac.endDate)
            if (inputDate.format('MMMM') === 'December') {
                const day = inputDate.format('DD')
                const dayZodiac = startDate.format('DD')
                if (day >= dayZodiac && day <= 31) {
                    if (endDate.format('MMMM') === 'January') {
                        result = zodiac.zodiacName
                        
                    }
                } 
            }
            if (inputDate.format('MMMM') === 'January') {
                if (startDate.format('MMMM') === 'December') {
                    const day = inputDate.format('DD')
                    if (day <= 19) {
                        result = zodiac.zodiacName
                    }
                }
            }
            if (inputDate >= startDate && inputDate <= endDate) {
                result = zodiac.zodiacName
            }
        }
        resolve(result)
    })
}
  
const calculateAge = (birthday) => {
    const today = moment();
    const birthDate = moment(birthday, 'YYYY-MM-DD');

    const duration = moment.duration(today.diff(birthDate));
    
    const years = duration.years();
    const months = duration.months();
    const days = duration.days();

    return {
        year: years,
        month: months,
        day: days
    };
}

module.exports = {
    getZodiacName,
    calculateAge
}