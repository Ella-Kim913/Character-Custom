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

    function dragMouseDown(e) {
        e.preventDefault();
        posInitX = e.clientX;
        posInitY = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        posX = posInitX - e.clientX;
        posY = posInitY - e.clientY;
        posInitX = e.clientX;
        posInitY = e.clientY;
        element.style.top = (element.offsetTop - posY) + "px";
        element.style.left = (element.offsetLeft - posX) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
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




