// Get the elements
const codeEditor = document.getElementById('code-editor');
const runCodeButton = document.getElementById('run-code');
const outputFrame = document.getElementById('output');

// Add event listener to the Run Code button
runCodeButton.addEventListener('click', () => {
    // Get the code from the editor
    const code = codeEditor.value;

    // Write the code to the iframe
    const output = outputFrame.contentWindow.document;
    output.open();
    output.write(code);
    output.close();
});
