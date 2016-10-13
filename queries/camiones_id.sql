Select distinct encrypt_plate_id from reports 
where st_intersects(
    st_setsrid(
        ST_geomfromgeojson('{
        "type": "Polygon",
        "coordinates": [
          [
            [
              -58.49610328674316,
              -34.73995503464493
            ],
            [
              -58.510630130767815,
              -34.747289943255545
            ],
            [
              -58.50745439529419,
              -34.751362652141324
            ],
            [
              -58.493185043334954,
              -34.743975209441565
            ],
            [
              -58.49610328674316,
              -34.73995503464493
            ]
          ]
        ]
      }'),
    4326), 
	geom)