"use client";

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export default function FirebaseTest() {
  const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const testConnection = async () => {
    setStatus('testing');
    setMessage('Testing Firebase connection...');
    
    try {
      // Test write operation
      const testData = {
        test: true,
        timestamp: new Date(),
        message: 'Firebase connection test'
      };
      
      console.log('Attempting to write test data:', testData);
      const docRef = await addDoc(collection(db, 'connection_tests'), testData);
      console.log('Write successful, document ID:', docRef.id);
      
      // Test read operation
      console.log('Attempting to read test data...');
      const querySnapshot = await getDocs(collection(db, 'connection_tests'));
      const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Read successful, documents:', documents);
      
      setStatus('success');
      setMessage(`Firebase connection successful! Document ID: ${docRef.id}`);
      
    } catch (error: any) {
      console.error('Firebase test error:', error);
      setStatus('error');
      setMessage(`Error: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h2 className="text-lg font-semibold mb-2">Firebase Connection Test</h2>
      <button
        onClick={testConnection}
        disabled={status === 'testing'}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {status === 'testing' ? 'Testing...' : 'Test Connection'}
      </button>
      
      {message && (
        <div className={`mt-3 p-2 rounded ${
          status === 'success' ? 'bg-green-100 text-green-800' :
          status === 'error' ? 'bg-red-100 text-red-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {message}
        </div>
      )}
      
      <div className="mt-3 text-sm text-gray-600">
        <p>Check browser console for detailed logs.</p>
        <p>Make sure Firestore is enabled in your Firebase project.</p>
      </div>
    </div>
  );
}