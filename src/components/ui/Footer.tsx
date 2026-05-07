export const Footer = () => (
  <footer id="contacto" className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-2xl font-bold text-white mb-4">¿Tienes un proyecto en mente?</h2>
      <p className="mb-8">Estamos listos para ayudarte a construir el futuro digital.</p>
      <div className="flex justify-center gap-6 mb-8">
        {/* Aquí irían tus iconos sociales */}
      </div>
      <p className="text-sm">© {new Date().getFullYear()} Bder Template. Todos los derechos reservados.</p>
    </div>
  </footer>
);