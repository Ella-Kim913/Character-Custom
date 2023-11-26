document.addEventListener('DOMContentLoaded', function () {
    const inputField = document.getElementById('userInput');
    const speechBubble = document.getElementById('speechBubble');
    const deleteButton = document.getElementById('deleteSpeechBubble');
    let isBubbleVisible = false;

    function updateSpeechBubble(text) {
        if (text) {
            speechBubble.textContent = text;
            speechBubble.style.display = 'block';
            isBubbleVisible = true;
        } else {
            speechBubble.style.display = 'none';
            isBubbleVisible = false;
        }
    }

    inputField.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            updateSpeechBubble(inputField.value);
        }
    });

    makeDraggable(speechBubble);

    deleteButton.addEventListener('click', function () {
        speechBubble.style.display = 'none';
        inputField.value = '';
        isBubbleVisible = false;
    });

});

function makeDraggable(element) {
    let posX = 0, posY = 0, posInitX = 0, posInitY = 0;

    element.onmousedown = dragMouseDown;
    element.ontouchstart = dragMouseDown; // Add touchstart event

    function dragMouseDown(e) {
        e.preventDefault();
        if (e.type === "touchstart") {
            posInitX = e.touches[0].clientX;
            posInitY = e.touches[0].clientY;
        } else {
            posInitX = e.clientX;
            posInitY = e.clientY;
        }
        document.onmouseup = closeDragElement;
        document.ontouchend = closeDragElement; // Add touchend event
        document.onmousemove = elementDrag;
        document.ontouchmove = elementDrag; // Add touchmove event
    }

    function elementDrag(e) {
        e.preventDefault();
        if (e.type === "touchmove") {
            posX = posInitX - e.touches[0].clientX;
            posY = posInitY - e.touches[0].clientY;
            posInitX = e.touches[0].clientX;
            posInitY = e.touches[0].clientY;
        } else {
            posX = posInitX - e.clientX;
            posY = posInitY - e.clientY;
            posInitX = e.clientX;
            posInitY = e.clientY;
        }
        element.style.top = (element.offsetTop - posY) + "px";
        element.style.left = (element.offsetLeft - posX) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.ontouchend = null; // Clear touchend event
        document.onmousemove = null;
        document.ontouchmove = null; // Clear touchmove event
    }
}


makeDraggable(speechBubble);

function updateSpeechBubble(text) {
    const speechBubbleText = document.getElementById('speechBubbleText');

    if (text) {
        speechBubbleText.textContent = text;
        speechBubble.style.display = 'block';
        isBubbleVisible = true;
    } else {
        speechBubble.style.display = 'none';
        isBubbleVisible = false;
    }
}




