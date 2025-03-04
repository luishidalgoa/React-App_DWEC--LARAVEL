import React, { useState } from 'react';

interface DropdownProps {
  align?: 'left' | 'right' | 'top' | 'none' | 'false';
  width?: '48' | '60' | string;
  contentClasses?: string;
  dropdownClasses?: string;
  trigger: React.ReactNode;
  content: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({
  align = 'right',
  width = '48',
  contentClasses = 'py-1 bg-white',
  dropdownClasses = '',
  trigger,
  content,
}) => {
  const [open, setOpen] = useState(false);

  const alignmentClasses = align === 'left'
    ? 'ltr:origin-top-left rtl:origin-top-right start-0'
    : align === 'top'
    ? 'origin-top'
    : align === 'none' || align === 'false'
    ? ''
    : 'ltr:origin-top-right rtl:origin-top-left end-0';

  const widthClass = width === '48' ? 'w-48' : width === '60' ? 'w-60' : 'w-48';

  return (
    <div className="relative" onClick={() => setOpen(!open)}>
      <div>
        {trigger}
      </div>

      {open && (
        <div
          className={`absolute z-50 mt-2 ${widthClass} rounded-md shadow-lg ${alignmentClasses} ${dropdownClasses}`}
          style={{ display: open ? 'block' : 'none' }}
          onClick={() => setOpen(false)}
        >
          <div className={`rounded-md ring-1 ring-black ring-opacity-5 ${contentClasses}`}>
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;