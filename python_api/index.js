const { spawn } = require('child_process');
const http = require('http');

const server = http.createServer((req, res) => {
    let jsonString ='';
    req.on('data', (chunk) => {
        jsonString += chunk;
    });

    req.on('end', () => {
        const pythonProcess = spawn('python', ['main.py', jsonString]);

        let result = '';
        pythonProcess.stdout.on('data', (data) => {
            result += data.toString();
        });

        pythonProcess.on('close', (code) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(result);
        });
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log('Server listening on port ${PORT}');
});

variable_to_pass = {
    'i:label__contains': computer, 
    'i:fqdn__contains': 'forestry.oregonstate.edu', 
    'e:fqdn__contains': 'DOCK', 
    'e:fqdn__contains': 'dock'
}

// code to pass to python