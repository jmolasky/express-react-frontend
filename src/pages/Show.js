import { useState } from "react";

export default function Show(props) {
  const id = props.match.params.id;
  const person = props.people.find((person) => person._id === id);
  const [editForm, setEditForm] = useState(person);

  const handleChange = (evt) => {
    setEditForm({
      ...editForm,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.updatePeople(editForm, id);
    props.history.push("/people");
  };

  const handleClick = () => {
    props.deletePeople(id);
    // redirects
    props.history.push("/people");
  };

  return (
    <div className="person">
      <h1>{person.name}</h1>
      <h2>{person.title}</h2>
      {person.image && <img src={person.image} alt={person.name} />}
      <button id="delete" onClick={handleClick}>
        DELETE
      </button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={editForm.name}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={editForm.image}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={editForm.title}
          onChange={handleChange}
        />
        <br />
        <input type="submit" value="Update Person" />
      </form>
    </div>
  );
}
