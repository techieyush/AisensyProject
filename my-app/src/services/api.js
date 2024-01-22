const BASE_URL = 'http://localhost:5000/api';  
const api = {
  importContacts: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${BASE_URL}/contacts/import`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }

      return await response.json();
    } catch (error) {
      throw new Error('An error occurred while importing contacts.');
    }
  },

  getContacts: async (page, limit) => {
    try {
      const response = await fetch(`${BASE_URL}/contacts?page=${page}&limit=${limit}`);

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }

      return await response.json();
    } catch (error) {
      throw new Error('An error occurred while fetching contacts.');
    }
  },
  sortContacts : async (field, order) => {
    try {
      const response = await fetch(`${BASE_URL}/contacts/sort?field=${field}&order=${order}`);
      return response.data;
    } catch (error) {
      console.error('Error sorting contacts:', error);
      throw error;
    }
  },
  
  downloadContacts : async (selectedContacts) => {
    try {
      const response = await fetch(`${BASE_URL}/contacts/download`, { contacts: selectedContacts });
      return response.data;
    } catch (error) {
      console.error('Error downloading contacts:', error);
      throw error;
    }
  }
}

export default api;
