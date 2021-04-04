const { exec } = require("child_process");

const certRoutes = (app, fs) => {

    app.post('/new-cert', (req, res) => {
        if (typeof req.body.domain != 'undefined')
        {
            exec(`certbot --noninteractive --agree-tos --register-unsafely-without-email -d ${req.body.domain} certonly --webroot -w ${process.env.WEBROOT}`, (error, stdout, stderr) => {
                if (error) {
                    res.send({
                        success: false,
                        error: error.message
                    });
                    return;
                }
                if (stderr) {
                    res.send({
                        success: false,
                        error: stderr
                    });
                    return;
                }

                res.send({
                    success: true,
                    stdout: stdout
                });
            });

        }
        else
        {
            res.send({
                success: false,
                error: "Required parameter missing: domain"
            });
        }
    });

};

module.exports = certRoutes;