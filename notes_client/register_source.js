const register_form = document.querySelector("#register_form");
const result = document.querySelector("#result");
const user_email = document.querySelector("#user_email");
const user_password = document.querySelector("#user_password");
const user_name = document.querySelector("#user_name");
const user_password_confirm = document.querySelector("#user_password_confirm");

register_form.addEventListener("submit", async (e) => {

  e.preventDefault();   
    const user_name = e.target.user_name.value;
  const user_email = e.target.user_email.value;
  const user_password = e.target.user_password.value;
  const user_password_confirm = e.target.user_password_confirm.value;

  try {
    const response = await fetch("http://localhost:3000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name,
        user_email,
        user_password,
        user_password_confirm
      }),
    });

    const data = await response.json();



    if (!data.success) {
      throw new Error(data.error);
    }

    // in case login ok
    result.innerHTML = data.message;

    
    setTimeout(() => {
        alert("register successfully");
      window.location.href= "./login.html"
    }, 1000);



  } catch (error) {
    result.innerHTML = error.message;
  }
});
