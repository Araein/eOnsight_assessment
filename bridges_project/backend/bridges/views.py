
from rest_framework import generics
from .models import Bridge
from .serializers import BridgeSerializer

class BridgeListCreateAPIView(generics.ListCreateAPIView):
    queryset = Bridge.objects.all()
    serializer_class = BridgeSerializer

class BridgeDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Bridge.objects.all()
    serializer_class = BridgeSerializer
