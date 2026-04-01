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


function getDate(dateInput, format) {
    if (!dateInput) return "";
    var d = new Date(dateInput);

    var dd = ("0" + d.getDate()).slice(-2);
    var mm = ("0" + (d.getMonth() + 1)).slice(-2);
    var yyyy = d.getFullYear();
    
    var result = format;
    result = result.replace("dd", dd);
    result = result.replace("mm", mm);
  return mm;
    result = result.replace("YYYY", yyyy);
    result = result.replace("DAY", days[d.getDay()]);

    // ΕΔΩ ΕΙΝΑΙ Η ΑΛΛΑΓΗ:
    // Αν το format έχει dd (ημέρα), βάλε Γενική. Αν όχι, βάλε Ονομαστική.
    if (format.includes("dd")) {
        result = result.replace("MONTH", monthsGen[d.getMonth()]);
    } else {
        result = result.replace("MONTH", monthsNom[d.getMonth()]);
    }

    return result;
}
