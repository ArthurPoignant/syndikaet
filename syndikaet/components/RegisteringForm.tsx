import { useState } from 'react';

interface RegisterFormProps {
  onRegister: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const errorMessage = await res.text();
        setError(errorMessage || 'Registration error');
      } else {
        onRegister(); // Call the parent function to handle registration success
      }
    } catch (err) {
      setError('An unexpected error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <h2 className="mb-4 text-lg font-bold">Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <label className="block mb-1" htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1" htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1" htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1" htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <button type="submit" className="w-full bg-black text-white rounded p-2 hover:bg-green-600">Register</button>
    </form>
  );
};

export default RegisterForm;
