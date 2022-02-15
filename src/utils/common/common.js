export const generateRecurringId = () => {
    let date = new Date()
    date = JSON.stringify(date)
    date = date.replace(/[^\d\s]+/gi, "").slice(0, -1)

    return `${date}${Math.floor(Math.random() * 90 + 10)}`
}