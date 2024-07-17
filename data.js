const utcTimestamp = "2023-10-03T17:40:35.000Z";
const date = utcTimestamp.replace(/T/, ' ').replace(/\..+/, '') 

// Convert to GMT+7 (in this example, assuming a fixed timezone offset of 7 hours)
// date.setHours(date.getHours() - 4);

// Format the date and time as "YYYY-MM-DD HH:mm:ss"
// const formattedTimestamp = `${date.toISOString().split("T")[0]} ${date.toTimeString().split(" ")[0]}`;

console.log(date);
