import React, { Component } from 'react';
import css from './App.module.css';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleAddContact = ({ name, number }) => {
    const normalizationName = name.toLowerCase();

    const alreadyInContacts = this.state.contacts.some(
      ({ name }) => name.toLocaleLowerCase() === normalizationName
    );
    if (alreadyInContacts) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      name: name,
      number: number,
      id: nanoid(),
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  getContacts = () => {
    const { contacts, filter } = this.state;
    const normalizationFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizationFilter)
    );
  };

  changeFilter = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  componentDidMount() {
    const list = localStorage.getItem('contacts-list');
    if (!list) return;

    try {
      this.setState({
        contacts: JSON.parse(list),
      });
    } catch (evt) {
      console.error(evt);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      const contactsListStringified = JSON.stringify(this.state.contacts);
      localStorage.setItem('contacts-list', contactsListStringified);
    }
  }

  render() {
    const { filter, contacts } = this.state;
    const visibleContacts = this.getContacts();

    return (
      <div className={css.box}>
        <h2 className={css.title}>Phonebook</h2>
        <ContactForm onSubmit={this.handleAddContact} />
        <h2 className={css.title}>Contacts</h2>
        {contacts.length > 0 ? (
          <>
            <Filter value={filter} onChange={this.changeFilter} />
            <ContactList
              contacts={visibleContacts}
              deleteContact={this.deleteContact}
            />
          </>
        ) : (
          <h2 className={css['empty-list']}>Contact list is empty</h2>
        )}
      </div>
    );
  }
}

export default App;