
const express = require('express');
const app = express();
const PORT = 8080;

// Middleware: Parse JSON before data hits request
// Runs before every endpoint callback defined
app.use(express.json()); // Apply middleware

app.listen(
    PORT,
    () => console.log(`listening on http://localhost:${PORT}`)
)

// GET = read
// req = Request
// res = Response
// Run callback function when the route is requested
app.get('/tshirt', (req, res) => {
    res.status(200).send({
        tshirt: 't',
        size: 'large'
    })
});

// POST = write: create new data
// :id = route params: captures dynamic values in URL
app.post('/tshirt/:id', (req, res) => {

    const { id } = req.params;
    const { logo } = req.body;

    if (!logo) {
        res.status(418).send({
            message: "Need a logo!"
        })
    }

    res.send({
        tshirt: `Tshirt with your ${logo} and ID of ${id}`,
    });

});
