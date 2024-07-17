
from django.urls import path
from .views import BridgeListCreateAPIView, BridgeDetailAPIView

urlpatterns = [
    path('bridges/', BridgeListCreateAPIView.as_view(), name='bridge-list-create'),
    path('bridges/<int:pk>/', BridgeDetailAPIView.as_view(), name='bridge-detail'),
]