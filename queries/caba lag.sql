SELECT encrypt_plate_id as plate, latitude, longitude, speed, head as orientation, loc_time as time, 
	   loc_time - lag(loc_time) over (partition by encrypt_plate_id order by loc_time) as lag
  FROM reports
  WHERE ST_Intersects(geom,(select geom from regions where gid = 23))
  ORDER BY encrypt_plate_id ASC, loc_time ASC;