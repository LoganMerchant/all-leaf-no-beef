async function addProduce(event) {
    event.preventDefault();
    document.location.replace('/add-produce');
};

document.querySelector('#add-produce').addEventListener('click', addProduce);