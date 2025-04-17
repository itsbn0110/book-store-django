import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import styles from '../AdminPages.module.scss';
import MultiSelect from '~/pages/Admin/components/MultipleSelect'

interface Author {
  id: string | number;
  name: string;
}

interface Publisher {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface BookFormData {
  title: string;
  description: string;
  price: string;
  authors: Author[];
  publishers: Publisher[];
  categories: Category[];
  published_date: string;
  image: File | null;
}

interface FormErrors {
  title?: string;
  description?: string;
  price?: string;
  authors?: string;
  publishers?: string;
  categories?: string;
  published_date?: string;
  image?: string;
}

const initialFormData: BookFormData = {
  title: '',
  description: '',
  price: '',
  authors: [],
  publishers: [],
  categories: [],
  published_date: new Date().toISOString().split('T')[0],
  image: null
};

const AddEditBookPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState<BookFormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(isEditMode);
  
  const [authors, setAuthors] = useState<Author[]>([]);
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const authorsPromise = fetch('http://127.0.0.1:8000/api/authors')
          .then(res => res.json());
        
        const publishersPromise = fetch('http://127.0.0.1:8000/api/publishers')
          .then(res => res.json());
        
        const categoriesPromise = fetch('http://127.0.0.1:8000/api/categories')
          .then(res => res.json());
        
        const [authorsData, publishersData, categoriesData] = await Promise.all([
          authorsPromise,
          publishersPromise,
          categoriesPromise
        ]);
        console.log(authorsData);
        console.log(publishersData);
        console.log(categoriesData);

