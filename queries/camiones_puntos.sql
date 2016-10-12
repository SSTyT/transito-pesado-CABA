SELECT encrypt_plate_id, latitude, longitude, loc_time, speed, head
FROM public.reports
  INNER JOIN camiones USING (encrypt_plate_id); 