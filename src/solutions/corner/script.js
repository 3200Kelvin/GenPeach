import './style.scss';

export const useSolutionsCorner = () => {
    const bg = document.querySelector('.slider__content__bg');

    const resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];
        const { width, height } = entry.contentRect;

        const xProportion = window.innerWidth / width;
        const yProportion = xProportion * (width / height);
        
        bg.style.setProperty('--x-proportion', xProportion);
        bg.style.setProperty('--y-proportion', yProportion);
    });

    resizeObserver.observe(bg);
};
