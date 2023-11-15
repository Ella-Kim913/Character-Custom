
var isLottieALoaded = false;
var isLottieBLoaded = false;

function loadLottieAnimation(container, path) {
    lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: path
    });
}

function loadAndToggleLottieA() {
    var wrapperA = document.getElementById('wrapperA');
    if (!isLottieALoaded) {
        loadLottieAnimation(document.getElementById('lottieA'), 'https://lottie.host/9b52b22b-d323-4dee-9864-7e6e45d1b441/8lZZLe4z0V.json');
        isLottieALoaded = true;
        wrapperA.style.display = 'block';
    } else {
        wrapperA.style.display = wrapperA.style.display === 'none' ? 'block' : 'none';
    }
}

function loadAndToggleLottieB() {
    var wrapperB = document.getElementById('wrapperB');
    if (!isLottieBLoaded) {
        loadLottieAnimation(document.getElementById('lottieB'), 'https://lottie.host/400a06bb-d0ae-4af3-bdb0-079ec51765a3/FFERy9aTrH.json');
        isLottieBLoaded = true;
        wrapperB.style.display = 'block';
    } else {
        wrapperB.style.display = wrapperB.style.display === 'none' ? 'block' : 'none';
    }
}

// Initialize the wrappers to be hidden
document.getElementById('wrapperA').style.display = 'none';
document.getElementById('wrapperB').style.display = 'none';


function addDeleteButton(wrapperId) {
    var wrapper = document.getElementById(wrapperId);
    var deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = function () {
        wrapper.remove();
    };
    wrapper.appendChild(deleteBtn);
}


function draggable(el) {
    var elementX = 0, elementY = 0;

    function handleDragStart(event) {
        var mouseX = event.clientX || event.touches[0].clientX;
        var mouseY = event.clientY || event.touches[0].clientY;

        document.addEventListener('mousemove', handleDrag);
        document.addEventListener('touchmove', handleDrag);
        document.addEventListener('mouseup', stopDragging);
        document.addEventListener('touchend', stopDragging);

        function handleDrag(event) {
            var deltaX = (event.clientX || event.touches[0].clientX) - mouseX;
            var deltaY = (event.clientY || event.touches[0].clientY) - mouseY;
            mouseX = event.clientX || event.touches[0].clientX;
            mouseY = event.clientY || event.touches[0].clientY;

            elementX += deltaX;
            elementY += deltaY;
            el.style.left = elementX + 'px';
            el.style.top = elementY + 'px';
        }

        function stopDragging() {
            document.removeEventListener('mousemove', handleDrag);
            document.removeEventListener('touchmove', handleDrag);
            document.removeEventListener('mouseup', stopDragging);
            document.removeEventListener('touchend', stopDragging);
        }
    }

    el.addEventListener('mousedown', handleDragStart);
    el.addEventListener('touchstart', handleDragStart);
}


// Existing draggable function
function makeResizable(el) {
    const resizeHandle = el.querySelector('.resize-handle');

    resizeHandle.addEventListener('mousedown', function (e) {
        e.preventDefault();
        originalWidth = parseFloat(getComputedStyle(el, null).getPropertyValue('width').replace('px', ''));
        originalHeight = parseFloat(getComputedStyle(el, null).getPropertyValue('height').replace('px', ''));
        originalMouseX = e.pageX;
        originalMouseY = e.pageY;
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize);

        function resize(e) {
            const width = originalWidth + (e.pageX - originalMouseX);
            const height = originalHeight + (e.pageY - originalMouseY);
            el.style.width = width + 'px';
            el.style.height = height + 'px';
        }

        function stopResize() {
            document.removeEventListener('mousemove', resize);
            document.removeEventListener('mouseup', stopResize);
        }

        //document.addEventListener('mousemove', resize);
        //document.addEventListener('mouseup', stopResize);
    });
}


// Apply draggable and resizable to the elements
draggable(document.getElementById('wrapperA'));
makeResizable(document.getElementById('wrapperA'));
addDeleteButton('wrapperA');

draggable(document.getElementById('wrapperB'));
makeResizable(document.getElementById('wrapperB'));
addDeleteButton('wrapperB');
