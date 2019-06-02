from rest_framework import viewsets,filters,response,status
from .models import Room,Participator,Event
from .serializers import RoomSerializer,ParticipatorSerializer,ParticipatorListSerializer,EventSerializer
from rest_framework_extensions.mixins import NestedViewSetMixin
from django_filters.rest_framework import DjangoFilterBackend


class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    paginate_by = 50
    ordering = ['id']
    serializer_class = RoomSerializer


class ParticipatorViewSet(viewsets.ModelViewSet):
    queryset = Participator.objects.all()
    serializer_class = ParticipatorSerializer
    paginate_by = 50
    ordering = ['id']
    filter_backends = (filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter,)
    ordering_fields = ('id',)
    search_fields = ('vorname','nachname')
    filter_fields = ('veranstaltung',)

    def post(request):
        serializer = ParticipatorSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)  # Trigger Bad Request if errors exist
        return response.Response(serializer.data, status=status.HTTP_201_CREATED)


class ParticipatorListViewSet(viewsets.ReadOnlyModelViewSet, NestedViewSetMixin):
    serializer_class = ParticipatorListSerializer
    paginate_by = 50
    ordering = ['id']

    def get_queryset(self):
        queryset = Participator.objects.all()
        return self.filter_queryset_by_parents_lookups(queryset)


class EventViewSet(viewsets.ModelViewSet, NestedViewSetMixin):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    filter_backends = (filters.SearchFilter,DjangoFilterBackend, filters.OrderingFilter, )
    paginate_by = 50
    ordering = ['bezeichnung']
    ordering_fields = ('bezeichnung',)
    filter_fields = ('datum','von', 'bis')
    search_fields = ('bezeichnung',)
