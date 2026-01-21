import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ConsultationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConsultationPanel = ({ isOpen, onClose }: ConsultationPanelProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    message: '',
    privacy: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacy) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset after showing success
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', title: '', message: '', privacy: false });
      onClose();
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-[100] h-full w-full sm:w-[520px] bg-background shadow-2xl border-l border-border"

            role="dialog"
            aria-modal="true"
            aria-labelledby="consultation-title"
          >
            <div className="h-full overflow-y-auto p-8 md:p-12">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                aria-label="Zamknij panel"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="max-w-md mx-auto">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="label-accent mb-4 inline-block">Konsultacja</span>
                  <h2 id="consultation-title" className="heading-section mb-4 text-foreground">
                    Porozmawiajmy o Twoim projekcie
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Wypełnij formularz, a odezwę się w ciągu 24-48 godzin z propozycją terminu rozmowy.
                  </p>
                </motion.div>

                {/* Form or Success Message */}
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-4xl">✓</span>
                      </div>
                      <h3 className="heading-card mb-2">Dziękuję!</h3>
                      <p className="text-muted-foreground">Wiadomość została wysłana. Odezwę się wkrótce!</p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: 0.3 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Imię *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                          placeholder="Twoje imię"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          E-mail *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                          placeholder="twoj@email.com"
                        />
                      </div>

                      {/* Title */}
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium mb-2">
                          Tytuł projektu
                        </label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                          placeholder="np. Logo dla kawiarni"
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          Treść wiadomości *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                          placeholder="Opowiedz mi o swoim projekcie..."
                        />
                      </div>

                      {/* Privacy checkbox */}
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="privacy"
                          name="privacy"
                          required
                          checked={formData.privacy}
                          onChange={handleInputChange}
                          className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary/50"
                        />
                        <label htmlFor="privacy" className="text-sm text-muted-foreground">
                          Zapoznałem/am się z{' '}
                          <a href="#" className="text-primary hover:underline">
                            polityką prywatności
                          </a>{' '}
                          i wyrażam zgodę na przetwarzanie moich danych. *
                        </label>
                      </div>

                      {/* Submit button */}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting || !formData.privacy}
                        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                              className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                            />
                            Wysyłanie...
                          </span>
                        ) : (
                          'Wyślij wiadomość'
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConsultationPanel;
