const express = require('express');
const cors = require('cors');
const request = require('request');
const Vibrant = require('node-vibrant');

const app = express();

app.use(cors());

function smallest(images) {
    let smallest = images[0];
    for (const image of images) {
        if (image.width < smallest.width) {
            smallest = image;
        }
    }
    return smallest;
}

app.get('/v1/album/:albumId', (req, res) => {
    const {albumId} = req.params;

    const albumQuery = {
        url: `https://api.spotify.com/v1/albums/${albumId}`,
        headers: {
            'Authorization': req.headers['authorization'],
        },
    };

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

    function handleAlbum(error, response, body) {
        const data = JSON.parse(body);
        const image = smallest(data.images);

        Vibrant.from(image.url).getPalette().then(palette => {
            res.append('content-type', 'application/json');
            const cleanPalette = clean(palette);
            res.send(JSON.stringify(cleanPalette));
        });
    }

    request(albumQuery, handleAlbum);
});

app.listen(3500, () => console.log('Example app listening on port 3000!'))
