from rest_framework import serializers
from .models import Bridge
from django.contrib.gis.geos import Point


# custom serializer pour gis_models.PointField

class PointField(serializers.Field):
    def to_representation(self, value):
        return {
            'type': 'Point',
            'coordinates': [value.x, value.y]
        }

    def to_internal_value(self, data):
        if 'coordinates' in data and len(data['coordinates']) == 2:
            return Point(data['coordinates'][0], data['coordinates'][1])
        raise serializers.ValidationError("Invalid location format")

class BridgeSerializer(serializers.ModelSerializer):
    location = PointField()

    class Meta:
        model = Bridge
        fields = '__all__'

