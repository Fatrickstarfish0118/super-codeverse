window.onload = function() {
    const defaultCode = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is a basic "Hello World" webpage.</p>
</body>
</html>
    `;
    document.getElementById('code-editor').value = defaultCode.trim();
};

function runCode() {
    const code = document.getElementById('code-editor').value;
    const outputFrame = document.getElementById('output-frame');
    outputFrame.srcdoc = code;
}
