
from django.contrib import admin
from .models import Bridge

@admin.register(Bridge)
class BridgeAdmin(admin.ModelAdmin):
    list_display = ('name', 'location', 'inspection_date', 'status', 'traffic_load')
    search_fields = ('name', 'status')
    list_filter = ('status', 'inspection_date')
    ordering = ('name',)
    fieldsets = [
        (None, {'fields': ['name', 'location', 'inspection_date', 'status', 'traffic_load']}),
    ]

