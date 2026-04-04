/**
 * Formats a date string or timestamp into a readable string.
 * Smart version: Automatically detects if the second argument is a locale.
 * @param {any} dateInput - The date value from Memento.
 * @param {string} format - The desired format (default: "DD MMMM YYYY").
 * @param {string} locale - The language code (default: "el").
 * @returns {string} - The formatted date string.
 */
function formatDate_old(dateInput, format, locale) {
    var defaultFormat = "DD MMMM YYYY";
    var defaultLocale = "el";

    if (arguments.length === 2 && typeof format === "string" && format.length === 2) {
        locale = format;
        format = defaultFormat;
    } else {
        format = format || defaultFormat;
        locale = locale || defaultLocale;
    }

    if (!dateInput) return "";
    var d = new Date(dateInput);
    if (isNaN(d.getTime())) return "Invalid Date";

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

    var lang = languages[locale] || languages["en"];
    var DD = ("0" + d.getDate()).slice(-2);
    var MM = ("0" + (d.getMonth() + 1)).slice(-2);
    var YYYY = d.getFullYear();
    var YY = String(YYYY).slice(-2);
    
    var dddd = lang.daysFull[d.getDay()];
    var ddd = lang.daysShort[d.getDay()];
    
    var monthName;
    if (locale === "el" && format.indexOf("DD") > -1) {
        monthName = lang.monthsGen[d.getMonth()];
    } else {
        monthName = lang.monthsNom[d.getMonth()];
    }

    return format
        .replace(/dddd/g, dddd)
        .replace(/ddd/g, ddd)
        .replace(/DD/g, DD)
        .replace(/MMMM/g, monthName)
        .replace(/MM/g, MM)
        .replace(/YYYY/g, YYYY)
        .replace(/YY/g, YY);
}
