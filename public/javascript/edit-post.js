async function editPostHandler(event) {
    event.preventDefault();
    
    const id = document.location.toString().split('/')[
        document.location.toString().split('/').length - 1
    ];
    const title = document.querySelector('input[name="title"]').value.trim();
    const content = document.querySelector('textarea[name="content"]').value.trim();

    const response = await fetch(`/api/posts/${id}`, {
        method: 'put',
        body: JSON.stringify({
            title,
            content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    };
};

async function deletePostHandler(event) {
    event.preventDefault();

    const id = document.location.toString().split('/')[
        document.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'delete'
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    };
};

document.querySelector('#edit-button').addEventListener('click', editPostHandler);
document.querySelector('#delete-button').addEventListener('click', deletePostHandler);