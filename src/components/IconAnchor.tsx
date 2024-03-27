import { AnchorHTMLAttributes } from 'react';
import { Icon } from '@iconify/react';

interface IconAnchorProps {
  icon: string;
  href: string;
  tooltip?: string;
}
export const IconAnchor = ({
  icon,
  href,
  tooltip,
  ...rest
}: IconAnchorProps & AnchorHTMLAttributes<HTMLBaseElement>) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="group relative block rounded  p-2 text-white transition-all hover:bg-gray-700/50 hover:shadow-xl"
      {...rest}
    >
      <Icon icon={icon} className="size-8" />

      {tooltip && (
        <span className="absolute left-full top-0 z-50 -m-2 w-[0%] overflow-clip whitespace-nowrap rounded bg-gray-500 shadow transition-all group-hover:w-[295%] group-hover:p-2">
          {tooltip}
        </span>
      )}
    </a>
  );
};
