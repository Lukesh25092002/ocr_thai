const { spawn } = require('child_process');

function runPythonFunction(arg, pythonScriptPath, callback) {
  // Spawn a new Python process
  const pythonProcess = spawn('python', [pythonScriptPath]);

  // Send the argument to Python script
  pythonProcess.stdin.write(JSON.stringify(arg));
  pythonProcess.stdin.end();

  let outputData = '';

  pythonProcess.stdout.on('data', (data) => {
    outputData += data.toString();
  });

  // Handle errors and completion
  pythonProcess.on('error', (err) => {
    callback(err, null);
  });

  pythonProcess.on('close', (code) => {
    if (code === 0) {
      // Successful execution
      callback(null, JSON.parse(outputData));
    } else {
      // Non-zero exit code indicates an error
      callback(`Python script exited with code ${code}`, null);
    }
  });
}

// Example usage
const argumentToPython = { key: './img.jpg' };
const pythonScriptPath = './main.py';

runPythonFunction(argumentToPython, pythonScriptPath, (err, output) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Output:', output);
  }
});
