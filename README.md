##Running Docker:

###Building

```
docker build . -t <your username>/films
```

###Running

```
docker run -p 8050:8000 -e APP_PORT=8050 <your username>/films
```

###Kill container

```
sudo docker ps
```

```
sudo docker kill <container id>
```

Now, you should send requests on http://127.0.0.1:8050

###Auth:

  Use bearer token for /api/v1/movies routes.

##Files structure

.env - configuration for express app

app.js - main file

./migrations - contains migrations

./src/v1 - all source code of this project

./src/v1/config - contains config for db

./src/v1/routes - contains all routers for this app

./src/v1/controllers - contains all controller layer files

./src/v1/services - contains all service layer files

./src/v1/models - contains all models layer files
