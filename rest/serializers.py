from rest_framework import serializers
from .models import Room,Event,Participator
from django.contrib.auth.models import User


class RoomSerializer(serializers.ModelSerializer):

    class Meta:
        model = Room
        fields = '__all__'


class ParticipatorSerializer(serializers.ModelSerializer):
    veranstaltung = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all())

    class Meta:
        model = Participator
        fields =('id', 'vorname', 'nachname','veranstaltung')


class ParticipatorListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Participator
        fields =('id', 'vorname', 'nachname')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name')


class EventSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(many=False)
    ort = serializers.PrimaryKeyRelatedField(queryset=Room.objects.all())
    veranstaltung = ParticipatorListSerializer(many=True,read_only=True, required=False)

    class Meta:
        model = Event
        fields = ('id','user','bezeichnung', 'datum', 'von', 'bis', 'max_teilnehmer', 'ort','veranstaltung')

    def create(self, validated_data):
        validated_data.pop('id', None)

        return Event.objects.create(**validated_data)

