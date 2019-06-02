Übung 4 – JavaScript Webanwendung mit REST

Realisieren Sie die Aufgabe von Übung 2 auf der Basis der in Übung 3 vorgestellten
Frontendtechnologien. Entwickeln Sie eine REST-Schnittstelle, um vom Frontend auf das
Backend zuzugreifen. Realisieren Sie die REST-Schnittstelle auf der Basis der OpenAPISpezifikation
mit dem API-Framework Swagger (https://swagger.io).

Diskutieren Sie die entwickelte REST-Schnittstelle für ihr Service anhand der in der Vorlesung
besprochenen Konzepte des REST-Architekturstils. Welche zentralen REST-Konzepte wurden
umgesetzt, welche nicht, wie wurden sie umgesetzt und wo wurden ggfs. REST-Konzepte
verletzt?

Abgabe der Dokumente + zip-Datei mit dem Source Code oder Link auf Coderepository via
Moodle bis 2.6.2019, 12 Uhr. Präsentationstermin der Übung: 3.6.2019.

<b>To-Dos:
>>~~Simon: REST-Schnittstelle~~<br></br>
>>Tobias: Angular --> index.html, Veranstaltung anlegen<br></br>
>>Ernst: Angular --> Veranstaltungsliste</b><br></br>


REST-Schnittstelle
==================

Zuerst muss Python installiert werden [klick hier](https://www.python.org/downloads/)

Folgende Schritte sind zum starten des Programs notwendig

# Schritt 1

```python
pip install -r requirements.txt
```


# Schritt 2

```python
py manage.py migrate
```

# Schritt 3

```python
py manage.py makemigrations rest
```


# Schritt 4

```python
py manage.py createsuperuser
```

# Schritt 5

```python
py manage.py runserver
```
Terminal nicht schließen!!
Die REST-Schnittstelle ist unter http://127.0.0.1:8000/api/ erreichbar.
Die Swagger-Dokumentation ist unter http://127.0.0.1:8000/doc/ erreichbar.
Die Datenbank kann unter http://127.0.0.1:8000/admin/ direkt bearbeitet werden. Login ist mit den in Schritt 4 angelegten Daten möglich!

Angular-Server
==================
# Schritt 1
Ins Verzeichnis veranstaltungsservice_angular/service/ wechseln
```python
npm install
```


# Schritt 2

```python
ng serve
```
Im Browser localhost:4200 eingeben

