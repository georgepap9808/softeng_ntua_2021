//#1 for the Login test
let jsonData = pm.response.json();
pm.globals.set("tokens", jsonData.token);

const getRequest = {
    url: 'https://127.0.0.1:5000/evcharge/api/providerByUser?id=1',
    method: 'GET',
    header: {
        'X-OBSERVATORY-AUTH': data.token
    },
    body: {
        mode: 'raw',
        raw: JSON.stringify({ key: 'this is json' })
    }
};

pm.test("Health Check", function () {
    pm.response.to.have.status(200);
    pm.expect(pm.response.responseTime).to.be.below(300);
});

pm.test("Token test", function() {
    pm.sendRequest(getRequest, (err, res) => {
        pm.expect(pm.response.headers.get('X-OBSERVATORY-AUTH')).to.eql(data.token);
    })
});

pm.sendRequest({
    url: "https://127.0.0.1:5000/evcharge/api/login?username=markakisn&password=yay123",
    method: 'POST',
    body: {
        mode: 'raw',
        raw: JSON.stringify({ key: "this is json" })
    }
}, function (err, res) {
    if (err) {
        console.log(err)
    } else {
        const data = res.json();
        pm.globals.set("tokens", data.token);
        console.log(data.token);
    }
});


//#2 for the ProviderbyUser test
pm.sendRequest({
    url: "https://127.0.0.1:5000/evcharge/api/login?username=markakisn&password=yay123",
    method: 'POST',
    body: {
        mode: 'raw',
        raw: JSON.stringify({ key: "this is json" })
    }
}, function (err, res) {
    if (err) {
        console.log(err)
    } else {
        const data = res.json();
        pm.globals.set("tokens", data.token);
        console.log(data.token);
    }
});

const getRequest = {
    url: 'https://127.0.0.1:5000/evcharge/api/providerByUser?id=1',
    method: 'GET',
    header: {
        'X-OBSERVATORY-AUTH': data.token
    },
    body: {
        mode: 'raw',
        raw: JSON.stringify({ key: 'this is json' })
    }
};


pm.test("Health check", function() {
    pm.sendRequest(getRequest, (err, res) => {
        pm.response.to.have.status(200);
        pm.expect(pm.response.responseTime).to.be.below(300);
    })
});

pm.test("Token test", function() {
    pm.sendRequest(getRequest, (err, res) => {
        pm.expect(pm.response.headers.get('X-OBSERVATORY-AUTH')).to.eql(data.token);
    })
});


//#3 for the UsersData test
let users_data = pm.response.json();

pm.test("Health check", function() {
    pm.response.to.have.status(200);
    pm.expect(pm.response.responseTime).to.be.below(300);
});

pm.test("UsersData check", function() {
    pm.request.to.have.header("X-OBSERVATORY-AUTH");
    pm.expect(users_data).to.have.all.keys('username', 'first_name', 'last_name', 'country', 'city', 'street', 'number', 'zip_code');
});


//#4 for the UsersVehicles test
let vehicle_data = pm.response.json();

pm.test("Health check", function() {
    pm.response.to.have.status(200);
    pm.expect(pm.response.responseTime).to.be.below(300);
});

pm.test("UsersVehicles check", function() {
    pm.request.to.have.header("X-OBSERVATORY-AUTH");
    pm.expect(vehicle_data).to.have.all.keys('total', 'vehicles');
    pm.expect(vehicle_data.total).to.be.a('number');
    pm.expect(vehicle_data.vehicles).to.be.an('array');
    if (vehicle_data.vehicles.length != 0) {
        pm.expect(vehicle_data.vehicles[0]).to.have.all.keys('registration_plate', 'user_id', 'manufacturer', 'model');
    }
});


//#5 for the Stations test
let station_data = pm.response.json();

pm.test("Health check", function() {
    pm.response.to.have.status(200);
    pm.expect(pm.response.responseTime).to.be.below(300);
});

pm.test("Stations check", function() {
    pm.request.to.have.header("X-OBSERVATORY-AUTH");
    pm.expect(station_data.total).to.be.a('number');
    pm.expect(station_data.stations).to.be.an('array');
    if (station_data.stations.length != 0) {
        pm.expect(station_data.stations[0]).to.have.all.keys('id', 'number', 'country', 'city', 'avg_rating', 'num_ratings', 'street');
    }
});


//#6 for the Bills test
let bill_data = pm.response.json();

pm.test("Health check", function() {
    pm.response.to.have.status(200);
    pm.expect(pm.response.responseTime).to.be.below(300);
});

pm.test("Bills check", function() {
    pm.request.to.have.header("X-OBSERVATORY-AUTH");
    pm.expect(bill_data.total).to.be.a('number');
    pm.expect(bill_data.bills).to.be.an('array');
    if (bill_data.bills.length != 0) {
        pm.expect(bill_data.bills[0]).to.have.all.keys('period_end_date', 'id', 'user_id', 'period_start_date', 'is_paid', 'total_cost');
    }
});


//#7 for the UserCards test
let card_data = pm.response.json();

pm.test("Health check", function() {
    pm.response.to.have.status(200);
    pm.expect(pm.response.responseTime).to.be.below(300);
});

