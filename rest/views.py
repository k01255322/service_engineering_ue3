from rest_framework import viewsets,filters
from .models import Room,Participator,Event
from .serializers import RoomSerializer,ParticipatorSerializer,ParticipatorListSerializer,EventSerializer
from rest_framework_extensions.mixins import NestedViewSetMixin
from django_filters.rest_framework import DjangoFilterBackend


class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class ParticipatorViewSet(viewsets.ModelViewSet):
    queryset = Participator.objects.all()
    serializer_class = ParticipatorSerializer
    filter_backends = (filters.SearchFilter, DjangoFilterBackend,)
    search_fields = ('vorname','nachname')


class ParticipatorListViewSet(viewsets.ReadOnlyModelViewSet, NestedViewSetMixin):
    serializer_class = ParticipatorListSerializer

    def get_queryset(self):
        queryset = Participator.objects.all()
        return self.filter_queryset_by_parents_lookups(queryset)


class EventViewSet(viewsets.ModelViewSet, NestedViewSetMixin):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    filter_backends = (filters.SearchFilter,DjangoFilterBackend )
    filter_fields = ('datum','von', 'bis')
    search_fields = ('bezeichnung',)
