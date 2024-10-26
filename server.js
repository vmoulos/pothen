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
  host: '147.102.74.58',
  user: 'root',
  password: 'MariaPothen2024',
  database: 'pothen',
  connectionLimit: 5
});
// Function to validate AFM
const validateAFM = (afm) => {
  const afmRegex = /^[1-9][0-9]{8}$/; // AFM should be 9 digits and not start with 0
  return afmRegex.test(afm);
};



// Endpoint to handle form submission
app.post('/submit-form', async (req, res) => {
  const formData = req.body;
  // Validate AFM
  if (!validateAFM(formData["afm"])) {
    return res.status(200).json({ success: false, error: 'Μη έγκυρο ΑΦΜ.' });
  }

  try {
    const connection = await pool.getConnection();
    const query = `
      INSERT INTO form_data (
        afm, adt_agm, surname, name, patronym, idiotita, acquisition_date, loss_date, expiration_date, org_unit, new_org_unit, grade, committee_name, decision_protocol_number, decision_date, submitted_previous_year
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, DATE_ADD(?, INTERVAL 2 YEAR), ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        formData["afm"], 
        formData["adt_agm"], 
        formData["surname"], 
        formData["name"], 
        formData["patronym"], 
        formData["idiotita"], 
        formData["acquisition_date"], 
        formData["loss_date"], 
        formData["expiration_date"],
        formData["org_unit"], 
        formData["new_org_unit"], 
        formData["grade"], 
        formData["committee_name"], 
        formData["decision_protocol_number"], 
        formData["decision_date"], 
        formData["submitted_previous_year"] === 'Yes'
    ];
    await connection.query(query, values);
    connection.release();
    return res.status(200).json({ success: true , error: '' });
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
