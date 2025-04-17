import { useState, useEffect } from 'react';
import { PlusCircle, Pencil, Trash2, Search, X } from 'lucide-react';
import styles from '../AdminPages.module.scss';

interface Author {
  id: number;
  name: string;
  bio: string;
}

interface AuthorFormData {
  name: string;
  bio: string;
}

const initialFormData: AuthorFormData = {
  name: '',
  bio: ''
};

const AuthorsPage = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<AuthorFormData>(initialFormData);
  const [currentAuthorId, setCurrentAuthorId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<{name?: string, bio?: string}>({});

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:8000/api/authors');
      const data = await response.json();
      setAuthors(data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (author?: Author) => {
    if (author) {
      // Edit mode
      setFormData({
        name: author.name,
        bio: author.bio
      });
      setCurrentAuthorId(author.id);
    } else {
      // Add mode
      setFormData(initialFormData);
      setCurrentAuthorId(null);
    }
    setFormErrors({});
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData(initialFormData);
    setCurrentAuthorId(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors: {name?: string, bio?: string} = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.bio.trim()) {
      errors.bio = 'Bio is required';
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
      
      const url = currentAuthorId 
        ? `http://127.0.0.1:8000/api/authors/${currentAuthorId}/update/` 
        : 'http://127.0.0.1:8000/api/authors/create/';
      
      const method = currentAuthorId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save author');
      }

      // Refresh the authors list
      await fetchAuthors();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving author:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this author?')) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/authors/${id}/delete/`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete author');
        }
        
        setAuthors(authors.filter(author => author.id !== id));
      } catch (error) {
        console.error('Error deleting author:', error);
      }
    }
  };

  const filteredAuthors = authors.filter(author =>
    author.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
     <>
          <div className={styles.pageContainer}>
            <div className={styles.pageHeader}>
              <h1>Authors</h1>
              <button 
                className={styles.addButton}
                onClick={() => handleOpenModal()}
              >
                <PlusCircle size={16} />
                Add Author
              </button>
            </div>
    
            <div className={styles.filterBar}>
              <div className={styles.searchBox}>
                <Search size={18} className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search authors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
            </div>
    
            {loading ? (
              <div className={styles.loading}>Loading authors...</div>
            ) : (
              <div className={styles.tableContainer}>
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Bio</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAuthors.length > 0 ? (
                      filteredAuthors.map((author) => (
                        <tr key={author.id}>
                          <td>{author.id}</td>
                          <td>{author.name}</td>
                          <td className={styles.bioCell}>{author.bio}</td>
                          <td className={styles.actionsCell}>
                            <button
                              onClick={() => handleOpenModal(author)}
                              className={styles.editButton}
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(author.id)}
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
                          No authors found
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
                  <h2>{currentAuthorId ? 'Edit' : 'Add'} Author</h2>
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
                    <label htmlFor="bio">Bio</label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={5}
                      className={formErrors.bio ? styles.inputError : ''}
                    />
                    {formErrors.bio && <span className={styles.errorMessage}>{formErrors.bio}</span>}
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

export default AuthorsPage;