'use client';

import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-2xl font-semibold mb-4">Sign in to AI Resume</h1>
        <p className="mb-6 text-gray-600">Click below to sign in with GitHub</p>

        <button
          onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
}
