import PropTypes from "prop-types";
import style from './ContactList.module.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

export const ContactList = ({ firstLoad, contacts, deleteContact, filter }) => {
const visibleContact = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return (
        <>
            {contacts.length > 0 ? (
                <ul className={style.list}>
                        {visibleContact.map(({id, name, number}) => (
                        <li className={style.item} key={id}>
                            <p>
                                {name}: {number}
                            </p>
                            <button className={style.button} type="button" onClick={() => deleteContact(id)} value="delete">Delete contact</button>
                        </li>
                    ))}
                </ul>
            ) :(firstLoad.current && (
            Report.info('Phonebook Info', 'Contact book is empty!',
              'Okay',
            )))}
    </>
    )    
}

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        }),
    ),
    deleteContact: PropTypes.func.isRequired,
    filter: PropTypes.string,
};

