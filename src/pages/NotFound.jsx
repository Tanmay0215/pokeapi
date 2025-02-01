import { Link } from 'react-router-dom';
import notfound from '../assets/404.png';

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center">
      <img src={notfound} alt="Pikachu" className="w-32 h-32 mb-4" />
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-xl mb-4">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link to="/" className="text-blue-500 underline">Go back to Home</Link>
    </div>
  );
}

export default NotFound;
