import React, { useState, useEffect } from 'react';
import ContactRow from './ContactRow';
import api from '../services/api';
import './ContactList.css';
import ErrorModal from './ErrorModal';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [error, setError] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);

  const handleModalClose = () => {
    setShowErrorModal(false);
  };

  const contactsPerPage = 10;

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const result = await api.getContacts(
          currentPage,
          contactsPerPage,
          sortConfig.key,
          sortConfig.direction
        );

        setContacts(result.contacts);
        setTotalPages(result.totalPages);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchContacts();
  }, [currentPage, sortConfig]);

  useEffect(() => {
    console.log('Selected Contacts:', selectedContacts);
  }, [selectedContacts]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleContactSelect = (selectedContactId) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === selectedContactId
          ? { ...contact, isSelected: !contact.isSelected }
          : contact
      )
    );
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getClassNamesFor = (name) => {
    if (!sortConfig || sortConfig.key !== name) {
      return;
    }
    return sortConfig.direction === 'asc' ? 'ascending' : 'descending';
  };

  const sortedContacts = () => {
    if (sortConfig.key) {
      return [...contacts].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return contacts;
  };

  const downloadSelectedContacts = () => {
    const selectedContacts = contacts.filter((contact) => contact.isSelected);
    setSelectedContacts(selectedContacts);
    
    // if (selectedContacts.length === 0) {
    //   setError('Please select at least one contact to download.');
    //   setShowErrorModal(true);
    //   return;
    // }


    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Serial Number,Name,Phone,Email\n' +
      selectedContacts
        .map(
          (contact, index) =>
            `${index + 1},${contact.name || ''},${contact.phoneNumber || ''},${contact.email || ''}`
        )
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'selected_contacts.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div align='center'>
        <button onClick={() => requestSort('name')} className={getClassNamesFor('name')}>
          Sort by Name
        </button>
        <button onClick={() => requestSort('phoneNumber')} className={getClassNamesFor('phoneNumber')}>
          Sort by Phone
        </button>
        <button onClick={() => requestSort('email')} className={getClassNamesFor('email')}>
          Sort by Email
        </button>
      </div>
      <br />
      <div align='center'>
        <button onClick={downloadSelectedContacts}>Download Selected Contacts</button>
      </div>
      {showErrorModal && <ErrorModal message={error} onClose={handleModalClose} />}
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Serial</th>
            <th>Name</th>
            <th>PhoneNumber</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {sortedContacts().map((contact, index) => (
            <ContactRow
              key={contact.id}
              contact={contact}
              serialNumber={index + 1}
              onSelect={() => handleContactSelect(contact.id)}
            />
          ))}
        </tbody>
      </table>
      <div align="center">
        {totalPages > 1 && (
          <div>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                disabled={page === currentPage}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactList;
