#make the deploy.sh file executable with ./deploy.sh from terminal
chmod +x deploy.sh

# Create virtual environment
python3 -m venv venv
# Activate virtual environment
source venv/bin/activate

# Upgrade pip
pip install --upgrade pip
# Install dependencies
pip install -r requirements.txt

# Set up HTTPS certificates
openssl req -x509 -sha256 -nodes -newkey rsa:2048 -days 365 -keyout key.pem -out cert.pem  \
	-subj '/C=GR/ST=Attica/L=Athens/O=Ntua'

# Run the server (NOT in the background, so we can kill it with a simple CTR-C) with the https certificates created above
flask run --cert=cert.pem --key=key.pem 
$SHELL