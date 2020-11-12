async function addProducetoUserHandler(event) {
    event.preventDefault();

    const produceName = document.getElementById("produce-name").value.trim();

    console.log(produceName);
    
}

document.querySelector('#add-produce').addEventListener('click', addProducetoUserHandler);