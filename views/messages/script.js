document.getElementById("messageForm").addEventListener("submit", (e) => {
  e.preventDefault();
  fetch("/message/create", {
    method: "POST",
    body: new URLSearchParams(new FormData(e.target)),
  }).then(() => {
    window.location.reload();
  });
});
