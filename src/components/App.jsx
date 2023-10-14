import { Component } from 'react';
import { Container } from './Container/Container';
import { Section } from './Section/Section';
import { Form } from './Form/Form';
import { Filter } from './Filter/Filter';
import { Contacts } from './Contacts/Contacts';
import { EmptyContacts } from './EmptyContacts/EmptyContacts';

function filterByCriteria(field, fieldValue) {
  return field.toLowerCase().trim().includes(fieldValue.toLowerCase().trim());
}

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Meghan, Duchess of Sussex', number: '459-12-56' },
      { id: 'id-2', name: 'Patrick Jay Adams', number: '443-89-12' },
      { id: 'id-3', name: 'Gabriel Macht', number: '645-17-79' },
      { id: 'id-4', name: 'Sarah Rafferty', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const localData = localStorage.getItem('contacts');
    const localeParse = JSON.parse(localData);
    if (localData && localeParse.length > 0)
      this.setState({ contacts: localeParse });

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formDeleteHandler = contactsId => {
    this.setState({
      contacts: this.state.contacts.filter(
        contact => contact.id !== contactsId
      ),
    });
  };

  formAddHandler = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  onFilter = evt => {
    this.setState({
      filter: evt.target.value,
    });
  };

  addedContact = newContact => {
    return this.props.contacts.some(
      contact =>
        contact.name.toLowerCase().trim() ===
          newContact.name.toLowerCase().trim() ||
        contact.number === newContact.number
    );
  };

  render() {
    const filteredContacts = this.state.contacts.filter(
      contact =>
        filterByCriteria(contact.name, this.state.filter) ||
        filterByCriteria(contact.number, this.state.filter)
    );
    return (
      <Container>
        <Section title={'Phonebook'}>
          <Form onSubmit={this.formAddHandler}  />
        </Section>

        <Section title={'Filter'}>
          <Filter onFilter={this.onFilter} filter={this.state.filter} />
        </Section>

        <Section title={'Contacts'}>
          {filteredContacts.length === 0 ? (
            <EmptyContacts />
          ) : (
            <Contacts
              contacts={filteredContacts}
              formDeleteHandler={this.formDeleteHandler}
            />
          )}
        </Section>
      </Container>
    );
  }

}
