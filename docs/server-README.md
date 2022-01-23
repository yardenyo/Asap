## ASAP - Academic Staff Appointment Process

### System users
* django admin user: `asapadmin`/`4tOmH3aRTm0Th3r`
* asap admin dummy user: `dummy-asap-admin`/`asapadmin123`
* asap department head dummy user: `dummy-asap-dept-head`/`asapdepthead123`
* asap department head dummy user: `dummy-asap-appt-chair`/`asapapptchair123!`
* `dept-1-user-1`/`qawsedrf123`
* `dept-1-user-2`/`qawsedrf123`
* `dept-2-user-1`/`qawsedrf123`
* `dept-2-user-2`/`qawsedrf123`
* `dept-3-user-1`/`qawsedrf123`
* `dept-3-user-2`/`qawsedrf123`

### DB
#### Dump data
```
python .\manage.py dumpdata auth.group auth.user auth.user_groups core.version core.profile core.application core.applicationstep core.rank core.department > core\fixtures\core.json
```

### Setup env
* Client
  * Run `npm install` from `code/client/asap`
* Server
  * Install 3rd parties: `pip install -r requirements.txt`
  * Run DB script from `build/db`
  * Run migration: `python manage.py migrate`
  * Populate DB: `python manage.py loaddata core`
  * Copy `build/.env/.env.dev` to `code/server/src/asap` and rename it to `.env`
