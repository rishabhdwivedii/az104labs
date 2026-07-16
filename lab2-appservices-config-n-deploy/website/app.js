const express = require("express");

const app = express();

const port = process.env.PORT || 8080;

const greeting =
    process.env.GREETING ||
    "Hello from Azure App Service!";

const environment =
    process.env.ENVIRONMENT ||
    "Development";

const version =
    process.env.VERSION ||
    "1.0";

app.get("/", (req, res) => {

    res.send(`
    <!DOCTYPE html>

    <html>

    <head>

        <title>AZ-104 App Service Demo</title>

        <style>

            body{

                font-family:Segoe UI;
                text-align:center;
                margin-top:80px;
                background:#0078D4;
                color:white;

            }

            .card{

                width:700px;
                margin:auto;
                padding:40px;
                border-radius:12px;
                background:#005A9E;

            }

        </style>

    </head>

    <body>

        <div class="card">

            <h1>${greeting}</h1>

            <h2>Azure App Service Configuration Demo</h2>

            <hr>

            <h3>Environment : ${environment}</h3>

            <h3>Version : ${version}</h3>

            <h3>Hostname : ${process.env.WEBSITE_HOSTNAME}</h3>

        </div>

    </body>

    </html>
    `);

});

app.listen(port);