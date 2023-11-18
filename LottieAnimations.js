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

window.addEventListener('load', () => {
    lottie.loadAnimation({
        container: document.getElementById('lottieContainer'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://lottie.host/9b52b22b-d323-4dee-9864-7e6e45d1b441/8lZZLe4z0V.json'
    });
});


