// for the login test
let jsonData = pm.response.json();

pm.test("Health Check", function () {
    pm.response.to.have.status(200);
    pm.expect(pm.response.responseTime).to.be.below(300);
});

pm.test("Login Test", function () {
    let hash = jsonData.hash;
    pm.expect(jsonData.hash).to.eql("pbkdf2:sha256:150000$ct5SjfqH$fab44d5e71fafb975f45c5799d5bcc0795d463aae65a0bae9e7b123172630ac6");
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

// for the ProviderbyUser test
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
