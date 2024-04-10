const NextPageDownwardsAnimation = () => {
    // Smoothly scroll the page down by 100vh
    window.scrollBy({
        top: window.innerHeight, // 100vh equivalent
        behavior: 'smooth' // Smooth scroll
    });
}

export default NextPageDownwardsAnimation;
