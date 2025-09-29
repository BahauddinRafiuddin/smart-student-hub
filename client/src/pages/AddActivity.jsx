import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

const AddActivity = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    type: '',
    description: '',
    date: '',
    fileUrl: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const types = [
    { value: "conference", label: "Conference", icon: "🎤", color: "bg-purple-500" },
    { value: "workshop", label: "Workshop", icon: "🛠️", color: "bg-blue-500" },
    { value: "certification", label: "Certification", icon: "📜", color: "bg-green-500" },
    { value: "competition", label: "Competition", icon: "🏆", color: "bg-yellow-500" },
    { value: "internship", label: "Internship", icon: "💼", color: "bg-indigo-500" },
    { value: "volunteering", label: "Volunteering", icon: "🤝", color: "bg-pink-500" },
    { value: "club", label: "Club Activity", icon: "👥", color: "bg-teal-500" },
    { value: "sports", label: "Sports", icon: "⚽", color: "bg-orange-500" }
  ];

  // Real-time validation
  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'title':
        if (value.length < 3) {
          newErrors.title = 'Title must be at least 3 characters long';
        } else {
          delete newErrors.title;
        }
        break;
      case 'description':
        if (value.length < 10) {
          newErrors.description = 'Description must be at least 10 characters long';
        } else {
          delete newErrors.description;
        }
        break;
      case 'date':
        if (!value) {
          newErrors.date = 'Date is required';
        } else {
          delete newErrors.date;
        }
        break;
      case 'type':
        if (!value) {
          newErrors.type = 'Please select an activity type';
        } else {
          delete newErrors.type;
        }
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await api.post("/activities/addActivity", form);
      // Success animation or toast could go here
      navigate("/dashboard/my-activities");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedType = types.find(type => type.value === form.type);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <span className="text-2xl text-white">📝</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Add New Activity
          </h1>
          <p className="text-gray-600 text-lg">
            Share your achievements and experiences
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8 sm:px-10 sm:py-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Activity Title */}
              <div className="group">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <span className="mr-2">📌</span>
                  Activity Title
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-4 text-lg border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                      errors.title 
                        ? 'border-red-300 bg-red-50' 
                        : form.title 
                        ? 'border-green-300 bg-green-50' 
                        : 'border-gray-200 hover:border-gray-300 focus:border-blue-400'
                    }`}
                    placeholder="e.g., React.js Workshop at Tech Conference"
                    required
                  />
                  {form.title && !errors.title && (
                    <div className="absolute right-4 top-4 text-green-500">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                {errors.title && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Activity Type - Card Selection */}
              <div className="group">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-4">
                  <span className="mr-2">🎯</span>
                  Activity Type
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {types.map((type) => (
                    <div
                      key={type.value}
                      onClick={() => handleInputChange({ target: { name: 'type', value: type.value } })}
                      className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 border-2 ${
                        form.type === type.value
                          ? `${type.color} border-transparent text-white shadow-lg`
                          : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">{type.icon}</div>
                        <div className="text-xs font-medium">{type.label}</div>
                      </div>
                      {form.type === type.value && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {errors.type && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.type}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="group">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <span className="mr-2">📝</span>
                  Description
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleInputChange}
                    rows={5}
                    className={`w-full px-4 py-4 text-lg border-2 rounded-xl resize-none transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                      errors.description 
                        ? 'border-red-300 bg-red-50' 
                        : form.description 
                        ? 'border-green-300 bg-green-50' 
                        : 'border-gray-200 hover:border-gray-300 focus:border-blue-400'
                    }`}
                    placeholder="Describe your activity, what you learned, and any achievements..."
                    required
                  />
                  <div className="absolute bottom-4 right-4 text-sm text-gray-400">
                    {form.description.length}/500
                  </div>
                </div>
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Date and File URL - Side by side on larger screens */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Date */}
                <div className="group">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <span className="mr-2">📅</span>
                    Date
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-4 text-lg border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                      errors.date 
                        ? 'border-red-300 bg-red-50' 
                        : form.date 
                        ? 'border-green-300 bg-green-50' 
                        : 'border-gray-200 hover:border-gray-300 focus:border-blue-400'
                    }`}
                    required
                  />
                  {errors.date && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.date}
                    </p>
                  )}
                </div>

                {/* File URL */}
                <div className="group">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <span className="mr-2">🔗</span>
                    Certificate/Document URL
                    <span className="text-gray-400 text-xs ml-2">(Optional)</span>
                  </label>
                  <input
                    type="url"
                    name="fileUrl"
                    value={form.fileUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 hover:border-gray-300"
                    placeholder="https://example.com/certificate.pdf"
                  />
                  {form.fileUrl && (
                    <div className="mt-2 flex items-center text-sm text-blue-600">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.1a1 1 0 011.414 1.414l-1.102 1.1A6 6 0 108 10.172z" />
                      </svg>
                      Link added successfully
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isLoading || Object.keys(errors).length > 0}
                  className={`w-full relative overflow-hidden py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 transform ${
                    isLoading || Object.keys(errors).length > 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding Activity...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span className="mr-2">✨</span>
                      Add Activity
                    </div>
                  )}
                </button>
              </div>

              {/* Selected Type Preview */}
              {selectedType && (
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-center text-center">
                    <div className={`w-12 h-12 rounded-full ${selectedType.color} flex items-center justify-center text-white text-xl mr-4`}>
                      {selectedType.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Selected Activity Type:</p>
                      <p className="font-semibold text-gray-900">{selectedType.label}</p>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddActivity;
