import { IconAnchor } from './IconAnchor';

export const Advertisement = () => {
  return (
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
  );
};
