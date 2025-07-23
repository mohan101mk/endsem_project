export default function AuthLayout({ children }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#fff',
      color: '#1565c0', // blue for text
      fontFamily: 'system-ui, sans-serif',
    }}>
      {children}
    </div>
  );
}
  