const x = {
    "kids": [
      {
        "kids": [
          {
            "name": "A"
          },
          {
            "name": "S"
          }
        ],
        "d": 0.1
      },
      {
        "kids": [
          {
            "kids": [
              {
                "name": "T"
              },
              {
                "kids": [
                  {
                    "name": "U"
                  },
                  {
                    "name": "V"
                  }
                ],
                "d": 0.2
              }
            ],
            "d": 0.27
          },
          {
            "kids": [
              {
                "name": "X"
              },
              {
                "kids": [
                  {
                    "name": "Y"
                  },
                  {
                    "name": "Z"
                  }
                ],
                "d": 0.285
              }
            ],
            "d": 0.34
          }
        ],
        "d": 0.45
      }
    ],
    "d": 0.72
  }
  

console.log( JSON.stringify(x, null, 2 ) )