        setAuthors(authorsData);
        setPublishers(publishersData);
        setCategories(categoriesData);
      } catch (error) { 
        console.error('Error fetching dropdown data:', error);
      }
    };
    
    fetchDropdownData();
    
    if (isEditMode) {
      fetchBookDetails();
    }
  }, [id, isEditMode]);

  const fetchBookDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://127.0.0.1:8000/api/books/${id}`);
      
      if (!response.ok) {
        throw new Error('Book not found');
      }
      
      const book = await response.json();
      
      setFormData({
        title: book.title,
        description: book.description,
        price: book.price,
        authors: book.authors || [],
        publishers: book.publishers || [],
        categories: book.categories || [],
        published_date: book.published_date,
        image: null
      });
      
      if (book.image) {
        setImagePreview(book.image);
      }
    } catch (error) {
      console.error('Error fetching book details:', error);
      navigate('/admin/books');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log("name", name);
    console.log("value", value);
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle MultiSelect changes for authors
  interface Option {
    id: string | number;
    name: string;
  }

  const handleAuthorsChange = (selected: Option[]) => {
    const selectedAuthors = selected.map(option => ({
      id: Number(option.id),
      name: option.name,
    }));
    setFormData(prev => ({ ...prev, authors: selectedAuthors }));
  };

  // Handle MultiSelect changes for publishers
  const handlePublishersChange = (selected: Option[]) => {
      const selectedPublishers = selected.map(option => ({
          id: Number(option.id),
          name: option.name,
      }));
      setFormData(prev => ({ ...prev, publishers: selectedPublishers }));
  };
  
  const handleCategoriesChange = (selected: Option[]) => {
      const selectedCategories = selected.map(option => ({
        id: Number(option.id),
        name: option.name
      }))
      setFormData(prev => ({...prev, categories: selectedCategories}))
  }
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = () => {
    const errors: FormErrors = {};
    
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }
    
    if (!formData.price.trim()) {
      errors.price = 'Price is required';
    } else {
      const priceValue = parseFloat(formData.price);
      if (isNaN(priceValue) || priceValue <= 0) {
        errors.price = 'Price must be a positive number';
      }
    }
    
    if (formData.authors.length === 0) {
      errors.authors = 'At least one author is required';
    }
    
    if (formData.publishers.length === 0) {
      errors.publishers = 'At least one publisher is required';
    }
    
    if (formData.categories.length ===0) {
      errors.categories = 'Category is required';
    }
    
    if (!formData.published_date) {
      errors.published_date = 'Published date is required';
    }
    
    if (!isEditMode && !formData.image && !imagePreview) {
      errors.image = 'Cover image is required';
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
      
      const url = isEditMode 
        ? `http://127.0.0.1:8000/api/books/${id}` 
        : 'http://127.0.0.1:8000/api/books/create/';
      
      const method = isEditMode ? 'PUT' : 'POST';
      
      // Create FormData for multipart/form-data submission
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('title', formData.title);
      formDataToSubmit.append('description', formData.description);
      formDataToSubmit.append('price', formData.price);
      
      // Append authors as JSON array of IDs
      const authorIds = formData.authors.map(author => author.id);
      formDataToSubmit.append('authors', JSON.stringify(authorIds));
      
      // Append publishers as JSON array of IDs
      const publisherIds = formData.publishers.map(publisher => publisher.id);
      formDataToSubmit.append('publishers', JSON.stringify(publisherIds));
      
      formDataToSubmit.append('categories', JSON.stringify(formData.categories.map(category => category.id)));
      formDataToSubmit.append('published_date', formData.published_date);

      if (formData.image) {
        formDataToSubmit.append('image', formData.image);
      }
      
      console.log(formDataToSubmit.get("image"));
      console.log(formDataToSubmit.get("authors"));  
      console.log(formDataToSubmit.get("publishers"));
      console.log(formDataToSubmit.get("category"));
      
      const response = await fetch(url, {
        method,
        body: formDataToSubmit,
      });
      
      if (!response.ok) {
        throw new Error('Failed to save book');
      }
      
      navigate('/admin/books');
    } catch (error) {
      console.error('Error saving book:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading book data...</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1>{isEditMode ? 'Edit Book' : 'Add New Book'}</h1>
        <button 
          className={styles.backButton}
          onClick={() => navigate('/admin/books')}
        >
          <ArrowLeft size={16} />
          Back to List
        </button>
      </div>
      
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.formColumn}>
              <div className={styles.formGroup}>
                <label htmlFor="title">Book Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={formErrors.title ? styles.inputError : ''}
                />
                {formErrors.title && <span className={styles.errorMessage}>{formErrors.title}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={6}
                  className={formErrors.description ? styles.inputError : ''}
                />
                {formErrors.description && <span className={styles.errorMessage}>{formErrors.description}</span>}
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="price">Price</label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className={formErrors.price ? styles.inputError : ''}
                  />
                  {formErrors.price && <span className={styles.errorMessage}>{formErrors.price}</span>}
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="published_date">Published Date</label>
                  <input
                    type="date"
                    id="published_date"
                    name="published_date"
                    value={formData.published_date}
                    onChange={handleInputChange}
                    className={formErrors.published_date ? styles.inputError : ''}
                  />
                  {formErrors.published_date && <span className={styles.errorMessage}>{formErrors.published_date}</span>}
                </div>
              </div>
            </div>
            
            <div className={styles.formColumn}>
              <div className={styles.formGroup}>
                <MultiSelect
                  label="Authors"
                  options={authors}
                  selectedValues={formData.authors}
                  onChange={handleAuthorsChange}
                  placeholder="Select authors..."
                />
                {formErrors.authors && <span className={styles.errorMessage}>{formErrors.authors}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <MultiSelect
                  label="Publishers"
                  options={publishers}
                  selectedValues={formData.publishers}
                  onChange={handlePublishersChange}
                  placeholder="Select publishers..."
                />
                {formErrors.publishers && <span className={styles.errorMessage}>{formErrors.publishers}</span>}
              </div>
              
              <div className={styles.formGroup}>
              <MultiSelect
                  label="Categories"
                  options={categories}
                  selectedValues={formData.categories}
                  onChange={handleCategoriesChange}
                  placeholder="Select publishers..."
                />
                
                {formErrors.categories && <span className={styles.errorMessage}>{formErrors.categories}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <label>Cover Image</label>
                <div className={styles.imageUploadContainer}>
                  {imagePreview ? (
                    <div className={styles.imagePreviewContainer}>
                      <img 
                        src={imagePreview} 
                        alt="Book cover preview" 
                        className={styles.imagePreview}
                      />
                      <button 
                        type="button" 
                        className={styles.removeImageButton}
                        onClick={handleRemoveImage}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className={styles.uploadPlaceholder}>
                      <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        ref={fileInputRef}
                        className={formErrors.image ? styles.inputError : ''}
                      />
                      <p>Click to upload image</p>
                    </div>
                  )}
                </div>
                {formErrors.image && <span className={styles.errorMessage}>{formErrors.image}</span>}
              </div>
            </div>
          </div>
          
          <div className={styles.formActions}>
            <button 
              type="button" 
              onClick={() => navigate('/admin/books')}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              <Save size={16} />
              {isSubmitting ? 'Saving...' : 'Save Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditBookPage;