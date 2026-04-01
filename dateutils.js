var days = ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"];

// Ονομαστική (για σκέτο μήνα)
var monthsNom = ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", 
                 "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"];
    
// Γενική (για ημερομηνίες τύπου "15 Ιανουαρίου")
var monthsGen = ["Ιανουαρίου", "Φεβρουαρίου", "Μαρτίου", "Απριλίου", "Μαΐου", "Ιουνίου", 
                 "Ιουλίου", "Αυγούστου", "Σεπτεμβρίου", "Οκτωβρίου", "Νοεμβρίου", "Δεκεμβρίου"];


function getGreekDay(dateObj) {
    if (!dateObj) return "";
    return days[dateObj.getDay()];
}


function getGreekMonth(dateObj) {
    if (!dateObj) return "";
    return monthsNom[dateObj.getMonth()];
}


function formatDate(dateInput, format, locale) {
    // Ορισμός προεπιλεγμένων τιμών (Defaults)
    format = format || "DD MMMM YYYY"; 
    locale = locale || "el";

    if (!dateInput) return "";
    var d = new Date(dateInput);
    if (isNaN(d.getTime())) return "Invalid Date";

    // Δεδομένα Γλωσσών
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

    // Επιλογή γλώσσας (αν δεν υπάρχει η γλώσσα, πάμε στα αγγλικά)
    var lang = languages[locale] || languages["en"];

    // Προετοιμασία τιμών
    var DD = ("0" + d.getDate()).slice(-2);
    var MM = ("0" + (d.getMonth() + 1)).slice(-2);
    var YYYY = d.getFullYear();
    var YY = String(YYYY).slice(-2);
    
    var dddd = lang.daysFull[d.getDay()];
    var ddd = lang.daysShort[d.getDay()];
    
    // Έλεγχος πτώσης για τα Ελληνικά
    var monthName;
    if (locale === "el" && format.indexOf("DD") > -1) {
        monthName = lang.monthsGen[d.getMonth()];
    } else {
        monthName = lang.monthsNom[d.getMonth()];
    }

    // Αντικατάσταση
    return format
        .replace(/dddd/g, dddd)
        .replace(/ddd/g, ddd)
        .replace(/DD/g, DD)
        .replace(/MMMM/g, monthName)
        .replace(/MM/g, MM)
        .replace(/YYYY/g, YYYY)
        .replace(/YY/g, YY);
}

exports.formatDate = formatDate;
