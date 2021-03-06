import Modal from './modal.js'

const modal = Modal();

/* ==== Add Open Modal function on buttons ==== */
// Check buttons
const checkButtons = document.querySelectorAll('.check');

checkButtons.forEach(button => {
    button.addEventListener('click', event => clickHandling(event, 'check'));
});

// Delete buttons
const deleteButtons = document.querySelectorAll('.delete');

deleteButtons.forEach(button => {
    button.addEventListener('click', event => clickHandling(event, 'delete'));
})

/**
 * @param {object} event
 * @param {string} type delete || check
 * @return {void}
 */
const clickHandling = (event, type) => {
    setModalFormAction();
    modal.changeType(type)
    modal.open()

    function setModalFormAction() {
        const form = document.querySelector('.modal form');
        const roomId = document.querySelector('#room-id').dataset.id;
        const roomType = document.querySelector('main').dataset.id;
        const targetId = event.target.dataset.id;

        form.setAttribute('action', `/room/${roomId}/${roomType}/${targetId}/${type}`);
    }
}

/* ==== ClipBoard Function ==== */
const clipboard = () => {
    const text = document.querySelector('#room-id');

    // text.select();
    text.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(text.value.substring(1));
}

document.querySelector('.copy-text').addEventListener('click', clipboard);