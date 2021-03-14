# softeng_ntua_2021

## Software Engineering NTUA 2020-2021 Project
### Oμάδα 70

Η ομάδα μας αποτελείται από τους:
--------------------------------

* [Μαρκάκης Νικόλαος](https://github.com/markakisn "Μαρκάκης Νικόλαος") `ΑΜ: 03117123` `el17123@mail.ntua.gr`
Ο Μαρκάκης Νικόλαος έχει κάνει commit στο repository απο δύο διαφορετικά προσωπικά του account, ένα αυτό που βλέπετε, ενω ακόμη και από το [el17123](https://github.com/el17123 "el17123")
* [Μυροπούλου Νεφέλη](https://github.com/nefeli-my "Μυροπούλου Νεφέλη") `ΑΜ: 03117197` `el17197@mail.ntua.gr`
* [Παπαϊωάνου Γεώργιος](https://github.com/georgepap9808 "Παπαϊωάνου Γεώργιος") `ΑΜ: 03117836` `el17836@mail.ntua.gr`
* [Στάβαρης Δημοσθένης](https://github.com/dimos-stavaris "Στάβαρης Δημοσθένης") `ΑΜ: 03117404` `el17404@mail.ntua.gr`


Κλωνοποίηση αποθετηρίου
-----------------------
```bash
git clone https://github.com/nefeli-my/softeng_ntua_2021.git
cd softeng_ntua_2021
```

Εγκατάσταση και εκτέλεση του backend
------------------------------------
## Flask backend
```bash
cd backend
deploy.sh
cd softeng_ntua_2021
python3 -m venv venv
venv/scripts/activate
pip install -r requirements.txt
cd backend
flaskrun.sh
```

### Κάθε επόμενη εκτέλεση του backend
```bash
cd softeng_ntua_2021
venv/scripts/activate
source venv/scripts/activate
cd backend
flaskrun.sh
```

Εγκατάσταση και εκτέλεση του Frontend
--------------------



Εγκατάσταση και εκτέλεση cli
---------------
### Εγκατάσταση και εκτέλεση την πρώτη φορά
```bash
cd cli-client
npm install -g
npm link
ev_group70
```

### Κάθε επόμενη εκτέλεση του cli
```bash
cd cli-client
ev_group70
```

Για παραδείγματα εκτέλεσης του cli μπορείτε να δείτε το αρχείο [examples-cli](https://github.com/nefeli-my/softeng_ntua_2021/blob/main/cli-client/examples-cli.txt "examples-cli") 

Testing
--------

### Εγκατάση πακέτου για Testing
```bash
cd backend
npm install -g newman
```

### Εκτέλεση testing
```bash
cd tests
npm run softeng.postman_collection.json -g softeng.postman_globals.json -n 10
```
