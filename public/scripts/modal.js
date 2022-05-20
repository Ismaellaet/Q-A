export default function Modal() {
    const wrapper = document.querySelector('.modal-wrapper');
    const cancelButton = document.querySelector('.modal .buttons .cancel');

    cancelButton.addEventListener('click', close);

    function close() {
        wrapper.classList.remove('active');
    }

    function open() {
        wrapper.classList.add('active');
    }
    /**
     * @param {string} type delete || check
     * @return {void}
     */

    function changeType(type) {
        const title = document.querySelector('.modal .title');
        const description = document.querySelector('.modal .description');
        const confirmButton = document.querySelector('.modal .confirm');
        const text = type === 'delete' ? 'Delete' : 'Mark as read';

        title.innerHTML = `${text} question`; // Change modal title
        description.innerHTML = `Are you sure you want to ${text.toLowerCase()} this question?`; // Change modal description
        confirmButton.innerHTML = text; // Change modal confirm button
        changeColorOfConfirmButton();

        function changeColorOfConfirmButton() {
            if (type === 'delete') {
                confirmButton.classList.add('red');
            } else {
                confirmButton.classList.remove('red');
            }
        }
    }

    return {
        open,
        changeType
    }
}