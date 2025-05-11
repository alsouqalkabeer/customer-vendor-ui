
const Header = () => {
  return (
    <div className="bg-white py-4 px-6 flex justify-between items-center border-b shadow-sm">
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-blue-800">Nosha</h1>
      </div>
      <div className="flex items-center space-x-3">
        <button className="px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">Help</button>
        <button className="px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">Plans</button>
        <button className="px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">Start selling on Nosha</button>
        <button className="px-3 py-2 border border-gray-200 rounded-full text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-all duration-200">Stores in your city</button>
        <button className="px-3 py-2 border border-gray-200 rounded-full text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-all duration-200">Platform category</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-sm transition-all duration-200">Sign Up</button>
        <button className="px-4 py-2 border border-blue-500 rounded-full text-blue-500 hover:bg-blue-50 transition-all duration-200">Start free trial</button>
      </div>
    </div>
  );
};

export default Header;