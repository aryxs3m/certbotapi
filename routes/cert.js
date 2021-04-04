const {spawn} = require('child_process');

const certRoutes = (app, fs) => {

    app.post('/new-cert', (req, res) => {
        if (typeof req.body.domain != 'undefined')
        {

            let error = false;

            var stdoutChunks = [], stderrChunks = [];

            const child = spawn('certbot', [
                "--noninteractive", "--agree-tos", "--register-unsafely-without-email", '-d', req.body.domain,
                "certonly", "--webroot", '-w', process.env.WEBROOT
            ]);
            
            child.on('error', function(err) {
                error = true;
                res.send({
                    success: false,
                    error: err
                });
            });

            child.on('exit', (code) =>
                console.log('Process exited with code', code)
            );
        
            child.stdout.on('data', (data) => {
                stdoutChunks = stdoutChunks.concat(data);
            });

            child.stdout.on('end', () => {
                if (!error)
                {
                    var stdoutContent = Buffer.concat(stdoutChunks).toString();
                    res.send({
                        success: true,
                        stdout: stdoutContent
                    });
                }
            });
        
            child.stderr.on('data', (data) => {
                stderrChunks = stderrChunks.concat(data);
            });

            child.stderr.on('end', () => {
                if (!error)
                {
                    var stderrContent = Buffer.concat(stderrChunks).toString();
                    res.send({
                        success: false,
                        error: stderrContent
                    });
                    error = true;
                }
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