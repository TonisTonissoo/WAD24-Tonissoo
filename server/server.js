
const express = require('express');
const pool = require('./database');
const cors = require('cors')

const port = process.env.PORT || 3000;
const app = express();


app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(express.json());

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});


app.get('/api/grades', async(req, res) => {
    try {
        console.log("A GET all request has arrived");
        const grades = await pool.query(
            "SELECT * FROM wadcourse"
        );
        res.json(grades.rows);
    } catch (err) {
        console.error(err.message);
    }
});
app.put('/api/grades/:id', async(req, res) =>{
    const gradeID = parseInt(req.params.id);
    const { hws, exam } = req.body;
    try {
        const updateGradeHW = 'UPDATE wadcourse SET hws = $1  WHERE id = $2 RETURNING *';
        const result1 = await pool.query(updateGradeHW, [hws, gradeID]);
        if (result1.rows.length === 0) {
            return res.status(404).json({ error: "Course not found" });
        }
        res.json({ message: "Course updated successfully", course: result1.rows[0] });
    }catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
})