pm.test("UserCards check", function() {
    pm.request.to.have.header("X-OBSERVATORY-AUTH");
    pm.expect(pm.response.headers.get('X-OBSERVATORY-AUTH')).to.eql(data.token);
    pm.expect(card_data.total).to.be.a('number');
    pm.expect(card_data.cards).to.be.an('array');
    if (card_data.cards.length != 0) {
        pm.expect(card_data.cards[0]).to.have.all.keys('cvc_code', 'card_expiration', 'card_number', 'user_id');
    }
});


//#8 for the Card test
let check_card = pm.response.json();

const getRequest = {
    url: 'https://127.0.0.1:5000/evcharge/api/card?user_id=1',
    method: 'GET',
    header: {
        'X-OBSERVATORY-AUTH': data.token
    },
    body: {
        mode: 'raw',
        raw: JSON.stringify({ key: 'this is json' })
    }
};

pm.test("Health check #1", function() {
    pm.response.to.have.status(200);
    pm.expect(pm.response.responseTime).to.be.below(300);
    pm.request.to.have.header("X-OBSERVATORY-AUTH");
});

pm.test("Health check #2", function() {
    pm.sendRequest(getRequest, (err, res) => {
        pm.request.to.have.header("X-OBSERVATORY-AUTH");
        pm.response.to.have.status(200);
        pm.expect(pm.response.responseTime).to.be.below(300);
    })
});

pm.test("Card check", function() {
    pm.sendRequest(getRequest, (err, res) => {
        pm.expect(pm.response.json()).to.eql(check_card);
    })
});


//#9 for the SessionsPerDate test
let perdate_data = pm.response.json();

pm.test("Health check", function() {
    pm.response.to.have.status(200);
    pm.expect(pm.response.responseTime).to.be.below(300);
});

pm.test("SessionsPerDate check", function() {
    pm.request.to.have.header("X-OBSERVATORY-AUTH");
    pm.expect(pm.response.headers.get('X-OBSERVATORY-AUTH')).to.eql(data.token);
    pm.expect(perdate_data.total).to.be.a('number');
    pm.expect(perdate_data.sessions).to.be.an('array');
    if (perdate_data.sessions.length != 0) {
        pm.expect(perdate_data.sessions[0]).to.have.all.keys('finishing_time', 'id', 'station_id', 'user_id', 'provider_id', 'registration_plate', 'kwh_delivered', 'starting_time', 'kwh_cost');
        pm.expect(perdate_data.sessions[0].user_id).to.eql(1);
    }
});


//#10 for the SessionsPerEV test
let perev_data = pm.response.json();

pm.test("Health check", function() {
    pm.response.to.have.status(200);
    pm.expect(pm.response.responseTime).to.be.below(300);
});

pm.test("SessionsPerEV check", function() {
    pm.request.to.have.header("X-OBSERVATORY-AUTH");
    pm.expect(pm.response.headers.get('X-OBSERVATORY-AUTH')).to.eql(data.token);
    pm.expect(perev_data.total).to.be.a('number');
    pm.expect(perev_data.sessions).to.be.an('array');
    if (perev_data.sessions.length > 0) {
        pm.expect(perev_data.sessions[0]).to.have.all.keys('finishing_time', 'id', 'station_id', 'user_id', 'provider_id', 'registration_plate', 'kwh_delivered', 'starting_time', 'kwh_cost');
        pm.expect(perev_data.sessions[0].registration_plate).to.eql('GDJ7893');
    }
});


//#11 for the SessionsPerProvider test
let perprov_data = pm.response.json();

pm.test("Health check", function() {
    pm.response.to.have.status(200);
    pm.expect(pm.response.responseTime).to.be.below(300);
});

pm.test("SessionsPerProvider check", function() {
    pm.request.to.have.header("X-OBSERVATORY-AUTH");
    pm.expect(pm.response.headers.get('X-OBSERVATORY-AUTH')).to.eql(data.token);
    pm.expect(perprov_data.total).to.be.a('number');
    pm.expect(perprov_data.sessions).to.be.an('array');
    if (perprov_data.sessions.length != 0) {
        pm.expect(perprov_data.sessions[0]).to.have.all.keys('finishing_time', 'id', 'station_id', 'user_id', 'provider_id', 'registration_plate', 'kwh_delivered', 'starting_time', 'kwh_cost');
        pm.expect(perprov_data.sessions[0].provider_id).to.eql(1);
    }
});


//#12 for the SessionsPerStation test
let perstation_data = pm.response.json();

pm.test("Health check", function() {
    pm.response.to.have.status(200);
    pm.expect(pm.response.responseTime).to.be.below(300);
});

pm.test("SessionsPerStation check", function() {
    pm.request.to.have.header("X-OBSERVATORY-AUTH");
    pm.expect(pm.response.headers.get('X-OBSERVATORY-AUTH')).to.eql(data.token);
    pm.expect(perstation_data.total).to.be.a('number');
    pm.expect(perstation_data.sessions).to.be.an('array');
    if (perstation_data.sessions.length != 0) {
        pm.expect(perstation_data.sessions[0]).to.have.all.keys('finishing_time', 'id', 'station_id', 'user_id', 'provider_id', 'registration_plate', 'kwh_delivered', 'starting_time', 'kwh_cost');
        pm.expect(perstation_data.sessions[0].station_id).to.eql(10);
    }
});


//#13 for the Logout test
postman.clearGlobalVariable("tokens");

pm.test("Health check", function() {
    pm.response.to.have.status(200);
    pm.expect(pm.response.responseTime).to.be.below(300);
});

pm.test("Logout check", function() {
    pm.response.to.not.have.header("X-OBSERVATORY-AUTH");
});