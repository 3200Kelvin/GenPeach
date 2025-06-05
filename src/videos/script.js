export const useAutoplayVideos = () => {
    const videos = document.querySelectorAll('video[autoplay]');

    const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (entry.target.paused) {
                    entry.target.play().catch(() => {});
                }
            } else {
                if (!entry.target.paused) {
                    entry.target.pause();
                }
            }
        });
    }, { threshold: 0.5 });

    videos.forEach((video) => {
        intersectionObserver.observe(video);
    });
}