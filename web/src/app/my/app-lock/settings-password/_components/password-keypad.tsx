import { ArrowIcon } from '@/components';

interface PasswordKeypadProps {
  onAddNumber: (number: string) => void;
  onDeleteNumber: () => void;
}

const KEYPAD_BUTTONS = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'empty',
  '0',
  'delete',
] as const;

const PasswordKeypad = ({
  onAddNumber,
  onDeleteNumber,
}: PasswordKeypadProps) => {
  const handleKeyClick = (value: string) => {
    if (value === 'delete') {
      onDeleteNumber();
    } else if (value === 'empty') {
      return;
    } else {
      onAddNumber(value);
    }
  };

  return (
    <section className="flex-1/2 flex">
      <ul
        className="flex-1 grid w-full
          grid-cols-3
          grid-rows-4
          gap-x-7 gap-y-5"
      >
        {KEYPAD_BUTTONS.map((value) => (
          <li key={value} className="w-full h-full min-h-0">
            <button
              type="button"
              className={`
                w-full h-full flex justify-center items-center text-h3 
                ${value === 'empty' ? 'invisible' : 'cursor-pointer active:opacity-70'}
              `}
              onClick={() => handleKeyClick(value)}
            >
              {value === 'delete' ? (
                <ArrowIcon type="left" />
              ) : value === 'empty' ? null : (
                value
              )}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default PasswordKeypad;
