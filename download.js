function downloadLottieImage() {
    // Assuming you have already loaded the Lottie animation
    var animationContainer = document.getElementById('lottieContainer'); // Replace with the correct ID of your Lottie container
    var rect = animationContainer.getBoundingClientRect();

    // Create a canvas element
    var canvas = document.createElement('canvas');
    canvas.width = rect.width;
    canvas.height = rect.height;
    var ctx = canvas.getContext('2d');

    // Draw the frame on the canvas
    var lottieSVG = animationContainer.querySelector('svg');
    var svgData = new XMLSerializer().serializeToString(lottieSVG);
    var img = new Image();
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);

    img.onload = function () {
        // Draw the image onto the canvas
        ctx.drawImage(img, 0, 0, rect.width, rect.height);

        // Convert canvas to image data URL
        var imageURL = canvas.toDataURL('image/png');

        // Create a download link and trigger the download
        var downloadLink = document.createElement('a');
        downloadLink.href = imageURL;
        downloadLink.download = 'lottie-still.png'; // Suggested filename
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };
}

// Add the download function to a button's click event listener
document.getElementById('downloadButton').addEventListener('click', downloadLottieImage);
