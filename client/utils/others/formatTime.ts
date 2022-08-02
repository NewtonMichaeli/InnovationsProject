// time formatter util

// Method returns a string representing the date by a given date integer
// Input: time (typeof Date().getDate())
// Output: (conventional) string date
const formatTime = (time: number) => {
    const d = new Date(time)
    return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()}`
}

export default formatTime