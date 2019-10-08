const express = require('express');
const cors = require('cors');
const Vibrant = require('node-vibrant');

const PORT = process.env.PORT || 5567;

const app = express();

app.use(cors());

function clean(object) {
    const der = {};
    Object.keys(object).forEach(key => {
        const value = object[key];
        der[key.toLowerCase().replace('_', '')] = value && typeof value === 'object' && !Array.isArray(value)
            ? clean(value)
            : value;
    });
    return der;
}

app.get('/v1/image/:url', (req, res) => {
    const {url} = req.params;

    Vibrant.from(url).getPalette()
    .then(palette => {
        res.append('content-type', 'application/json');
        const cleanPalette = clean(palette);
        res.send(JSON.stringify(cleanPalette));
    })
    .catch(error => {
        console.error(`Could not fetch URL: ${url}`);
        console.error(error);
    });
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
