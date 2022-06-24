import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { trpc } from './trpc';

const client = new QueryClient();

const AppContent = () => {
  const getMessages = trpc.useQuery(['getMessages']);

  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');
  const addMessage = trpc.useMutation('addMessage');
  const onAdd = () => {
    addMessage.mutate(
      {
        message,
        user,
      },
      {
        onSuccess: () => {
          client.invalidateQueries(['getMessages']);
        },
      }
    );
  };

  return (
    <div>
      <div>
        {(getMessages.data ?? []).map((row) => (
          <div key={row.message}>{JSON.stringify(row)}</div>
        ))}
      </div>

      <div>
        <input type='text' value={user} onChange={(e) => setUser(e.target.value)} placeholder='User' />
        <input type='text' value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Message' />
      </div>

      <button onClick={onAdd}>Add message</button>
    </div>
  );
};

const App = () => {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: 'http://localhost:8080/trpc',
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={client}>
      <QueryClientProvider client={client}>
        <AppContent />
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;