import { Typewriter } from './components/Typewriter';
import { IconAnchor } from './components/IconAnchor';
import { useQuery } from './hooks/useQuery';
import { findHiddenLink } from './services/rampService';

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

      <div className="absolute bottom-0 flex w-full justify-center gap-8 p-16">
        <IconAnchor
          icon="fa:refresh"
          tooltip="Re-run Animation"
          href="/"
          target="_self"
        />
        <IconAnchor
          icon="akar-icons:github-fill"
          tooltip="View on GitHub"
          href="https://github.com/devinobrien-css/ctf-dom-challenge/"
        />
        <IconAnchor
          tooltip="View my Portfolio"
          icon="fluent-mdl2:website"
          href="https://devinobrien.netlify.com/"
        />
        <IconAnchor
          tooltip="View my LinkedIn"
          icon="akar-icons:linkedin-fill"
          href="https://www.linkedin.com/in/devinobrien-css/"
        />
      </div>
    </div>
  );
};

export default App;
