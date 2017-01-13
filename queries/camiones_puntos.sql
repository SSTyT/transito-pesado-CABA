SELECT camiones.encrypt_plate_id, reports.latitude, reports.longitude, reports.loc_time, reports.speed, reports.head
FROM camiones
  INNER JOIN reports USING (encrypt_plate_id)
Where ST_Intersects(reports.geom,st_setsrid(
        ST_geomfromgeojson('{
  "type": "Polygon",
  "coordinates": [
    [
      [-55.711669921875, -35.728677044851686],
      [-58.32641601562499, -33.9479168983564],
      [-60.22705078125, -33.11915022676886],
      [-60.53466796874999, -33.56428403679499],
      [-60.9521484375, -33.46810795527895],
      [-61.8255615234375, -34.30714385628803],
      [-63.599853515625, -34.28899186503752],
      [-63.4625244140625, -40.77222187732902],
      [-62.70996093749999, -41.16211393939691],
      [-61.5728759765625, -40.68480366159125],
      [-61.56188964843749, -39.16839998800285],
      [-56.2060546875, -38.59970036588819],
      [-55.711669921875, -35.728677044851686]
    ]
  ]
}'),
    4326))
ORDER BY encrypt_plate_id ASC, loc_time ASC;