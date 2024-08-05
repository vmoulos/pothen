const express = require('express');
const bodyParser = require('body-parser');
const mariadb = require('mariadb');
const cors = require('cors');

const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a MariaDB connection pool
const pool = mariadb.createPool({
  host: '***', 
  user: '**', 
  password: '***',
  database: '**',
  connectionLimit: 5
});

// Endpoint to handle form submission
app.post('/submit-form', async (req, res) => {
  const formData = req.body;
  try {
    const connection = await pool.getConnection();
    const query = `
    INSERT INTO form_data (
      afm, adt_agm, surname, name, patronym, idiotita, acquisition_date, loss_date, org_unit, new_org_unit, grade, committee_name, decision_protocol_number, decision_date, submitted_previous_year
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
    const values = [
        formData["Α.Φ.Μ."], 
        formData["Α.Δ.Τ - Α.Γ.Μ"], 
        formData["Επώνυμο"], 
        formData["Όνομα"], 
        formData["Πατρώνυμο"], 
        formData["Ιδιότητα"], 
        formData["Ημ/νία Απόκτησης Ιδιότητας"], 
        formData["Ημ/νία Απώλειας Ιδιότητας"], 
        formData["Οργανική Μονάδα"], 
        formData["Νέα Οργανική Μονάδα"], 
        formData["Βαθμός"], 
        formData["Όνομα Επιτροπής"], 
        formData["Αριθμός πρωτοκόλλου απόφασης"], 
        formData["Ημ/νία Έκδοσης Απόφασης"], 
        formData["Έχετε υποβάλει το προηγούμενο έτος πόθεν στη Γ ομάδα ελέγχου (ετήσιας)"] === 'Yes'
    ];
    await connection.query(query, values);
    connection.release();
    res.status(200).send('Form data submitted successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error submitting form data');
  }
});

app.get('/status', (req, res) => {
    res.send('Server is running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
