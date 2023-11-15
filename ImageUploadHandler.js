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
