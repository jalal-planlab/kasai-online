import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { WHATSAPP_NUMBER } from '../lib/constants'

export function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
      <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-pulse opacity-50 scale-125" />
      <MessageCircle className="relative h-7 w-7" />
    </motion.a>
  )
}
