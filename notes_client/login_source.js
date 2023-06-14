const register_form = document.querySelector("#register_form");
const result = document.querySelector("#result");
const user_email = document.querySelector("#user_email");
const user_password = document.querySelector("#user_password");

register_form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const user_email = e.target.user_email.value;
  const user_password = e.target.user_password.value;

  try {
    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_email,
        user_password,
      }),
    });

    const data = await response.json();

/*     Cookies.set("token", data.token, { expires: 22 }); */

    if (!data.success) {
      throw new Error(data.error);
    }

    // in case login ok
    result.innerHTML = data.message;

    setTimeout(() => {
      alert("Login successfully");
      window.location.href = "./all_notes.html";
    }, 1000);
  } catch (error) {
    result.innerHTML = error.message;
  }
});
