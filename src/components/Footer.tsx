export default function Footer() {
  return (
    <footer className="border-t">
      <div className="max-w-4xl mx-auto px-8 py-4">
        <div className="flex items-center justify-center space-x-2 text-gray-600">
          <span>Made by</span>
          <a 
            href="https://github.com/SuyashGoylit" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-semibold hover:text-gray-900 transition-colors"
          >
            Suyash Goylit
          </a>
        </div>
      </div>
    </footer>
  );
} 