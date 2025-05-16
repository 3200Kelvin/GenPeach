export const useVopyValue = () => {
    const buttons = document.querySelectorAll('.copy-button');

    buttons.forEach(init);

    function init(button) {
        const square = button.querySelector('.copy-button__square--top');
        const { value } = button.dataset;
        let timeout;

        button.addEventListener('click', () => {
            navigator.clipboard.writeText(value)
                .then(() => {
                    if (timeout) {
                        clearTimeout(timeout);
                    }
                    
                    gsap.to(square, { backgroundColor: 'var(--orange)' });

                    timeout = setTimeout(() => {
                        gsap.to(square, { backgroundColor: 'var(--black)' });
                        timeout = null;
                    }, 4000);
                })
                .catch((error) => console.error(error));
        });
    }
};
