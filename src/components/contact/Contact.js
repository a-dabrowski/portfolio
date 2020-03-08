import React, {Component} from 'react';


import './Contact.css';

class Contact extends Component {

  render() {
    return (
    <div>
      <h1>
        Contact
      </h1>
      <p>
        Reaching out to me is free of charge, so don't hesitate
      </p>
      <form action="ADDRESS" method="POST">
        <label for="name">
          Name
        </label>
        <input name="name" />
        <label for="email">
          Email - optional, but helpful
        </label>
        <input name="email" />
        <button submit>Submit</button>
      </form>
    </div>
    );
  }
}

export default Contact;
