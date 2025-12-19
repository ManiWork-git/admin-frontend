async function getUsers() {
  try {
    // let res = await fetch("http://localhost:3000/users");
    const res = await fetch("https://admin-backend-k02k.onrender.com/users");
    if (!res.ok) throw new Error("Oops" + res.status);
    const data = await res.json();
    console.log(data);
    showUsers(data);
  } catch (err) {
    console.log(err.message);
  }
}
getUsers();

function showUsers(data) {
  const container = document.querySelector(".container");
  container.innerHTML = "";

  data.forEach((user) => {
    let div = document.createElement("div");
    div.innerHTML = `
     <div class="image-container">
      <img src="${user.imgLink}" >
    </div>
      <p><strong>Name: </strong> ${user.name} </p>
    `;
    container.appendChild(div);
  });
}
