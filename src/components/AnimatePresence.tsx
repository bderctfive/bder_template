"use client"; // Crucial: Framer Motion requiere componentes de cliente
import { motion, HTMLMotionProps } from "framer-motion";

interface Props extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

export const FadeIn = ({ children, ...props }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    {...props}
  >
    {children}
  </motion.div>
);