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

function doPost(e) {
    try {
        const user = JSON.parse(e.postData.contents); // expects JSON from React
        const result = addUser(user); // call your existing helper

        return ContentService
            .createTextOutput(JSON.stringify(result))
            .setMimeType(ContentService.MimeType.JSON);
    } catch (err) {
        return ContentService
            .createTextOutput(JSON.stringify({ status: "error", message: err.message }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}


function getAllUsers() {
    try {
        const sheet = getSsSheet("Users");
        if (!sheet) throw new Error('Sheet "Users" not found.');

        const data = sheet.getDataRange().getValues(); // includes headers
        if (data.length <= 1) return []; // no data rows

        const headers = data[0]; // first row is headers
        const rows = data.slice(1); // all remaining rows
        Logger.log(rows)
        // Map each row to an object

        return JSON.stringify(rows); // array of objects
    } catch (err) {
        throw new Error("Failed to fetch users: " + err.message);
    }
}



function addUser(user) {
    const sheet = getSsSheet("Users");
    if (!sheet) return { status: "error", message: 'Sheet "Users" not found.' };

    const emailCol = 4;
    const usernameCol = 3;
    const lastRow = sheet.getLastRow();

    const normalize = (str = "") => str.toString().trim().toLowerCase();

    if (lastRow > 1) {
        const existingEmails = sheet.getRange(2, emailCol, lastRow - 1, 1)
            .getValues().flat().map(normalize);
        const existingUsernames = sheet.getRange(2, usernameCol, lastRow - 1, 1)
            .getValues().flat().map(normalize);

        const email = normalize(user.email);
        const username = normalize(user.username);

        if (existingEmails.includes(email)) {
            return { status: "error", message: "A user with that email already exists." };
        }
        if (existingUsernames.includes(username)) {
            return { status: "error", message: "A user with that username already exists." };
        }
    }

    if (!user.username || !user.email || !user.password) {
        return { status: "error", message: "Username and email are required." };
    }

    const userId = generateEmployeeId();
    sheet.appendRow([
        userId,
        new Date(),
        user.username || "",
        user.password || "",
        user.email || "",
        user.age || "",
        user.gender || "",
        user.userType || "",
        user.zipcode || "",
    ]);

    return { status: "success", message: "User added successfully!", userId };
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

function generateEmployeeId() {
    const props = PropertiesService.getScriptProperties();

    // Retrieve last issued employee number, default to 0 if not set
    let lastNum = Number(props.getProperty("lastEmployeeNum")) || 0;
    lastNum++;

    // Store the updated number back
    props.setProperty("lastEmployeeNum", String(lastNum));

    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const year = now.getFullYear().toString().slice(-2);

    // Format: MMDDYY### (### is sequential padded ID)
    return `${month}${day}${year}${String(lastNum).padStart(3, '0')}`;
}

