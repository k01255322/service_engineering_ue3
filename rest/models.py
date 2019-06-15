from django.db import models
from django.contrib.auth.models import User


class Room(models.Model):
    id = models.CharField(primary_key=True, max_length=20)

    def __str__(self):
        return self.id


class Event(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    bezeichnung = models.CharField(max_length=50)
    datum = models.DateField(default='2019-01-01')
    von = models.TimeField(default='10:00')
    bis = models.TimeField(default='11:00')
    max_teilnehmer = models.IntegerField(null=True)
    ort = models.ForeignKey(Room, related_name='raum', on_delete=models.CASCADE)

    def __str__(self):
        return self.bezeichnung


class Participator(models.Model):
    vorname = models.CharField(max_length=100)
    nachname = models.CharField(max_length=100)
    veranstaltung = models.ForeignKey(Event, related_name='veranstaltung', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.vorname)+" "+str(self.nachname)
