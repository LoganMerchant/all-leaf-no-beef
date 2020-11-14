let produceName = document.querySelectorAll('button[name]');

for (i of produceName) {
    i.addEventListener('click', async function() {
        console.log(this.name);

        const produce_id = this.name;
        // const user_id = ;

        const response = await fetch('/api/tracked-produce', {
            method: 'POST',
            body: JSON.stringify({
                produce_id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.ok) {
            document.location.replace('/dashboard')
        } else {
            console.log('error');
            alert(response.statusText);
        }
    });
}