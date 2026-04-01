function getGreekDay(dateInput) {
    return formatDate(dateInput, "dddd");
}


function getGreekMonth(dateInput) {
    return formatDate(dateInput, "MMMM");
}


/**
 * Formats a date string or timestamp into a readable string.
 * @param {any} dateInput - The date value from Memento (timestamp or string).
 * @param {string} format - The desired format (default: "DD MMMM YYYY").
 * @param {string} locale - The language code (default: "el").
 * @returns {string} - The formatted date string.
 */
function formatDate(dateInput, format, locale) {
    // Set default values if parameters are missing
    format = format || "DD MMMM YYYY"; 
    locale = locale || "el";

    // Handle empty input
    if (!dateInput) return "";

    var d = new Date(dateInput);
    // Check if the date object is valid
    if (isNaN(d.getTime())) return "Invalid Date";

    // Dictionary containing language-specific strings
    var languages = {
        "el": {
            daysFull: ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"],
            daysShort: ["Κυρ", "Δευ", "Τρί", "Τετ", "Πέμ", "Παρ", "Σάβ"],
            monthsNom: ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"],
            monthsGen: ["Ιανουαρίου", "Φεβρουαρίου", "Μαρτίου", "Απριλίου", "Μαΐου", "Ιουνίου", "Ιουλίου", "Αυγούστου", "Σεπτεμβρίου", "Οκτωβρίου", "Νοεμβρίου", "Δεκεμβρίου"]
        },
        "en": {
            daysFull: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            monthsNom: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsGen: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        }
    };

    // Fallback to English if the requested locale is not supported
    var lang = languages[locale] || languages["en"];

    // Extract date components and pad with leading zeros where necessary
    var DD = ("0" + d.getDate()).slice(-2);
    var MM = ("0" + (d.getMonth() + 1)).slice(-2);
    var YYYY = d.getFullYear();
    var YY = String(YYYY).slice(-2);
    
    var dddd = lang.daysFull[d.getDay()];
    var ddd = lang.daysShort[d.getDay()];
    
    // Logic for Greek grammar: Use Genitive case (monthsGen) if 'DD' is present in format
    var monthName;
    if (locale === "el" && format.indexOf("DD") > -1) {
        monthName = lang.monthsGen[d.getMonth()];
    } else {
        monthName = lang.monthsNom[d.getMonth()];
    }

    // Perform replacements using global regex to match all occurrences
    return format
        .replace(/dddd/g, dddd)
        .replace(/ddd/g, ddd)
        .replace(/DD/g, DD)
        .replace(/MMMM/g, monthName)
        .replace(/MM/g, MM)
        .replace(/YYYY/g, YYYY)
        .replace(/YY/g, YY);
}
