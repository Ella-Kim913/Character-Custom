var lottieAnimations = {
    'wrapperA': { path: 'https://lottie.host/9b52b22b-d323-4dee-9864-7e6e45d1b441/8lZZLe4z0V.json', loaded: false },
    'wrapperB': { path: 'https://lottie.host/400a06bb-d0ae-4af3-bdb0-079ec51765a3/FFERy9aTrH.json', loaded: false },
    // Add more wrappers as needed
};

function loadAndToggleLottie(wrapperId) {
    var wrapper = document.getElementById(wrapperId);
    var animation = lottieAnimations[wrapperId];

    if (!animation.loaded) {
        lottie.loadAnimation({
            container: document.getElementById(wrapperId.replace('wrapper', 'lottie')),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: animation.path
        });
        animation.loaded = true;
    }

    wrapper.style.display = wrapper.style.display === 'none' ? 'block' : 'none';
}






function addDeleteButton(wrapperId) {
    var wrapper = document.getElementById(wrapperId);
    var deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '❌';
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

    });
}

// Common function to initialize wrappers
function initializeWrapper(wrapperId) {
    var wrapper = document.getElementById(wrapperId);
    wrapper.style.display = 'none';
    draggable(wrapper);
    makeResizable(wrapper);
    addDeleteButton(wrapperId);
}

// Initialize all wrappers
Object.keys(lottieAnimations).forEach(initializeWrapper);



document.getElementById('imageUpload').addEventListener('change', function (event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        createImageWrapper(e.target.result);
    };
    reader.readAsDataURL(file);
});

function createImageWrapper(imageSrc) {
    var wrapper = document.createElement('div');
    wrapper.className = 'animation-wrapper';
    wrapper.style.position = 'relative';

    // Generate a unique ID for the new wrapper
    var wrapperId = 'imageWrapper' + Date.now();
    wrapper.id = wrapperId;

    var img = document.createElement('img');
    img.src = imageSrc;
    img.className = 'animation-container';

    var resizeHandle = document.createElement('div');
    resizeHandle.className = 'resize-handle';

    wrapper.appendChild(img);
    wrapper.appendChild(resizeHandle);

    document.body.appendChild(wrapper);

    draggable(wrapper);
    makeResizable(wrapper);
    addDeleteButton(wrapperId); // Reuse addDeleteButton function
}
