const register_form = document.querySelector("#register_form");
const note_title = document.querySelector("#note_title");
const note_content = document.querySelector("#note_content");
const url = "http://localhost:3000/notes";
const result = document.querySelector("#result");

register_form.addEventListener("submit", async (event) => {
  event.preventDefault();
  addAuth();
});

const addAuth = async () => {
  try {
/*     const token = Cookies.get("token");

    if (!token) {
      location.href = "./login.html";
    } */

    const response = await fetch(`${url}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      /*   "Authorization": `Bearer ${token}` */
      },
      body: JSON.stringify({
        note_title: note_title.value,
        note_content: note_content.value,
      }),
    });

    const data = await response.json();
    console.log(data);
    if (!note_title.value || !note_content.value) {
      alert("Note must have all properties");
    }

    if (!data.success) {
      throw new Error("error from server in registering the note");
    }

    if (data.success) {
      result.innerHTML = data.message;
      setTimeout(() => {
        location.reload();
      },1000);
    }
  } catch (error) {
    result.innerHTML = error.message;
  }
};
