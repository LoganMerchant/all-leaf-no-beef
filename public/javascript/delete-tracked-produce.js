async function handleDeleteProduce(event) {
  event.preventDefault();

  const target = event.target;

  if (target.matches(`button`)) {
    console.log(target);

    const response = await fetch(`/api/tracked-produce/${target.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector("#tracked-produce-list")
  .addEventListener("click", handleDeleteProduce);
