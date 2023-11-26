var lottieAnimations = {
    'wrapperA': { path: 'https://lottie.host/9b52b22b-d323-4dee-9864-7e6e45d1b441/8lZZLe4z0V.json', loaded: false, animation: null },
    'wrapperB': { path: 'https://lottie.host/400a06bb-d0ae-4af3-bdb0-079ec51765a3/FFERy9aTrH.json', loaded: false, animation: null },
    // Add more wrappers as needed
};

let defaultLottieAnimation;

window.addEventListener('load', () => {
    defaultLottieAnimation = lottie.loadAnimation({
        container: document.getElementById('lottieContainer'),
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: 'https://lottie.host/9b52b22b-d323-4dee-9864-7e6e45d1b441/8lZZLe4z0V.json'
    });

    setupControlButton();
});

function loadAndToggleLottie(wrapperId) {
    var wrapper = document.getElementById(wrapperId);
    var animationData = lottieAnimations[wrapperId];

    if (!animationData.loaded) {
        animationData.animation = lottie.loadAnimation({
            container: document.getElementById(wrapperId.replace('wrapper', 'lottie')),
            renderer: 'svg',
            loop: true,
            autoplay: false, // Set autoplay to false
            path: animationData.path
        });
        animationData.loaded = true;
    }

    wrapper.style.display = wrapper.style.display === 'none' ? 'block' : 'none';
}

function toggleAllAnimations(play) {
    if (defaultLottieAnimation) {
        play ? defaultLottieAnimation.play() : defaultLottieAnimation.pause();
    }

    Object.values(lottieAnimations).forEach(animationData => {
        if (animationData.loaded && animationData.animation) {
            play ? animationData.animation.play() : animationData.animation.pause();
        }
    });
}

function setupControlButton() {
    const controlButton = document.getElementById('autoplay');
    let isPlaying = false;

    controlButton.addEventListener('click', () => {
        isPlaying = !isPlaying;
        toggleAllAnimations(isPlaying);
        controlButton.textContent = isPlaying ? 'Pause All Animations' : 'Play All Animations';
    });
}
