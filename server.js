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
            'Authorization': 'Bearer BQCcQ3ud2yGugO6IPuv1abOokvFu0Z9dWiX7f9rd1In_dMP8fSgz1kQY-dRb6yXB-RI-8jrFMg6hxZDCD0EpVGctJ46cspOZTOjrb7GrxZt6UNu2RRlJzkKSWfzZQTN_Xa-aSWlsqD0ZrizMMdoaFDSwEGHZeAV5pzxhFBW1Qu0-'
        }
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
