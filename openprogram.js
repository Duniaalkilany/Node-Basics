const { exec } = require('child_process');

// Replace "notepad.exe" with the path to the program you want to open
const programPath = '"C:\\Program Files\\SmartBear\\SoapUI-5.7.0\\bin\\SoapUI-5.7.0.exe"';

exec(programPath, (error) => {
  if (error) {
    console.error(`Error opening program: ${error}`);
    return;
  }
  console.log(`Program opened successfully: ${programPath}`);
 
});


