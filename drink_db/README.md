# About

This is simple rails application that is central point of our bartender ecosystem. It main function is:

* Exposes graphql api that allows us to communicate between microservices
* Manage list of drinks and ingredients
* Limit access to panel using google account and ouath
* Special ui for screen on bartender that displays QR code for payments

# Development

Just run these commands:

```bash
bundle install
pip3 install -f requirements.txt
cp .env.example .env
docker-compose up
rake db:create
rake db:migrate
python3 bridge/login.py
foreman start
bin/webpack-dev-server
```

# Setup

## Google Auth

* Go to 'https://console.developers.google.com'
* Select your project.
* Go to Credentials, then select the "OAuth consent screen" tab on top, and provide an 'EMAIL ADDRESS' and a 'PRODUCT NAME'
* Wait 10 minutes for changes to take effect.
* Copy client id and secret

Edit .env and put in it:

```env
GOOGLE_CLIENT_ID=xxxxxxxxx
GOOGLE_CLIENT_SECRET=xxxxxxxxx
```

## Run migrations

```
heroku run rake db:migrate db:seed --app drinks-db
```

## References
* https://developer.amazon.com/alexa/console/ask
* http://railscasts.com/episodes/241-simple-omniauth-revised
* http://www.drinksmixer.com/
* http://www.barmix.com.pl/

