import React from 'react';
import "./ContactRow.css";

const ContactRow = ({ contact, onSelect, isSelected, serialNumber }) => {
  return (
    <tr>
      <td>
        <input type="checkbox" checked={isSelected} onChange={() => onSelect(contact.id)} />
      </td>
      <td>{serialNumber}</td>
      <td>{contact.name}</td>
      <td>{contact.phoneNumber}</td>
      <td>{contact.email}</td>
    </tr>
  );
};

export default ContactRow;
