var fs = require('fs');

const summaryFile = "SUMMARY.md";

const yourSystemFile = "using-a-system"; // To be replaced with booking system file

const allSystemDirectory = "systems-on-offer"; // All entries in this directory will be removed (except the booking system file)

var summary = fs.readFileSync(summaryFile, 'utf8');
var systemName = process.argv.slice(2)[0];

console.log('systemName: ', systemName);

var bookingSystemRegex = new RegExp(`.*${systemName}[.]md[)]`, "g"); // find {bookingsystem}.md
var yourSystemSystemRegex = new RegExp(`.*${yourSystemFile}[.]md[)]`, "g"); // find using-a-system.md
var allSystemsDirectoryRegex = new RegExp(`.*/${allSystemDirectory}/.*?[.]md[)]\\n`, "g"); // find systems-on-offer/*.md

var bookingSystemSummaryEntry = summary.match(bookingSystemRegex)[0].trimLeft(); // find {bookingsystem}.md
var yourSystemSummaryEntry = summary.match(yourSystemSystemRegex)[0]; // find using-a-system.md
var allSystemDirectoryEntries = summary.match(allSystemsDirectoryRegex); // find systems-on-offer/*.md

var yourSystemSummaryEntryWhitespace = yourSystemSummaryEntry.match(/^\s*/);

console.log('Booking system string (to use as replacement): ' + bookingSystemSummaryEntry);
console.log('Your system string (to be replaced): ' + yourSystemSummaryEntry);
console.log('Your system string whitespace: "' + yourSystemSummaryEntryWhitespace + '"');
console.log('All "' + allSystemDirectory + '" entries (to be deleted): ' + allSystemDirectoryEntries);

var yourSystemSummaryEntryWhitespace = yourSystemSummaryEntry.match(/^\s*/);

// Remove allSystemDirectory entries
var summary = summary.replace(allSystemsDirectoryRegex, '');

// Replace yourSystem file with chosen booking system file
var summary = summary.replace(yourSystemSystemRegex, yourSystemSummaryEntryWhitespace + bookingSystemSummaryEntry);

console.log('Process file:\n\n', summary);

fs.writeFileSync(summaryFile, summary);

console.log('File written successfully!');