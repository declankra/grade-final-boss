export default function Footer() {
    return (
      <footer className="w-full py-6 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Grade Final Boss
            </p>
            <a 
              href="https://declankramper.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              Created by Declan Kramper
            </a>
          </div>
        </div>
      </footer>
    );
  } 