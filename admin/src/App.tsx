import { useEffect, useState } from 'react';
import axios from 'axios';

interface Registration {
  id: number;
  userName: string;
  userEmail: string;
  eventId: number;
  eventName: string;
  registeredAt: string;
}

function App() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await axios.get('http://localhost:4000/registrations');
        setRegistrations(response.data);
      } catch (err) {
        setError('Failed to fetch registrations');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

        {loading && <p className="text-gray-600">Loading registrations...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reg.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{reg.userName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.userEmail}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reg.eventId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reg.eventName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(reg.registeredAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {registrations.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      No registrations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
