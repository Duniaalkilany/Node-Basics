// const { spawn } = require('child_process');

// // Function to open a program by its name
// function openProgram(programName) {
//     let command;
//     let args = [];
//     switch (process.platform) {
//         case 'win32': // Windows
//             command = programName;
//             break;
//         case 'darwin': // macOS
//             command = 'open';
//             args.push('-a', programName);
//             break;
//         case 'linux': // Linux
//             command = programName;
//             break;
//         default:
//             console.error('Unsupported platform:', process.platform);
//             return;
//     }

//     // Spawn the process
//     const childProcess = spawn(command, args);

//     // Listen for any errors
//     childProcess.on('error', (error) => {
//         console.error(`Error opening ${programName}:`, error.message);
//     });

//     // Listen for when the process exits
//     childProcess.on('exit', (code, signal) => {
//         if (code === 0) {
//             console.log(`${programName} opened successfully`);
//         } else {
//             console.error(`Error opening ${programName}. Process exited with code ${code}`);
//         }
//     });
// }

// // Usage example
// openProgram('SoapUI-5.7.0'); // Change 'notepad' to the name of the program you want to open

const express = require('express');
const bodyParser = require('body-parser')
const { spawn } = require('child_process');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
const path = require('path');
const fs = require('fs');

// Function to open a program by its name
app.post('/program-name', (req, res) => {
    const {programName} =req.body
function openProgram(programName) {
    // Check if PATH environment variable exists
    if (!process.env.PATH) {
        console.error('Error: PATH environment variable is not defined.');
        return res.status(500).json({error:'path environment variable is not defined'});
    }

    // Resolve the program name to its full path by searching through the system's PATH environment variable
console.log(process.env.PATH.split(path.delimiter))
    const fullPath = process.env.PATH.split(path.delimiter)
        .map(dir => path.join(dir, programName))
        .find(file => {
            try {
                return fs.statSync(file).isFile();
            } catch (error) {
                return false;
            }
        });
console.log('FullPath : ',fullPath)
    // If the program's full path is found, spawn the process
    if (fullPath) {
        const childProcess = spawn(fullPath, [], { detached: true, stdio: 'ignore' });
        childProcess.unref(); // Allow the parent process to exit independently
        console.log(`${programName} opened successfully`);
        return res.status(200).json({message: 'Opened'})
    } else {
        console.error(`Error: ${programName} not found in the system's PATH`);
    return res.status(500).json({error:'not Opened'})
    }
}
openProgram(programName);
});
// Usage example

app.listen(3000, () => {
    console.log('Server is running on port 3000');
  }); 


