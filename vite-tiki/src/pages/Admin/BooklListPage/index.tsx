import { useState, useEffect } from 'react';
import { PlusCircle, Pencil, Trash2, Search, X, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from '../AdminPages.module.scss';

interface Author {
  id: number;
  name: string;
  bio?: string;
}

interface Publisher {
  id: number;
  name: string;
  address?: string;
}

interface Category {
  id: number;
  name: string;
}

interface Book {
  id: number;
  title: string;
  description: string;
  price: string;
  author_objs: Author[];
  publisher_objs: Publisher[];
  category_objs: Category[];
  published_date: string;
  image: string;
}

const BookListPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:8000/api/books');
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/books/${id}/delete/`, {
          method: 'DELETE',
         
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete book');
        }
        
        setBooks(books.filter(book => book.id !== id));
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  const handleOpenPreview = async (book: Book) => {
    setSelectedBook(book);
    setLoadingPreview(true);
    setShowPreview(true);
    // In a real app, you might want to fetch the full book details here
    setLoadingPreview(false);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    setSelectedBook(null);
  };

  const getMainAuthor = (book: Book) => {
    return book.author_objs && book.author_objs.length > 0 
      ? book.author_objs[0].name 
      : 'Unknown Author';
  };

  const getMainPublisher = (book: Book) => {
    return book.publisher_objs && book.publisher_objs.length > 0 
      ? book.publisher_objs[0].name 
      : 'Unknown Publisher';
  };

  const getMainCategory = (book: Book) => {
    return book.category_objs && book.category_objs.length > 0 
      ? book.category_objs[0].name 
      : 'Uncategorized';
  };

  const filteredBooks = books.filter(book => {
    const titleMatch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    const authorMatch = book.author_objs?.some(author => 
      author.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const publisherMatch = book.publisher_objs?.some(publisher => 
      publisher.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return titleMatch || authorMatch || publisherMatch;
  });

  const formatPrice = (price: string) => {
    return parseFloat(price).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  };

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>Books</h1>
          <Link to="/admin/books/add" className={styles.addButton}>
            <PlusCircle size={16} />
            Add Book
          </Link>
        </div>

        <div className={styles.filterBar}>
          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search books by title, author or publisher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        {loading ? (
          <div className={styles.loading}>Loading books...</div>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Publisher</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Published</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <tr key={book.id}>
                      <td>{book.id}</td>
                      <td className={styles.imageCell}>
                        <img 
                          src={book.image || "/api/placeholder/40/60"} 
                          alt={book.title}
                          className={styles.bookThumbnail}
                        />
                      </td>
                      <td>{book.title}</td>
                      <td>{getMainAuthor(book)}</td>
                      <td>{getMainPublisher(book)}</td>
                      <td>{getMainCategory(book)}</td>
                      <td>{formatPrice(book.price)}</td>
                      <td>{book.published_date}</td>
                      <td className={styles.actionsCell}>
                        <button
                          onClick={() => handleOpenPreview(book)}
                          className={styles.viewButton}
                          title="Preview Book"
                        >
                          <Eye size={16} />
                        </button>
                        <Link
                          to={`/admin/books/edit/${book.id}`}
                          className={styles.editButton}
                          title="Edit Book"
                        >
                          <Pencil size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(book.id)}
                          className={styles.deleteButton}
                          title="Delete Book"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className={styles.noData}>
                      No books found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Book Preview Modal */}
      {showPreview && selectedBook && (
        <div className={styles.modalOverlay}>
          <div className={`${styles.modalContent} ${styles.previewModal}`}>
            <div className={styles.modalHeader}>
              <h2>Book Preview</h2>
              <button className={styles.closeButton} onClick={handleClosePreview}>
                <X size={20} />
              </button>
            </div>
            
            {loadingPreview ? (
              <div className={styles.loading}>Loading book details...</div>
            ) : (
              <div className={styles.bookPreview}>
                <div className={styles.bookPreviewImage}>
                  <img 
                    src={selectedBook.image || "/api/placeholder/150/200"} 
                    alt={selectedBook.title}
                  />
                </div>
                <div className={styles.bookPreviewDetails}>
                  <h3 className={styles.bookTitle}>{selectedBook.title}</h3>
                  
                  {selectedBook.author_objs && selectedBook.author_objs.length > 0 && (
                    <p className={styles.bookAuthor}>
                      By <strong>{selectedBook.author_objs.map(author => author.name).join(', ')}</strong>
                    </p>
                  )}
                  
                  {selectedBook.publisher_objs && selectedBook.publisher_objs.length > 0 && (
                    <p className={styles.bookPublisher}>
                      Publisher: <span>{selectedBook.publisher_objs.map(pub => pub.name).join(', ')}</span>
                    </p>
                  )}
                  
                  {selectedBook.category_objs && selectedBook.category_objs.length > 0 && (
                    <p className={styles.bookCategory}>
                      Category: <span>{selectedBook.category_objs.map(cat => cat.name).join(', ')}</span>
                    </p>
                  )}
                  
                  <p className={styles.bookPrice}>
                    Price: <span>{formatPrice(selectedBook.price)}</span>
                  </p>
                  <p className={styles.bookPublishedDate}>
                    Published: <span>{selectedBook.published_date}</span>
                  </p>
                  <div className={styles.bookDescription}>
                    <h4>Description</h4>
                    <p>{selectedBook.description}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className={styles.formActions}>
              <button type="button" onClick={handleClosePreview} className={styles.cancelButton}>
                Close
              </button>
              <Link to={`/admin/books/edit/${selectedBook.id}`} className={styles.submitButton}>
                Edit Book
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookListPage;