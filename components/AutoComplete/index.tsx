import { useState, KeyboardEvent, useRef } from 'react';

interface AutocompleteProps {
  options: string[];
}

const Autocomplete: React.FC<AutocompleteProps> = ({ options }) => {
  const inputRef = useRef(null);
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    const filteredOptions = options.filter((option) =>
      option.toLowerCase().startsWith(inputValue.toLowerCase())
    );
    setSuggestions(filteredOptions);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setValue(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleInputBlur = () => {
    setShowSuggestions(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (activeSuggestionIndex === suggestions.length - 1) {
        setActiveSuggestionIndex(-1);
      } else {
        setActiveSuggestionIndex(activeSuggestionIndex + 1);
        setValue(suggestions[activeSuggestionIndex + 1]);
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (activeSuggestionIndex === -1) {
        setActiveSuggestionIndex(suggestions.length - 1);
      } else {
        setActiveSuggestionIndex(activeSuggestionIndex - 1);
      }
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (activeSuggestionIndex !== -1) {
        setValue(suggestions[activeSuggestionIndex]);
        setSuggestions([]);
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
      }
    } else if (event.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleCloseButton = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter') {
      setValue('');
      setShowSuggestions(false);
      setTimeout(() => {
        inputRef?.current?.focus();
      }, 300);
    }
  };

  return (
    <div className="autocomplete">
      <button>First Button</button>
      <label htmlFor="autocomplete-input">Search for a country:</label>
     <div style={{display: 'flex'}}>
<textarea
        id="autocomplete-input"
        value={value}
        ref={inputRef}
        rows={1}
        autoCapitalize="none"
        placeholder="Insira o código ou o nome do seu banco"
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        autoComplete="off"
        aria-autocomplete="list"
        aria-expanded={showSuggestions}
        aria-owns="autocomplete-listbox"
        onKeyDown={handleKeyDown}
        role="combobox"
        spellCheck={false}
      />

      <button
        onKeyDown={(e) => handleCloseButton(e)}
        aria-label="Limpar o campo"
        onClick={() => {
          setValue(''), setShowSuggestions(false);
        }}
      >
        X
      </button>
     </div>
      {showSuggestions && (
        <ul role="listbox" id="autocomplete-listbox">
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              role="presentation"
              aria-selected={index === activeSuggestionIndex}
              data-view-type="1"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <span>{suggestion}</span>
            </li>
          ))}
        </ul>
      )}
      <div role="status" className="visually-hidden">
        {suggestions?.length} results available.
      </div>
    </div>
  );
};

export default Autocomplete;
