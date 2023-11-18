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
    var isDragging = false;

    function handleDragStart(event) {
        isDragging = true;
        var mouseX = event.clientX || event.touches[0].clientX;
        var mouseY = event.clientY || event.touches[0].clientY;

        document.addEventListener('mousemove', handleDrag);
        document.addEventListener('touchmove', handleDrag);
        document.addEventListener('mouseup', stopDragging);
        document.addEventListener('touchend', stopDragging);

        function handleDrag(event) {
            if (!isDragging) return;
            var deltaX = (event.clientX || event.touches[0].clientX) - mouseX;
            var deltaY = (event.clientY || event.touches[0].clientY) - mouseY;

            requestAnimationFrame(function () {
                elementX += deltaX;
                elementY += deltaY;
                el.style.transform = `translate(${elementX}px, ${elementY}px)`;
            });

            mouseX = event.clientX || event.touches[0].clientX;
            mouseY = event.clientY || event.touches[0].clientY;
        }

        function stopDragging() {
            isDragging = false;
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

function initializeWrapper(wrapperId) {
    var wrapper = document.getElementById(wrapperId);
    wrapper.style.display = 'none';
    draggable(wrapper);
    makeResizable(wrapper);
    addDeleteButton(wrapperId);
}

// Initialize all wrappers
Object.keys(lottieAnimations).forEach(initializeWrapper);
