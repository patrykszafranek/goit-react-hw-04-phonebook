import React, { useState, useEffect } from 'react';
import css from './App.module.css';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts-list')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts-list', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = ({ name, number }) => {
    const normalizationName = name.toLowerCase();

    const alreadyInContacts = contacts.some(
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

    setContacts(contacts => [...contacts, newContact]);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={css.box}>
      <h2 className={css.title}>Phonebook</h2>
      <ContactForm onSubmit={handleAddContact} />
      <h2 className={css.title}>Contacts</h2>
      {contacts.length > 0 ? (
        <>
          <Filter
            value={filter}
            onChange={evt => setFilter(evt.currentTarget.value)}
          />
          <ContactList
            contacts={visibleContacts}
            deleteContact={deleteContact}
          />
        </>
      ) : (
        <h2 className={css['empty-list']}>Contact list is empty</h2>
      )}
    </div>
  );
};

export default App;
