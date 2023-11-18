let ctx; // Declare ctx in the outer scope

let isErasing = false;

window.addEventListener('load', () => {
    setupCanvas();
    setupBrushButtons();
    setupColorPicker();
    setupEraserButton(); // Set up the eraser button
});

function setupEraserButton() {
    const eraserButton = document.getElementById('eraserButton');
    eraserButton.addEventListener('click', function () {
        isErasing = !isErasing; // Toggle erasing mode

        if (isErasing) {
            ctx.globalCompositeOperation = 'destination-out'; // Set to erase mode
            eraserButton.classList.add('active'); // Optionally highlight the button
        } else {
            ctx.globalCompositeOperation = 'source-over'; // Set back to normal drawing mode
            eraserButton.classList.remove('active'); // Remove highlight from the button
        }
    });
}

function draw(e) {
    if (!drawing) return;
    const mousePos = getMousePos(e);
    ctx.lineTo(mousePos.x / scale, mousePos.y / scale);
    ctx.stroke();
}



function setupCanvas() {
    const canvas = document.getElementById('drawingCanvas');
    ctx = canvas.getContext('2d'); // Assign to the outer scoped variable
    let drawing = false;

    const rect = canvas.getBoundingClientRect();
    const scale = window.devicePixelRatio; // Get the device's pixel ratio

    canvas.width = rect.width * scale;
    canvas.height = rect.height * scale;

    // Scale the drawing context to match the pixel ratio
    ctx.scale(scale, scale);

    // Set default brush size
    ctx.lineWidth = 5; // Default to medium brush size
    ctx.lineCap = 'round'; // Set the line cap to round

    function getMousePos(evt) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: (evt.clientX - rect.left) * scale,
            y: (evt.clientY - rect.top) * scale
        };
    }

    function startDrawing(e) {
        drawing = true;
        const mousePos = getMousePos(e);
        ctx.beginPath();
        ctx.moveTo(mousePos.x / scale, mousePos.y / scale);
    }

    function endDrawing() {
        if (drawing) {
            ctx.closePath();
            drawing = false;
        }
    }

    function draw(e) {
        if (!drawing) return;
        const mousePos = getMousePos(e);
        ctx.lineTo(mousePos.x / scale, mousePos.y / scale);
        ctx.stroke();
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', endDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseout', endDrawing);

    // Add touch event listeners
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startDrawing(e.touches[0]);
    }, false);
    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        endDrawing();
    }, false);
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        draw(e.touches[0]);
    }, false);

    // Adjust the canvas style to fill its container
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
}

function changeBrushSize(newSize) {
    if (ctx) {
        ctx.lineWidth = newSize;
    }
}

// Add event listeners for the brush size buttons
function setupBrushButtons() {
    document.getElementById('smallBrush').addEventListener('click', () => changeBrushSize(2));
    document.getElementById('mediumBrush').addEventListener('click', () => changeBrushSize(5));
    document.getElementById('largeBrush').addEventListener('click', () => changeBrushSize(10));
}

// Initialize canvas and brush buttons
window.addEventListener('load', () => {
    setupCanvas();
    setupBrushButtons();
});

window.addEventListener('load', () => {
    setupCanvas();
    setupBrushButtons();
    setupColorPicker(); // Call this to setup the color picker
});

// Function to change the brush color
function changeColor(newColor) {
    ctx.strokeStyle = newColor;
}

// Set up the color picker
function setupColorPicker() {
    const colorPicker = document.getElementById('colorPicker');
    colorPicker.addEventListener('input', (e) => {
        changeColor(e.target.value);
    });
    colorPicker.addEventListener('change', (e) => {
        changeColor(e.target.value);
    });

    // Set initial brush color from the color picker
    changeColor(colorPicker.value);
}


