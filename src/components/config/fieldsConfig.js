const formFields = [
    { name: "Α.Φ.Μ.", type: "text", order: 1 },
    { name: "Α.Δ.Τ - Α.Γ.Μ", type: "text", order: 2 },
    { name: "Επώνυμο", type: "text", order: 3 },
    { name: "Όνομα", type: "text", order: 4 },
    { name: "Πατρώνυμο", type: "text", order: 5 },
    { name: "Ιδιότητα", type: "text", order: 6 },
    { name: "Ημ/νία Απόκτησης Ιδιότητας", type: "date", order: 7 },
    { name: "Ημ/νία Απώλειας Ιδιότητας", type: "date", order: 8 },
    { name: "Οργανική Μονάδα", type: "text", order: 9 },
    { name: "Νέα Οργανική Μονάδα", type: "text", order: 10 },
    { name: "Βαθμός", type: "text", order: 11 },
    { name: "Όνομα Επιτροπής", type: "text", order: 12 },
    { name: "Αριθμός πρωτοκόλλου απόφασης", type: "text", order: 13 },
    { name: "Ημ/νία Έκδοσης Απόφασης", type: "date", order: 14 },
    { name: "Έχετε υποβάλει το προηγούμενο έτος πόθεν στη Γ ομάδα ελέγχου (ετήσιας)", type: "radio", order: 15, options: ["Yes", "No"] }
  ];
  
  export default formFields;