from rest_framework import serializers
from .models import Room,Event,Participator


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


class EventSerializer(serializers.ModelSerializer):

    ort = serializers.PrimaryKeyRelatedField(queryset=Room.objects.all())
    veranstaltung = ParticipatorListSerializer(many=True, read_only=True)

    class Meta:
        model = Event
        fields = ('id','bezeichnung', 'datum', 'von', 'bis', 'max_teilnehmer', 'ort','veranstaltung')

    def create(self, validated_data):
        validated_data.pop('id', None)  # remove movie_id from the comment data

        return Event.objects.create(**validated_data)
