import { Typewriter } from './components/Typewriter';
import { useQuery } from './hooks/useQuery';
import { findHiddenLink } from './services/rampService';
import { Advertisement } from './components/Advertisement';

const App = () => {
  const { data, error, loading } = useQuery({ fetchFunction: findHiddenLink });

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-800">
      {loading ? (
        <div className="m-auto text-center text-4xl font-bold text-white">
          <div className="animate-pulse">Loading...</div>
        </div>
      ) : (
        <Typewriter
          text={data}
          className="font-cursive m-auto text-7xl text-white"
        />
      )}

      {error && (
        <div className="m-auto text-center text-4xl font-bold text-red-300">
          <div>An unknown error occurred.</div>
        </div>
      )}

      <Advertisement />
    </div>
  );
};

export default App;
