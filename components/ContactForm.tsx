'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiCheck, FiAlertCircle, FiUser, FiMail, FiPhone, FiGlobe, FiMessageSquare } from 'react-icons/fi';

interface ContactFormProps {
  compact?: boolean;
}

export default function ContactForm({ compact = false }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const countries = [
    'New Zealand',
    'United Kingdom',
    'Dubai',
    'Malta',
    'USA',
    'Germany',
    'Singapore',
    'Kararsızım',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', country: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const inputClasses = (fieldName: string) => {
    const isFocused = focusedField === fieldName;
    return `w-full px-5 py-4 pl-12 rounded-xl border-2 ${isFocused ? 'border-primary bg-white shadow-lg shadow-primary/10' : 'border-gray-200 bg-gray-50/50'} focus:border-primary focus:bg-white focus:shadow-lg focus:shadow-primary/10 outline-none transition-all duration-300 text-foreground placeholder:text-gray-400`;
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className={`relative bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10 ${compact ? '' : 'max-w-2xl mx-auto'}`}
    >
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-primary-light to-secondary rounded-t-3xl" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Name Field */}
        <div className="relative">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            Ad Soyad <span className="text-primary">*</span>
          </label>
          <div className="relative">
            <FiUser className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedField === 'name' ? 'text-primary' : 'text-gray-400'}`} />
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              className={inputClasses('name')}
              placeholder="Adınız ve soyadınız"
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="relative">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            E-posta <span className="text-primary">*</span>
          </label>
          <div className="relative">
            <FiMail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedField === 'email' ? 'text-primary' : 'text-gray-400'}`} />
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              className={inputClasses('email')}
              placeholder="ornek@email.com"
            />
          </div>
        </div>

        {/* Phone Field */}
        <div className="relative">
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
            Telefon <span className="text-primary">*</span>
          </label>
          <div className="relative">
            <FiPhone className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedField === 'phone' ? 'text-primary' : 'text-gray-400'}`} />
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              onFocus={() => setFocusedField('phone')}
              onBlur={() => setFocusedField(null)}
              className={inputClasses('phone')}
              placeholder="+90 5XX XXX XX XX"
            />
          </div>
        </div>

        {/* Country Field */}
        <div className="relative">
          <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-2">
            Tercih Ettiğiniz Ülke <span className="text-primary">*</span>
          </label>
          <div className="relative">
            <FiGlobe className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedField === 'country' ? 'text-primary' : 'text-gray-400'}`} />
            <select
              id="country"
              name="country"
              required
              value={formData.country}
              onChange={handleChange}
              onFocus={() => setFocusedField('country')}
              onBlur={() => setFocusedField(null)}
              className={`${inputClasses('country')} appearance-none cursor-pointer`}
            >
              <option value="">Seçiniz...</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Message Field */}
        <div className="md:col-span-2">
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
            Mesajınız / Eğitim Planınız <span className="text-primary">*</span>
          </label>
          <div className="relative">
            <FiMessageSquare className={`absolute left-4 top-4 w-5 h-5 transition-colors duration-300 ${focusedField === 'message' ? 'text-primary' : 'text-gray-400'}`} />
            <textarea
              id="message"
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              rows={5}
              className={`${inputClasses('message')} pt-4 pl-12 resize-none`}
              placeholder="Eğitim hedefleriniz ve planlarınız hakkında bize bilgi verin..."
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8">
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          className={`w-full py-4 px-8 rounded-xl font-semibold text-white
            bg-gradient-to-r from-primary to-primary-light
            cursor-pointer
            shadow-lg shadow-primary/30
            hover:shadow-xl hover:shadow-primary/40
            disabled:opacity-70 disabled:cursor-not-allowed
            transition-all duration-300
            flex items-center justify-center gap-3
          `}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Gönderiliyor...</span>
            </>
          ) : (
            <>
              <span>Gönder ve Dönüş Al</span>
              <FiSend className="w-5 h-5" />
            </>
          )}
        </motion.button>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
          >
            <div className="p-2 bg-green-500 rounded-full">
              <FiCheck className="w-4 h-4 text-white" />
            </div>
            <p className="text-green-700 font-medium">
              Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
            </p>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
          >
            <div className="p-2 bg-red-500 rounded-full">
              <FiAlertCircle className="w-4 h-4 text-white" />
            </div>
            <p className="text-red-700 font-medium">
              Bir hata oluştu. Lütfen tekrar deneyin veya doğrudan iletişim bilgilerimizden ulaşın.
            </p>
          </motion.div>
        )}
      </div>
    </motion.form>
  );
}
