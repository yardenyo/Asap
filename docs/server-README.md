## ASAP - Academic Staff Appointment Process

### System users
* django admin user: `asapadmin`/`4tOmH3aRTm0Th3r`
* asap admin dummy user: `dummy-asap-admin`/`asapadmin123`
* asap department head dummy user: `dummy-asap-dept-head`/`asapdepthead123`

### DB
#### Dump data
```
python manage.py dumpdata auth.group auth.user auth.user_groups > asap\fixtures\asap-db.json
```
