import css from './ContactList.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, deleteContact }) => (
  <table>
    <tbody className={css.list}>
      {contacts.map(({ id, name, number }) => (
        <tr key={id} id={id} className={css.item}>
          <td className={css.name}>{name}:</td>
          <td className={css.number}>{number}</td>
          <td>
            <button
              className={css.button}
              type="submit"
              onClick={() => deleteContact(id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    }).isRequired
  ),
  deleteContact: PropTypes.func.isRequired,
};

export default ContactList;
