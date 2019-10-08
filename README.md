# vibrant-api

API to retrieve significant colors from Images.

### Usage

Request with `curl`
```bash
curl -X "GET" \
    "https://[host]/v1/image/[url]" \
    -H "Accept: application/json" -H "Content-Type: application/json" \
```

Response
```json
{
  "vibrant": {
    "rgb": [
      176,
      49,
      97
    ],
    "population": 6,
    "hsl": [
      0.937007874015748,
      0.5644444444444444,
      0.4411764705882353
    ]
  },
  "lightvibrant": {
    "rgb": [
      236,
      140,
      172
    ],
    "population": 1,
    "hsl": [
      0.9444444444444445,
      0.7164179104477613,
      0.7372549019607844
    ]
  },
  "darkvibrant": {
    "rgb": [
      128,
      12,
      40
    ],
    "population": 2,
    "hsl": [
      0.9597701149425287,
      0.8285714285714285,
      0.27450980392156865
    ]
  },
  "muted": {
    "rgb": [
      178,
      108,
      156
    ],
    "population": 6,
    "hsl": [
      0.8857142857142857,
      0.31249999999999994,
      0.5607843137254902
    ]
  },
  "lightmuted": {
    "rgb": [
      212,
      196,
      209
    ],
    "population": 8,
    "hsl": [
      0.8645833333333335,
      0.1568627450980393,
      0.8
    ]
  },
  "darkmuted": {
    "rgb": [
      48,
      46,
      89
    ],
    "population": 9,
    "hsl": [
      0.6744186046511628,
      0.3185185185185185,
      0.2647058823529412
    ]
  }
}
```
