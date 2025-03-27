export default function Footer() {
    return (
      <footer className="text-sm font-sans text-gray-700 hover:text-red-700 text-center p-4">
        <p>© {(new Date().getFullYear())}</p>
      </footer>
    );
   }