SELECT encrypt_plate_id, longitude, latitude
  FROM reports
  WHERE encrypt_plate_id IN (SELECT DISTINCT a.encrypt_plate_id FROM reports as a, regions as b WHERE b.gid = 23 AND ST_Intersects(a.geom,b.geom))
  ORDER BY encrypt_plate_id ASC, loc_time ASC;