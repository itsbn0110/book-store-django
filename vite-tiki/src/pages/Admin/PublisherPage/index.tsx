import { useState, useEffect } from 'react';
import { PlusCircle, Pencil, Trash2, Search, X } from 'lucide-react';
import styles from '../AdminPages.module.scss';

interface Publisher {
  id: number;
  name: string;
  address: string;
}

interface PublisherFormData {
  name: string;
  address: string;
}

const initialFormData: PublisherFormData = {
  name: '',
  address: ''
};

const PublishersPage = () => {
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<PublisherFormData>(initialFormData);
  const [currentPublisherId, setCurrentPublisherId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<{name?: string, address?: string}>({});

  useEffect(() => {
    fetchPublishers();
  }, []);

  const fetchPublishers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:8000/api/publishers');
      const data = await response.json();
      setPublishers(data);
    } catch (error) {
      console.error('Error fetching publishers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (publisher?: Publisher) => {
    if (publisher) {
      // Edit mode
      setFormData({
        name: publisher.name,
        address: publisher.address
      });
      setCurrentPublisherId(publisher.id);
    } else {
      // Add mode
      setFormData(initialFormData);
      setCurrentPublisherId(null);
    }
    setFormErrors({});
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData(initialFormData);
    setCurrentPublisherId(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors: {name?: string, address?: string} = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.address.trim()) {
      errors.address = 'Address is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      
      const url = currentPublisherId 
        ? `http://127.0.0.1:8000/api/publishers/${currentPublisherId}/update/` 
        : 'http://127.0.0.1:8000/api/publishers/create/';
      
      const method = currentPublisherId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save publisher');
      }

      // Refresh the publishers list
      await fetchPublishers();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving publisher:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this publisher?')) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/publishers/${id}/delete/`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete publisher');
        }
        
        setPublishers(publishers.filter(publisher => publisher.id !== id));
      } catch (error) {
        console.error('Error deleting publisher:', error);
      }
    }
  };

 

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>Publishers</h1>
          <button 
            className={styles.addButton}
            onClick={() => handleOpenModal()}
          >
            <PlusCircle size={16} />
            Add Publisher
          </button>
        </div>

        <div className={styles.filterBar}>
          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search publishers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        {loading ? (
          <div className={styles.loading}>Loading publishers...</div>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {publishers.length > 0 ? (
                  publishers.map((publisher) => (
                    <tr key={publisher.id}>
                      <td>{publisher.id}</td>
                      <td>{publisher.name}</td>
                      <td>{publisher.address}</td>
                      <td className={styles.actionsCell}>
                        <button
                          onClick={() => handleOpenModal(publisher)}
                          className={styles.editButton}
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(publisher.id)}
                          className={styles.deleteButton}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className={styles.noData}>
                      No publishers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>{currentPublisherId ? 'Edit' : 'Add'} Publisher</h2>
              <button className={styles.closeButton} onClick={handleCloseModal}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={formErrors.name ? styles.inputError : ''}
                />
                {formErrors.name && <span className={styles.errorMessage}>{formErrors.name}</span>}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className={formErrors.address ? styles.inputError : ''}
                />
                {formErrors.address && <span className={styles.errorMessage}>{formErrors.address}</span>}
              </div>
              <div className={styles.formActions}>
                <button type="button" onClick={handleCloseModal} className={styles.cancelButton}>
                  Cancel
                </button>
                <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PublishersPage;