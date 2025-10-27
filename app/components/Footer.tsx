// app/components/Footer.tsx
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-gray-800 text-gray-300 py-6 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {currentYear} PaisaTools. All rights reserved.</p>
        <p className="text-sm mt-2">
          Disclaimer: All calculations are estimates. Please consult a financial advisor.
        </p>
      </div>
    </footer>
  );
};

export default Footer;