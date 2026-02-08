import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react'; // Optional icons

const subjects = [
  "Arabic",
  "Maths",
  "English",
  "Tamil",
  "Chemistry",
  "Physics",
  "Biology",
  "Computer Science"
];

export default function SubjectDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const dropdownRef = useRef(null);

  // Filter subjects based on search input
  const filteredSubjects = subjects.filter((subject) =>
    subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (subject) => {
    setSelectedSubject(subject);
    setSearchTerm(subject); // Set input value to selected item
    setIsOpen(false);
  };

  return (
    <div className="w-full max-w-md mx-auto relative" ref={dropdownRef}>
      <label className="block text-sm font-bold text-gray-700 mb-2">
        Subject Field
      </label>
      
      {/* Input Field */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {/* Search Icon (SVG or Icon component) */}
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-700 bg-white"
          placeholder="Search subjects..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onClick={() => setIsOpen(true)}
        />
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-lg max-h-60 overflow-auto custom-scrollbar">
          {filteredSubjects.length > 0 ? (
            <ul className="py-1 text-base text-gray-700">
              {filteredSubjects.map((subject, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(subject)}
                  className="cursor-pointer px-4 py-3 hover:bg-gray-50 transition-colors duration-150 flex items-center justify-between group"
                >
                  <span>{subject}</span>
                  {selectedSubject === subject && (
                    <span className="text-indigo-600 font-semibold text-sm">Selected</span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-3 text-gray-500 text-sm">
              No subjects found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}