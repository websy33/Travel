import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaStar, FaHeart, FaUmbrellaBeach, FaCamera, FaChevronDown, FaCalendarAlt, FaUserFriends, FaUtensils, FaPlus, FaMinus } from 'react-icons/fa';
import { GiElephant, GiDesert, GiCastle, GiCamel, GiMoneyStack } from 'react-icons/gi';
import { RiHotelFill } from 'react-icons/ri';
import { IoMdClose } from 'react-icons/io';

// Initialize EmailJS
emailjs.init('37pN2ThzFwwhwk7ai');

const Rajasthan = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedPackage, setExpandedPackage] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    arrivalDate: '',
    departureDate: '',
    adults: 1,
    kids: 0,
    kidsAges: '',
    hotelCategory: '3',
    mealsIncluded: 'yes',
    budget: '',
    package: '',
    message: '',
    specialRequests: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // EmailJS configuration
  const SERVICE_ID = 'service_ov629rm';
  const TEMPLATE_ID = 'template_jr1dnto';

  // Special request options
  const specialRequestOptions = [
    { id: 'cake', label: 'Birthday/Anniversary Cake' },
    { id: 'candlelight', label: 'Candlelight Dinner' },
    { id: 'honeymoon', label: 'Honeymoon Decorations' },
    { id: 'photoshoot', label: 'Professional Photoshoot' },
    { id: 'spa', label: 'Spa Treatment' },
    { id: 'guide', label: 'Private Guide' }
  ];

  // Gallery images
  const galleryImages = [
    "/images/Royal.jpeg",
    "/images/Desert.jpeg",
    "/images/Udaipur.jpeg",
    "/images/Royal (2).jpeg",
    "/images/Rajasthan.jpeg",
    "/images/Cultural.jpeg",
    "/images/rajasthan2.jpeg",
    "/images/rajasthan3.jpeg",
  ];

  const packages = [
    {
      id: 1,
      title: "Royal Jaipur Experience",
      duration: "4 Days / 3 Nights",
      price: "₹28,999",
      rating: 4.8,
      image: "/images/Royal.jpeg",
      type: "heritage",
      highlights: [
        "Stay in heritage haveli",
        "Private tour of City Palace",
        "Elephant ride at Amber Fort",
        "Traditional Rajasthani dinner with folk dance",
        "Shopping in Johari Bazaar"
      ],
      icon: <GiCastle className="text-2xl text-amber-600" />,
      color: "bg-gradient-to-br from-amber-100 to-amber-50"
    },
    {
      id: 2,
      title: "Desert Safari Adventure",
      duration: "3 Days / 2 Nights",
      price: "₹22,999",
      rating: 4.7,
      image: "/images/Desert.jpeg",
      type: "adventure",
      highlights: [
        "Camel safari in Thar Desert",
        "Overnight in luxury desert camp",
        "Cultural performance under stars",
        "Sand dune bashing",
        "Sunset photography session"
      ],
      icon: <GiCamel className="text-2xl text-yellow-700" />,
      color: "bg-gradient-to-br from-yellow-100 to-yellow-50"
    },
    {
      id: 3,
      title: "Udaipur Romantic Getaway",
      duration: "5 Days / 4 Nights",
      price: "₹35,999",
      rating: 4.9,
      image: "/images/Udaipur.jpeg",
      type: "honeymoon",
      highlights: [
        "Lakeview suite with private balcony",
        "Boat dinner on Lake Pichola",
        "Private tour of City Palace",
        "Spa treatment for couples",
        "Sunset at Sajjangarh (Monsoon Palace)"
      ],
      icon: <FaHeart className="text-2xl text-rose-500" />,
      color: "bg-gradient-to-br from-rose-100 to-rose-50"
    },
    {
      id: 4,
      title: "Luxury Heritage Trail",
      duration: "7 Days / 6 Nights",
      price: "₹68,999",
      rating: 4.9,
      image:  "/images/Royal (2).jpeg",
      type: "luxury",
      highlights: [
        "5-star palace hotels",
        "Private guided tours",
        "Royal dining experiences",
        "Elephant polo experience",
        "Personal butler service"
      ],
      icon: <RiHotelFill className="text-2xl text-amber-500" />,
      color: "bg-gradient-to-br from-amber-100 to-amber-50"
    },
    {
      id: 5,
      title: "Rajasthan Wildlife Tour",
      duration: "6 Days / 5 Nights",
      price: "₹42,999",
      rating: 4.7,
      image: "/images/Rajasthan.jpeg",
      type: "wildlife",
      highlights: [
        "Ranthambore tiger safari",
        "Bird watching at Keoladeo",
        "Desert wildlife exploration",
        "Stay in jungle lodges",
        "Nature photography sessions"
      ],
      icon: <GiElephant className="text-2xl text-green-600" />,
      color: "bg-gradient-to-br from-green-100 to-green-50"
    },
    {
      id: 6,
      title: "Cultural Rajasthan",
      duration: "10 Days / 9 Nights",
      price: "₹55,999",
      rating: 4.8,
      image: "/images/Cultural.jpeg",
      type: "cultural",
      highlights: [
        "Folk dance workshops",
        "Traditional cooking classes",
        "Textile and handicraft tours",
        "Village homestay experience",
        "Puppet show and storytelling"
      ],
      icon: <FaCamera className="text-2xl text-blue-600" />,
      color: "bg-gradient-to-br from-blue-100 to-blue-50"
    }
  ];

  const filteredPackages = activeTab === 'all' 
    ? packages 
    : packages.filter(pkg => pkg.type === activeTab);

  const togglePackage = (id) => {
    setExpandedPackage(expandedPackage === id ? null : id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSpecialRequestChange = (id) => {
    setFormData(prev => {
      if (prev.specialRequests.includes(id)) {
        return {
          ...prev,
          specialRequests: prev.specialRequests.filter(item => item !== id)
        };
      } else {
        return {
          ...prev,
          specialRequests: [...prev.specialRequests, id]
        };
      }
    });
  };

  const incrementCount = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: Math.min(prev[field] + 1, field === 'adults' ? 50 : 20)
    }));
  };

  const decrementCount = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: Math.max(prev[field] - 1, field === 'adults' ? 1 : 0)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Prepare the template parameters with all required fields
      const templateParams = {
        package_name: formData.package,
        destination: "Rajasthan",
        package_price: selectedPackage?.price || 'Custom Package',
        duration: selectedPackage?.duration || 'Custom Duration',
        from_name: formData.name,
        from_email: formData.email,
        phone_number: formData.phone,
        arrivalDate: formData.arrivalDate,
        departureDate: formData.departureDate,
        adults: formData.adults,
        kids: formData.kids,
        kidsAges: formData.kidsAges,
        hotelCategory: formData.hotelCategory,
        mealsIncluded: formData.mealsIncluded === 'yes' ? 'Included' : 'Excluded',
        budget: formData.budget || 'Not specified',
        message: formData.message + 
          (formData.specialRequests.length > 0 
            ? `\n\nSpecial Requests: ${formData.specialRequests.map(id => 
                specialRequestOptions.find(opt => opt.id === id)?.label).join(', ')}` 
            : '')
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        arrivalDate: '',
        departureDate: '',
        adults: 1,
        kids: 0,
        kidsAges: '',
        hotelCategory: '3',
        mealsIncluded: 'yes',
        budget: '',
        package: '',
        message: '',
        specialRequests: []
      });
      
      // Auto-close the form after 3 seconds
      setTimeout(() => {
        setShowBookingForm(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openBookingForm = (pkg) => {
    setSelectedPackage(pkg);
    setFormData(prev => ({
      ...prev,
      package: pkg.title
    }));
    setShowBookingForm(true);
    setSubmitStatus(null);
  };

  const BookingForm = () => (
    <AnimatePresence>
      {showBookingForm && (
        <motion.div 
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            <button 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
              onClick={() => setShowBookingForm(false)}
              type="button"
            >
              <IoMdClose className="text-2xl" />
            </button>
            
            <div className="p-6">
              <div className="mb-6 text-center">
                <h3 className="text-3xl font-bold text-gray-800 mb-1">Book {selectedPackage?.title}</h3>
                <div className="flex items-center justify-center space-x-4 text-gray-600">
                  <span className="flex items-center">
                    <FaCalendarAlt className="mr-1 text-amber-500" /> {selectedPackage?.duration}
                  </span>
                  <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
                    {selectedPackage?.price}
                  </span>
                </div>
              </div>
              
              {submitStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="text-green-500 text-5xl mb-4">✓</div>
                  <h3 className="text-2xl font-medium text-gray-800 mb-2">Booking Request Sent!</h3>
                  <p className="text-gray-600 mb-6">We'll contact you shortly to confirm your royal Rajasthan experience.</p>
                  <p className="text-sm text-gray-500">This window will close automatically...</p>
                </div>
              ) : (
                <>
                  <div className="space-y-5">
                    <input type="hidden" name="package" value={formData.package} />
                    
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                        required
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                          required
                          placeholder="your@email.com"
                        />
                      </div>
                      
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                          required
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Arrival Date *</label>
                        <div className="relative">
                          <input
                            type="date"
                            name="arrivalDate"
                            value={formData.arrivalDate}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 appearance-none"
                            required
                          />
                          <FaCalendarAlt className="absolute right-3 top-3.5 text-gray-400" />
                        </div>
                      </div>
                      
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Departure Date *</label>
                        <div className="relative">
                          <input
                            type="date"
                            name="departureDate"
                            value={formData.departureDate}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 appearance-none"
                            required
                          />
                          <FaCalendarAlt className="absolute right-3 top-3.5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Adults *</label>
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                          <button
                            type="button"
                            onClick={() => decrementCount('adults')}
                            className="px-3 py-3 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                          >
                            <FaMinus />
                          </button>
                          <input
                            type="number"
                            name="adults"
                            value={formData.adults}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 text-center border-0 focus:ring-0"
                            min="1"
                            max="50"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => incrementCount('adults')}
                            className="px-3 py-3 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                          >
                            <FaPlus />
                          </button>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Children</label>
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                          <button
                            type="button"
                            onClick={() => decrementCount('kids')}
                            className="px-3 py-3 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                          >
                            <FaMinus />
                          </button>
                          <input
                            type="number"
                            name="kids"
                            value={formData.kids}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 text-center border-0 focus:ring-0"
                            min="0"
                            max="20"
                          />
                          <button
                            type="button"
                            onClick={() => incrementCount('kids')}
                            className="px-3 py-3 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                          >
                            <FaPlus />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {formData.kids > 0 && (
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Children Ages *</label>
                        <input
                          type="text"
                          name="kidsAges"
                          value={formData.kidsAges}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                          placeholder="e.g. 5, 8 (comma separated)"
                          required
                        />
                      </div>
                    )}
                    
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Category *</label>
                      <div className="relative">
                        <select
                          name="hotelCategory"
                          value={formData.hotelCategory}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 appearance-none"
                          required
                        >
                          <option value="3">3 Star Standard</option>
                          <option value="4">4 Star Premium</option>
                          <option value="5">5 Star Luxury</option>
                          <option value="heritage">Heritage Property</option>
                          <option value="palace">Royal Palace Hotel</option>
                        </select>
                        <RiHotelFill className="absolute right-3 top-3.5 text-gray-400" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Meals Included? *</label>
                      <div className="flex space-x-6">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="mealsIncluded"
                            value="yes"
                            checked={formData.mealsIncluded === 'yes'}
                            onChange={handleInputChange}
                            className="hidden"
                            required
                          />
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.mealsIncluded === 'yes' ? 'border-amber-500 bg-amber-500' : 'border-gray-300'}`}>
                            {formData.mealsIncluded === 'yes' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                          </div>
                          <span className="flex items-center text-gray-700">
                            <FaUtensils className="mr-1 text-amber-500" /> Yes
                          </span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="mealsIncluded"
                            value="no"
                            checked={formData.mealsIncluded === 'no'}
                            onChange={handleInputChange}
                            className="hidden"
                          />
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.mealsIncluded === 'no' ? 'border-amber-500 bg-amber-500' : 'border-gray-300'}`}>
                            {formData.mealsIncluded === 'no' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                          </div>
                          <span className="text-gray-700">No</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Budget Range *</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                          placeholder="e.g. ₹30,000 - ₹50,000"
                          required
                        />
                        <GiMoneyStack className="absolute right-3 top-3.5 text-gray-400" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests</label>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        {specialRequestOptions.map(option => (
                          <label key={option.id} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.specialRequests.includes(option.id)}
                              onChange={() => handleSpecialRequestChange(option.id)}
                              className="hidden"
                            />
                            <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.specialRequests.includes(option.id) ? 'bg-amber-500 border-amber-500' : 'border-gray-300'}`}>
                              {formData.specialRequests.includes(option.id) && (
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                              )}
                            </div>
                            <span className="text-gray-700 text-sm">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Additional Requests</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                        placeholder="Any other special requirements or preferences..."
                      ></textarea>
                    </div>
                  </div>
                  
                  {submitStatus === 'error' && (
                    <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                      There was an error submitting your request. Please try again.
                    </div>
                  )}
                  
                  <motion.button
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full mt-6 bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      'Confirm Booking Request'
                    )}
                  </motion.button>
                </>
              )}
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Hero Section */}
      <div className="relative h-screen max-h-[800px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/Royal.jpeg"
            alt="Rajasthan Palace" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 via-orange-900/20 to-transparent"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white text-sm font-semibold py-2 px-6 rounded-full mb-6 border border-white/30 shadow-lg">
              <GiCastle className="mr-2" /> ROYAL RAJASTHAN EXPERIENCES
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 font-serif tracking-tight"
          >
            <span className="text-amber-200">Discover</span> Rajasthan's Majesty
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-amber-100 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Where royal heritage meets desert adventures in the land of kings
          </motion.p>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: 'spring' }}
            className="text-amber-200 text-5xl animate-pulse"
          >
            <GiElephant />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-12 left-0 right-0 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="text-white text-2xl cursor-pointer"
              onClick={() => document.getElementById('packages').scrollIntoView({ behavior: 'smooth' })}
            >
              <FaChevronDown />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Packages Section */}
      <div id="packages" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-20">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Royal Rajasthan Experiences</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Handpicked packages that showcase the grandeur of Rajasthan
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {['all', 'heritage', 'adventure', 'honeymoon', 'luxury', 'wildlife', 'cultural'].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full text-sm font-medium capitalize transition-all flex items-center ${activeTab === tab 
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'}`}
            >
              {tab === 'all' ? (
                <>
                  <GiCastle className="mr-2" /> All Experiences
                </>
              ) : tab === 'heritage' ? (
                <>
                  <GiCastle className="mr-2" /> Heritage
                </>
              ) : tab === 'adventure' ? (
                <>
                  <GiCamel className="mr-2" /> Adventure
                </>
              ) : tab === 'honeymoon' ? (
                <>
                  <FaHeart className="mr-2" /> Honeymoon
                </>
              ) : tab === 'luxury' ? (
                <>
                  <RiHotelFill className="mr-2" /> Luxury
                </>
              ) : tab === 'wildlife' ? (
                <>
                  <GiElephant className="mr-2" /> Wildlife
                </>
              ) : (
                <>
                  <FaCamera className="mr-2" /> Cultural
                </>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => {
            const isExpanded = expandedPackage === pkg.id;
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Package Card */}
                <motion.div 
                  className={`bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 ${isExpanded ? 'ring-2 ring-amber-500' : ''} ${pkg.color}`}
                  whileHover={{ y: -5 }}
                >
                  {/* Image with Floating Icon */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={pkg.image} 
                      alt={pkg.title} 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-md">
                      {pkg.icon}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-white font-bold text-2xl drop-shadow-md">{pkg.title}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="bg-amber-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                          {pkg.price}
                        </span>
                        <div className="flex items-center text-yellow-300 drop-shadow-md">
                          <FaStar className="mr-1" />
                          <span className="text-white font-medium">{pkg.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center text-gray-500">
                        <GiDesert className="mr-2 text-amber-400" />
                        <span className="text-sm font-medium">{pkg.duration}</span>
                      </div>
                      <button
                        onClick={() => togglePackage(pkg.id)}
                        className="text-amber-600 font-medium hover:text-amber-700 transition-colors flex items-center text-sm"
                      >
                        {isExpanded ? 'Show Less' : 'View Details'} 
                        <FaChevronDown className={`ml-2 text-amber-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 border-t border-amber-100">
                            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                              <GiElephant className="text-amber-500 mr-2" /> Experience Highlights:
                            </h4>
                            <ul className="space-y-3 mb-4">
                              {pkg.highlights.map((highlight, index) => (
                                <motion.li 
                                  key={index} 
                                  className="flex items-start"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                >
                                  <span className="text-amber-500 mr-2 text-lg">•</span>
                                  <span className="text-gray-600">{highlight}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button 
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full mt-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                      onClick={() => openBookingForm(pkg)}
                    >
                      Book This Royal Experience
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* No Packages Message */}
        {filteredPackages.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-amber-500 text-6xl mb-4">
              <GiCastle />
            </div>
            <h3 className="text-2xl font-medium text-gray-700 mb-2">No experiences found in this category</h3>
            <p className="text-gray-500 mb-6">Contact us to customize your perfect Rajasthan journey</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-3 rounded-full font-medium hover:from-amber-700 hover:to-orange-700 transition-all shadow-lg"
            >
              Plan Your Royal Trip
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Gallery Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Rajasthan Through the Lens</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              A visual journey through the vibrant landscapes and rich culture of Rajasthan
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="overflow-hidden rounded-lg shadow-md cursor-pointer group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={image} 
                    alt={`Rajasthan Scenery ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white font-medium">View</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Our Rajasthan Experiences</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We create journeys that immerse you in the authentic Rajasthan
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Royal Connections",
                description: "Exclusive access to heritage properties and royal families",
                icon: <GiCastle className="text-4xl text-amber-500" />
              },
              {
                title: "Desert Specialists",
                description: "Deep knowledge of Thar Desert ecosystems and culture",
                icon: <GiDesert className="text-4xl text-yellow-600" />
              },
              {
                title: "Authentic Encounters",
                description: "Genuine interactions with local artisans and communities",
                icon: <FaCamera className="text-4xl text-blue-500" />
              },
              {
                title: "Luxury Redefined",
                description: "Palace stays with modern amenities and royal treatment",
                icon: <RiHotelFill className="text-4xl text-amber-400" />
              },
              {
                title: "Wildlife Expertise",
                description: "Best spots for tiger sightings and bird watching",
                icon: <GiElephant className="text-4xl text-green-500" />
              },
              {
                title: "Cultural Immersion",
                description: "Hands-on workshops with local artists and performers",
                icon: <FaUmbrellaBeach className="text-4xl text-orange-500" />
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
              >
                <div className="text-4xl mb-6 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready for Your Royal Rajasthan Adventure?</h2>
            <p className="text-amber-100 text-xl mb-8 max-w-2xl mx-auto">
              Let us craft your perfect journey through the land of kings
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-amber-600 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
                onClick={() => document.getElementById('packages').scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Experiences
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Contact Our Experts
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Booking Form Modal */}
      <BookingForm />
    </div>
  );
};

export default Rajasthan;