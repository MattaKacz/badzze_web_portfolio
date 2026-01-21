import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../ui/button';
import { Loader2, Send } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, { message: "Imię musi mieć co najmniej 2 znaki." }),
  email: z.string().email({ message: "Nieprawidłowy adres email." }),
  message: z.string().min(10, { message: "Wiadomość musi mieć co najmniej 10 znaków." }),
  // Honeypot field - should be empty
  _gotcha: z.string().max(0).optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
  };

  if (isSuccess) {
    return (
      <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8 bg-black text-white border-2 border-white animate-in fade-in duration-500">
        <div className="text-6xl mb-6">🖤</div>
        <h3 className="text-3xl md:text-5xl font-black font-display uppercase text-center mb-4">
          Wiadomość wysłana!
        </h3>
        <p className="text-xl text-center text-gray-400 mb-8 max-w-md">
          Dzięki za kontakt. Odezwę się, jak tylko skończę pić kawę.
        </p>
        <Button 
          variant="outline" 
          onClick={() => setIsSuccess(false)}
          className="uppercase font-bold tracking-widest bg-transparent text-white border-white hover:bg-white hover:text-black"
        >
          Wyślij kolejną
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full max-w-xl mx-auto">
      {/* Honeypot */}
      <input type="text" {...register("_gotcha")} className="hidden" />

      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
          Imię / Firma
        </label>
        <input
          id="name"
          {...register("name")}
          className="flex h-12 w-full rounded-none border-b-2 border-input bg-transparent px-3 py-1 text-lg shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Jan Kowalski"
        />
        {errors.name && (
          <p className="text-sm font-medium text-destructive animate-in slide-in-from-top-1">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="flex h-12 w-full rounded-none border-b-2 border-input bg-transparent px-3 py-1 text-lg shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="jan@example.com"
        />
        {errors.email && (
          <p className="text-sm font-medium text-destructive animate-in slide-in-from-top-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
          Wiadomość
        </label>
        <textarea
          id="message"
          {...register("message")}
          className="flex min-h-[150px] w-full rounded-none border-2 border-input bg-transparent px-3 py-2 text-lg shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 resize-y"
          placeholder="Cześć, mam projekt..."
        />
        {errors.message && (
          <p className="text-sm font-medium text-destructive animate-in slide-in-from-top-1">
            {errors.message.message}
          </p>
        )}
      </div>

      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full h-14 rounded-none uppercase font-black tracking-[0.2em] text-lg bg-foreground text-background hover:bg-foreground/90 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Wysyłanie...
          </>
        ) : (
          <>
            Wyślij Wiadomość <Send className="ml-2 h-5 w-5" />
          </>
        )}
      </Button>
    </form>
  );
};
