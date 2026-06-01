export default function Custom404() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md mx-auto px-6 text-center">
        {/* 404 */}
        <h1 className="text-8xl font-light text-gray-900 mb-4">404</h1>

        {/* Message */}
        <h2 className="text-2xl font-normal text-gray-700 mb-3">
          Page Not Found
        </h2>

        <p className="text-gray-500 mb-8">
          The page you're looking for doesn't exist.
        </p>

        {/* Action */}
        <a
          href="/"
          className="inline-block px-6 py-2.5 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
