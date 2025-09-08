// function doGet() {
//     const t = HtmlService.createTemplateFromFile("index");
//     return t
//         .evaluate()
//         .addMetaTag("viewport", "width=device-width, initial-scale=1");
// }

function doGet(e) {
    const t = HtmlService.createTemplateFromFile("index");
    return t.evaluate()
        .addMetaTag("viewport", "width=device-width, initial-scale=1");
}


function addUser(user) {
    try {
        const sheet = getSsSheet("Users");
        if (!sheet) throw new Error('Sheet "Users" not found.');

        // Append user data in the correct order
        sheet.appendRow([
            new Date(),       // Timestamp
            user.username || "",
            user.email || "",
            user.dob || "",
            user.gender || "",
            user.userType || "",
        ]);

        return { status: "success", message: "User added successfully!" };
    } catch (err) {
        throw new Error("Failed to add user: " + err.message);
    }
}
/**
 * Formats a Date object into MM/DD/YYYY at hh:mm AM/PM
 *
 * @param {Date} date
 * @returns {string} formatted date and time
 * Example: "02/21/1990 at 12:35 PM"
 */
function formatDateMMDDYYYY(date) {
    if (!(date instanceof Date)) throw new Error("Input must be a Date object");

    const timeZone = Session.getScriptTimeZone();
    return Utilities.formatDate(date, timeZone, "MM/dd/yyyy 'at' hh:mm a");
}


function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
}


function getSsSheet(name) {
    var spreadsheet = SpreadsheetApp.openByUrl(
        "https://docs.google.com/spreadsheets/d/1HEkdal4HzFhPjV7UKf8iyXxLlTehuk9ZB8xCLNaFvqs/edit?gid=0#gid=0",
    );
    var sheet = spreadsheet.getSheetByName(name);
    return sheet;
}

function getSheetDataRange(name, row, col, numCols) {
    const sheet = getSsSheet(name);
    const range = sheet.getRange(row, col, sheet.getLastRow(), numCols);
    return range;
}

function getAllValues(name, row, col, numCols) {
    const range = getSheetDataRange(name, row, col, numCols);
    return range.getValues();
}


function serverSideGetData(name, row, col, numCols) {
    Logger.log("Sheet name: ", name)
    const sheetData = getAllValues(name, row, col, numCols);
    const data = sheetData.filter((row) => row[0] !== "");
    const dataNew = JSON.stringify(data);
    Logger.log("The data is: ", dataNew)
    return dataNew;
}

/**
 * Fetch all users from the "Users" sheet
 */
function getAllUsers() {
    try {
        const ss = getSsSheet("Users")
        if (!sheet) throw new Error('Sheet "Users" not found.');

        const data = sheet.getDataRange().getValues(); // includes headers
        const headers = data.shift(); // remove headers row

        // Map each row to an object
        const users = data.map((row) => {
            const obj = {};
            headers.forEach((header, i) => {
                obj[header] = row[i];
            });
            return obj;
        });

        return users; // array of objects
    } catch (err) {
        throw new Error("Failed to fetch users: " + err.message);
    }
}
