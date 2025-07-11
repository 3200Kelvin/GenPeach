export const setFormApiSelector = (form) => {
    const API_ACCESS_VALUE = 'get API access';

    const contactCard = document.querySelector('.solution__contact__card');
    if (!contactCard) {
        return;
    }
    const goalSelect = form.querySelector('select[name="Goal"]');
    if (!goalSelect) {
        return;
    }

    contactCard.addEventListener('click', () => {
        goalSelect.value = API_ACCESS_VALUE;
    });
};
