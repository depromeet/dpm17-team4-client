import { Image, Sticker } from 'lucide-react';
import type { DefecationTryShapeKey } from '../types';

const getRealShapeIcon = (shape: DefecationTryShapeKey) => {
  switch (shape) {
    case 'RABBIT':
      return <Image />;
    case 'STONE':
      return <Image />;
    case 'CORN':
      return <Image />;
    case 'BANANA':
      return <Image />;
    case 'CREAM':
      return <Image />;
    case 'PORRIDGE':
      return <Image />;
    default:
      return null;
  }
};

const getEmojiShapeIcon = (shape: DefecationTryShapeKey) => {
  switch (shape) {
    case 'RABBIT':
      return <Sticker />;
    case 'STONE':
      return <Sticker />;
    case 'CORN':
      return <Sticker />;
    case 'BANANA':
      return <Sticker />;
    case 'CREAM':
      return <Sticker />;
    case 'PORRIDGE':
      return <Sticker />;
    default:
      return null;
  }
};

export { getRealShapeIcon, getEmojiShapeIcon };
