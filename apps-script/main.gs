function doGet() {
    return HtmlService.createTemplateFromFile("index")
        .evaluate()
        .addMetaTag("viewport", "width=device-width, initial-scale=1.0");
}

function checkThestuff() {
    Logger.log("The function is running");
    return "The function is running";
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