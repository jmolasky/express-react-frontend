import { useState } from "react";
import { Link } from "react-router-dom";

export default function Index(props) {
  const blankForm = {
    name: "",
    image: "",
    title: "",
  };

  const [newForm, setNewForm] = useState(blankForm);

  const handleChange = (evt) => {
    setNewForm((prevState) => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.createPeople(newForm);
    setNewForm(blankForm);
  };

  // loaded function
  const loaded = () => {
    return props.people.map((person) => (
      <div key={person._id} className="person">
        <Link to={`/people/${person._id}`}>
          <h1>{person.name}</h1>
        </Link>
        <img src={person.image} alt={person.name} />
        <h3>{person.title}</h3>
      </div>
    ));
  };

  // generates array of 3 identical form inputs
  const values = ["name", "image", "title"];
  const formInputs = values.map((value, idx) => (
    <div key={idx}>
      <input
        type="text"
        value={newForm[value]}
        name={value}
        placeholder={value}
        onChange={handleChange}
      />
      <br />
    </div>
  ));

  // loading function
  const loading = () => {
    return <h1>Loading...</h1>;
  };

  return (
    <section>
      <form style={{ marginTop: "3rem" }} onSubmit={handleSubmit}>
        {formInputs}
        <input type="submit" value="Create Person" />
      </form>
      {props.people ? loaded() : loading()}
    </section>
  );
}
