
// const express = require('express');
// const {exec} = require('child_process');

// const app = express();
// console.log('start')

// app.get('/open-program', (req, response) => {
  
//   console.log(req)

//  let programName = '"C:\\WINDOWS\\system32\\notepad.exe"'

//   exec(programName, (err) => {
//     console.log(programName)
//     if (err) {
//       console.error(err);
//       return response.status(500).json({ error: 'Could not open program' });
//     }
  
// });
//   console.log('Program opened successfully');
// return response.status(200).json({message: 'Program opened successfully' });
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });


// const express = require('express');
// const { exec } = require('child_process');

// const app = express();
// const PORT = 3000;

// app.get('/open/:programName', async (req, res) => {
//   console.log(req)
//   const programName = req.params.programName;
// console.log(programName)
//   try {
//     await openProgram(programName);
//     res.status(200).send(`Successfully opened ${programName}`);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error opening program');
//   }
// });

// function openProgram(programName) {
//   return new Promise((resolve, reject) => {
//     exec(`start ${programName}`, (error, stdout, stderr) => {
//       if (error) {
//         reject(error);
//         return;
//       }
//       resolve();
//     });
//   });
// }

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

const express = require('express');
const bodyParser = require('body-parser')
const { exec } = require('child_process');

const app = express();
const cors = require('cors');
app.use(cors());
// const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.post('/open-program', (req, res) => {
  console.log(req)
  console.log('bodeyyyyyyyyyyyyyyyy:'+req.body)
    const { programPath } = req.body;
    if (!programPath) {
        return res.status(400).json({ error: 'Program path is required' });
    }
    exec(`"${programPath}"`, (error) => {
        if (error) {
            console.error(`Error opening program: ${error}`);
            return res.status(500).json({ error: 'Internal server error' });
        }
        console.log(`Program opened: ${programPath}`);
        res.status(200).json({ message: 'Program opened successfully' });
    });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});