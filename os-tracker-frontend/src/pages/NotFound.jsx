import { Link } from 'react-router-dom';
import Icons from '../components/Icons';

/**
 * NotFound page displayed for any URL that doesn't match a defined route.
 * Provides a clear message and a link back to the home page.
 */
function NotFound() {
  return (
    <div className="container" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '6rem', fontWeight: '800', opacity: 0.15, lineHeight: 1 }}>404</h1>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-muted, #888)', marginBottom: '2rem', maxWidth: '420px' }}>
        The page you're looking for doesn't exist or has been moved.
        Let's get you back to exploring developer footprints.
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 2rem',
          borderRadius: '8px',
          background: 'var(--accent-primary, #e05d44)',
          color: '#fff',
          textDecoration: 'none',
          fontSize: '1rem',
          fontWeight: '600',
          transition: 'transform 0.2s ease'
        }}
      >
        <Icons.Code /> Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
