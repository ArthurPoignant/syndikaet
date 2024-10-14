import { useState } from 'react';

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        if (data.message) {
          setError(data.message);
        } else {
          setError('Invalid credentials');
        }
      } else if (data.token) {
        // Store the token in localStorage or a secure cookie
        localStorage.setItem('authToken', data.token);
        onLogin();
      } else {
        setError('Login successful, but no token received');
      }

      if (!res.ok) {
        setError('Invalid credentials');
      } else {
        onLogin();
      }
    } catch (err) {
      console.error(err)
      console.log(err)
      setError('An unexpected error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <h2 className="mb-4 text-lg font-bold">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <label className="block mb-1" htmlFor="loginEmail">Email</label>
        <input
          type="email"
          id="loginEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1" htmlFor="loginPassword">Password</label>
        <input
          type="password"
          id="loginPassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <button type="submit" className="w-full bg-black text-white rounded p-2 hover:bg-blue-600">Login</button>
    </form>
  );
};

export default LoginForm;
