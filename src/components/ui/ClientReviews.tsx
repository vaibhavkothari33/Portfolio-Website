// components/ClientReviews.tsx
'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'Sandeep Sharma',
    company: 'CEO, Titan Technologies',
    feedback:
      'Vaibhav delivered exactly what we needed. Super fast, professional, and went above and beyond our expectations. Would definitely work again!',
  },
  {
    name: 'Priya Malhotra',
    company: 'Founder, FinCraft',
    feedback:
      'From start to finish, the communication and execution were flawless. Our product got a major UX upgrade thanks to Vaibhav’s work.',
  },
  {
    name: 'Raj Mehra',
    company: 'CTO, CodeCore',
    feedback:
      'Incredible dedication and problem-solving skills. Even under tight deadlines, everything was clean and scalable.',
  },
];

export default function ClientReviews() {
  return (
    <section className="bg-neutral-800 py-16 px-4 md:px-10">
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
        Client <span className="text-teal-400">Testimonials</span>
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {reviews.map((review, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="bg-neutral-700 rounded-2xl p-6 shadow-xl hover:shadow-teal-500/20 transition-all duration-300 border border-neutral-600"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-neutral-300 text-sm leading-relaxed mb-6">
              "{review.feedback}"
            </p>
            <div className="text-white font-semibold">{review.name}</div>
            <div className="text-sm text-neutral-400">{review.company}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
