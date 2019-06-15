from rest_framework import viewsets,filters,response,status,permissions
from .models import Room,Participator,Event
from . import serializers
from rest_framework_extensions.mixins import NestedViewSetMixin
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework.response import Response


class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    paginate_by = 50
    ordering = ['id']
    serializer_class = serializers.RoomSerializer


class ParticipatorViewSet(viewsets.ModelViewSet):
    queryset = Participator.objects.all()
    serializer_class = serializers.ParticipatorSerializer
    paginate_by = 50
    ordering = ['id']
    filter_backends = (filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter,)
    ordering_fields = ('id',)
    search_fields = ('vorname','nachname')
    filter_fields = ('veranstaltung',)
    permission_classes = (permissions.IsAuthenticated,)

    def post(request):
        serializer = serializers.ParticipatorSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)  # Trigger Bad Request if errors exist
        return response.Response(serializer.data, status=status.HTTP_201_CREATED)


class ParticipatorListViewSet(viewsets.ReadOnlyModelViewSet, NestedViewSetMixin):
    serializer_class = serializers.ParticipatorListSerializer
    paginate_by = 50
    ordering = ['id']
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        queryset = Participator.objects.all()
        return self.filter_queryset_by_parents_lookups(queryset)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Provides basic CRUD functions for the User model
    """
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = (permissions.IsAuthenticated, )


class EventViewSet(viewsets.ModelViewSet, NestedViewSetMixin):
    queryset = Event.objects.all()
    serializer_class = serializers.EventSerializer
    filter_backends = (filters.SearchFilter,DjangoFilterBackend, filters.OrderingFilter, )
    paginate_by = 50
    ordering = ['bezeichnung']
    ordering_fields = ('bezeichnung',)
    filter_fields = ('datum','von', 'bis')
    search_fields = ('bezeichnung',)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

