function captureScreenArea() {
    // Determine the area of the screen you want to capture
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const captureWidth = viewportWidth * 0.8; // Adjust as necessary
    const captureHeight = viewportHeight * 0.8; // Adjust as necessary

    // Create a canvas to draw the capture
    html2canvas(document.body, {
        width: captureWidth,
        height: captureHeight,
        x: (viewportWidth - captureWidth) / 2,
        y: (viewportHeight - captureHeight) / 2,
        windowWidth: captureWidth,
        windowHeight: captureHeight
    }).then(canvas => {
        // Create an image from the canvas
        var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

        // Create a download link and trigger the download
        var downloadLink = document.createElement('a');
        downloadLink.href = image;
        downloadLink.download = 'capture.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    });
}

// Add this function to a button's click event listener
document.getElementById('captureButton').addEventListener('click', captureScreenArea);
