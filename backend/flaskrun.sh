# Run the server (NOT in the background, so we can kill it with a simple CTR-C) with the https certificates created above
#just for lazy testing the https certificates
flask run --cert=cert.pem --key=key.pem 
$SHELL