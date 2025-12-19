// get users on page load
async function getUsers() {
  try {
    // let res = await fetch("http://localhost:3000/users");
    let res = await fetch("https://admin-backend-k02k.onrender.com/users");

    if (!res.ok) {
      throw new Error("Oops1 " + res.status);
    }
    let data = await res.json();
    showUsers(data);
  } catch (err) {
    console.error(err.message);
  }
}

getUsers();

// showUsers used in getUsers()
function showUsers(data) {
  let container2 = document.getElementById("container2");

  // map method to create edit and delete buttons for each user
  container2.innerHTML = data
    .map((user) => {
      return `
      <p> 
        Name : ${user.name}  
        <button id="${user.id}-edit" > Edit </button>
         <button id="${user.id}-delete" > Delete </button>
      </p>
    `;
    })
    .join("");

  data.forEach((user) => {
    // registering onlclick event for every user edit button
    let editBtn = document.getElementById(`${user.id}-edit`);
    editBtn.onclick = () => fillInputs(user.id);

    // registering onlclick event for every user delete button
    let deleteBtn = document.getElementById(`${user.id}-delete`);
    deleteBtn.onclick = () => deleteUser(user.id);
  });
}

// get user details and fill input fields when edit button is clicked
async function fillInputs(userId) {
  let nameInput = document.getElementById("username");
  let imageInput = document.getElementById("imgLink");
  let userIdInput = document.getElementById("userId");

  try {
    // let res = await fetch(`http://localhost:3000/users/${userId}`);
    let res = await fetch(
      `https://admin-backend-k02k.onrender.com/users/${userId}`
    );

    if (!res.ok) {
      throw new Error("Could not fetch the user " + res.status);
    }
    let user = await res.json();
    nameInput.value = user.name;
    imageInput.value = user.imgLink;
    userIdInput.value = user.id;
  } catch (err) {
    console.log(err.message);
  }
}

// add or update user
let saveBtn = document.getElementById("saveBtn");
saveBtn.addEventListener("click", async () => {
  let name = document.getElementById("username").value;
  let imageLink = document.getElementById("imgLink").value;
  let userId = document.getElementById("userId").value;

  let methodType = userId ? "PATCH" : "POST";
  let options = {
    method: methodType,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      name,
      imageLink,
    }),
  };

  // let URL = userId
  //   ? `http://localhost:3000/users/${userId}`
  //   : `http://localhost:3000/users`;

  let URL = userId
    ? `https://admin-backend-k02k.onrender.com/users/${userId}`
    : `https://admin-backend-k02k.onrender.com/users`;

  try {
    const res = await fetch(URL, options);
    if (!res.ok) throw new Error("Failed to update or create " + res.status);

    alert("Success!");
    document.getElementById("username").value = "";
    document.getElementById("imgLink").value = "";
    document.getElementById("userId").value = "";
    getUsers();
  } catch (err) {
    console.error(err.message);
  }
});

// delete user
async function deleteUser(id) {
  try {
    // let res = await fetch(`http://localhost:3000/users/${id}`, {
    //   method: "DELETE",
    // });
    let res = await fetch(
      `https://admin-backend-k02k.onrender.com/users/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      throw new Error("Oops!" + res.status);
    }
    alert("Successfully Deleted");
  } catch (error) {
    console.log(error.message);
  }
}

document.getElementById("goUsers").addEventListener("click", () => {
  window.location.href = "users.html";
});

// db.json
// {
//   "users": [
//     {
//       "id": "1",
//       "name": "All Might",
//       "imgLink": "https://i.pinimg.com/736x/d4/96/d2/d496d2d7902a9d037b0da597aad9cece.jpg"
//     },
//     {
//       "id": "2",
//       "name": "Optimus Prime",
//       "imgLink": "https://i.pinimg.com/236x/82/80/f3/8280f33e556ee749a5f62c9d835c81a9.jpg"
//     },
//     {
//       "id": "3",
//       "name": "Erwin Smith",
//       "imgLink": "https://i.pinimg.com/736x/b9/b4/50/b9b450f4bf437e655c5e4e42d89dfe29.jpg"
//     }
//   ]
// }
