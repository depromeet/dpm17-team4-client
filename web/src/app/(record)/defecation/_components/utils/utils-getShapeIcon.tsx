import Image from 'next/image';
import Banana_IILUST from '@/assets/defecation/Illust/Banana.png';
import Corn_IILUST from '@/assets/defecation/Illust/Corn.png';
import Cream_IILUST from '@/assets/defecation/Illust/Cream.png';
import Porridge_IILUST from '@/assets/defecation/Illust/Porridge.png';
import Rabbit_IILUST from '@/assets/defecation/Illust/Rabbit.png';
import Water_IILUST from '@/assets/defecation/Illust/Water.png';
import Banana_EMOJI from '@/assets/defecation/Real/Banana.png';
import Corn_EMOJI from '@/assets/defecation/Real/Corn.png';
import Cream_EMOJI from '@/assets/defecation/Real/Cream.png';
import Porridge_EMOJI from '@/assets/defecation/Real/Porridge.png';
import Rabbit_EMOJI from '@/assets/defecation/Real/Rabbit.png';
import Water_EMOJI from '@/assets/defecation/Real/Water.png';
import type { DefecationTryShapeKey } from '../types';

const getRealShapeIcon = (
  shape: DefecationTryShapeKey,
  width: number = 36,
  height: number = 36
) => {
  switch (shape) {
    case 'RABBIT':
      return (
        <Image src={Rabbit_EMOJI} alt="rabbit" width={width} height={height} />
      );
    case 'ROCK':
      return (
        <Image src={Water_EMOJI} alt="water" width={width} height={height} />
      );
    case 'CORN':
      return (
        <Image src={Corn_EMOJI} alt="corn" width={width} height={height} />
      );
    case 'BANANA':
      return (
        <Image src={Banana_EMOJI} alt="banana" width={width} height={height} />
      );
    case 'CREAM':
      return (
        <Image src={Cream_EMOJI} alt="cream" width={width} height={height} />
      );
    case 'PORRIDGE':
      return (
        <Image
          src={Porridge_EMOJI}
          alt="porridge"
          width={width}
          height={height}
        />
      );
    default:
      return null;
  }
};

const getEmojiShapeIcon = (
  shape: DefecationTryShapeKey,
  width: number = 36,
  height: number = 36
) => {
  switch (shape) {
    case 'RABBIT':
      return (
        <Image src={Rabbit_IILUST} alt="rabbit" width={width} height={height} />
      );
    case 'ROCK':
      return (
        <Image src={Water_IILUST} alt="water" width={width} height={height} />
      );
    case 'CORN':
      return (
        <Image src={Corn_IILUST} alt="corn" width={width} height={height} />
      );
    case 'BANANA':
      return (
        <Image src={Banana_IILUST} alt="banana" width={width} height={height} />
      );
    case 'CREAM':
      return (
        <Image src={Cream_IILUST} alt="cream" width={width} height={height} />
      );
    case 'PORRIDGE':
      return (
        <Image
          src={Porridge_IILUST}
          alt="porridge"
          width={width}
          height={height}
        />
      );
    default:
      return null;
  }
};

export { getRealShapeIcon, getEmojiShapeIcon };
