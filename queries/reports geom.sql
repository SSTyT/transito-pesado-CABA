ALTER TABLE public.reports ADD COLUMN geom geometry(Point,4326);

UPDATE public.reports as a SET geom = ST_SetSRID(ST_MakePoint(a.longitude,a.latitude),4326);