const container = document.querySelector(".container");
const url = "http://localhost:3000/notes";

const buildCard = (obj) => {
  const card = document.createElement("div");
  card.setAttribute("class", "card d-inline-block");

  const body = document.createElement("div");
  body.setAttribute("class", "card-body");

  const Name_N = document.createElement("div");
  Name_N.setAttribute("class", "card-title");
  Name_N.style = "font-size: 2rem; font-weight: bold ;cursor: pointer";
  Name_N.textContent = `Note Title : ${obj.note_title}`;

  Name_N.addEventListener("click", () => {
    const input = document.createElement("input");
    input.value = obj.note_title;
    input.style = "width: 15rem; margin-right:1rem";
    body.replaceChild(input, Name_N);
    body.removeChild(delete_icon);

    const update_btn = document.createElement("i");
    update_btn.setAttribute("class", "fa-solid fa-floppy-disk");
    update_btn.style = "margin-left:17rem; hight:65rem; cursor:pointer";
    body.append(update_btn);

    update_btn.addEventListener("click", async () => {
      const new_name = {
        note_title: input.value,
      };

      try {
        const response = await fetch(`${url}/update_by_id/${obj._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(new_name),
        });

        const data = await response.json();

        if (!data.success) {
          throw new Error("error in edit user name from server");
        }

        alert(`new name is : ${new_name.note_title}`);
        location.reload();
      } catch (error) {
        console.log(error.message);
      }
    });
  });

  const description_N = document.createElement("div");
  description_N.setAttribute("class", "card-title");
  description_N.style = "font-size: 1.5rem; font-weight: bold;cursor: pointer";
  description_N.textContent = `note Content : ${obj.note_content}`;

  description_N.addEventListener("click", () => {
    const input = document.createElement("textarea");
    input.value = obj.note_content;
    input.style = "width: 40rem; padding:2rem";

    body.replaceChild(input, description_N);
    body.removeChild(delete_icon);

    const update_btn = document.createElement("i");
    update_btn.setAttribute("class", "fa-solid fa-floppy-disk");
    update_btn.style = "margin-left:17rem; hight:65rem; cursor:pointer";
    body.append(update_btn);

    update_btn.addEventListener("click", async () => {
      const new_name = {
        note_content: input.value,
      };

      try {
        const response = await fetch(`${url}/update_by_id/${obj._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(new_name),
        });

        const data = await response.json();

        if (!data.success) {
          throw new Error("error in edit user name from server");
        }

        alert(`new name is : ${new_name.note_content}`);
        location.reload();
      } catch (error) {
        console.log(error.message);
      }
    });
  });

  /*   const note_creator = document.createElement("div");
  note_creator.setAttribute("class", "card-title");
  note_creator.style = "font-size: 1.5rem; font-weight: bold;"
  note_creator.textContent = `note creator id : ${obj.user.user_name}`;
 */
  const delete_icon = document.createElement("i");
  delete_icon.setAttribute("class", "fa-solid fa-trash");
  delete_icon.style = "cursor: pointer; margin-left: 22rem";

  delete_icon.addEventListener("click", async () => {
    try {
      const response = await fetch(`${url}/delete_by_id/${obj._id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      alert(`note ${obj.note_title} deleted successfully`);
      location.reload();
    } catch (error) {
      console.log(error.message);
    }
  });

  body.append(Name_N, description_N, /* note_creator, */ delete_icon);
  card.append(body);
  container.append(card);
};

const getAllNotes = async () => {
  try {
    const response = await fetch(`${url}/all`);
    const data = await response.json();

    console.log(data.notes);

    if (!data.success) {
      throw new Error("error in get notes from server");
    }

    if (data.notes < 1) {
      alert("no notes found");
    }

    for (const obj of data.notes) {
      buildCard(obj);
    }
  } catch (error) {
    console.log(error.message);
  }
};

getAllNotes();
