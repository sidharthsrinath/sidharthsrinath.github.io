const NextPageUpwardsAnimation = () => {
    // Smoothly scroll the page down by 100vh
    window.scrollBy({
        top: -window.innerHeight, // Smooth scroll
        behavior: 'smooth', // 100vh equivalent
    });
}

export default NextPageUpwardsAnimation;