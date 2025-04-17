import React, { useState, useRef, useEffect } from 'react';
import './MultiSelect.scss';

interface Option {
  id: string | number;
  name: string;
}

interface MultiSelectProps {
  label?: string;
  options: Option[];
  selectedValues: Option[];
  onChange: (selected: Option[]) => void;
  placeholder?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ 
  label, 
  options = [], 
  selectedValues = [], 
  onChange, 
  placeholder = "Select items..."
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const dropdownRef = useRef(null);
  
  // Filter options based on search input
  const filteredOptions = options.filter(option => 
    option.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !(dropdownRef.current as HTMLElement).contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle selection of an option
  const toggleOption = (option: Option) => {
    const isSelected = selectedValues.some(item => item.id === option.id);
    onChange(isSelected 
      ? selectedValues.filter(item => item.id !== option.id)
      : [...selectedValues, option]
    );
  };

  // Remove a selected option
  const removeSelected = (option: Option, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onChange(selectedValues.filter(item => item.id !== option.id));
  };

  // Render tag for each selected item
  const renderTags = () => (
    <div className="tagContainer">
      {selectedValues.map(item => (
        <div key={item.id} className="tag">
          {item.name}
          <button 
            type="button" 
            className="removeTag" 
            onClick={(e) => removeSelected(item, e)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );

  // Render option in dropdown
  const renderOption = (option: Option) => {
    const isSelected = selectedValues.some(item => item.id === option.id);
    return (
      <div 
        key={option.id}
        className={`option ${isSelected ? 'selected' : ''}`}
        onClick={() => toggleOption(option)}
      >
        <span>{option.name}</span>
        {isSelected && <span className="checkmark">✓</span>}
      </div>
    );
  };

  return (
    <div className="multiSelect" ref={dropdownRef}>
      {label && <label className="multiSelectLabel">{label}</label>}
      
      <div 
        className={`multiSelectInput ${isOpen ? 'active' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="selectedItems">
          {selectedValues.length === 0 
            ? <span className="placeholder">{placeholder}</span>
            : renderTags()
          }
        </div>
        <div className="dropdownIcon">▼</div>
      </div>
      
      {isOpen && (
        <div className="dropdown">
          <div className="searchContainer">
            <input
              type="text"
              className="searchInput"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="optionsList">
            {filteredOptions.length > 0 
              ? filteredOptions.map(renderOption)
              : <div className="noOptions">No matching options</div>
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;