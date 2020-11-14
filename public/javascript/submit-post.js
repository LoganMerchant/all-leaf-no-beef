async function submitPostHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="title"]').value.trim();
    const content = document.querySelector('textarea[name="content"]').value.trim();

    const response = await fetch('/api/posts', {
        method: 'post',
        body: JSON.stringify({
            title,
            content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    };
};

document.querySelector('#submit-post-form').addEventListener('submit', submitPostHandler);