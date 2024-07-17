
from django.db import models
from django.contrib.gis.db import models as gis_models
from django.contrib.gis.geos import Point

class Bridge(models.Model):

    STATUS_CHOICES = [
    ('Good', 'Good'),
    ('Fair', 'Fair'),
    ('Poor', 'Poor'),
    ('Bad', 'Bad'),
    ]

    name = models.CharField(max_length=100)
    location = gis_models.PointField(geography=True, srid=4326, default=Point(0, 0))
    inspection_date = models.DateField()
    status = models.CharField(max_length=50, choices=STATUS_CHOICES)
    traffic_load = models.IntegerField()

    def __str__(self):
        return self.name
    class Meta:
        db_table = 'bridges'

