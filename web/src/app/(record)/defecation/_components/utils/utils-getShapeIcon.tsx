import Image from 'next/image';
import type { DefecationTryShapeKey } from '../types';
import Banana_IILUST from '@/assets/defecation/Illust/Banana.png'
import Cream_IILUST from '@/assets/defecation/Illust/Cream.png'
import Corn_IILUST from '@/assets/defecation/Illust/Corn.png'
import Porridge_IILUST from '@/assets/defecation/Illust/Porridge.png'
import Rabbit_IILUST from '@/assets/defecation/Illust/Rabbit.png'
import Water_IILUST from '@/assets/defecation/Illust/Water.png'

import Banana_EMOJI from '@/assets/defecation/Real/Banana.png'
import Cream_EMOJI from '@/assets/defecation/Real/Cream.png'
import Corn_EMOJI from '@/assets/defecation/Real/Corn.png'
import Porridge_EMOJI from '@/assets/defecation/Real/Porridge.png'
import Rabbit_EMOJI from '@/assets/defecation/Real/Rabbit.png'
import Water_EMOJI from '@/assets/defecation/Real/Water.png'

const getRealShapeIcon = (shape: DefecationTryShapeKey) => {
  switch (shape) {
    case 'RABBIT':
      return <Image src={Rabbit_EMOJI} alt="rabbit" width={36} height={36} />;
    case 'ROCK':
      return <Image src={Water_EMOJI} alt="water" width={36} height={36} />;
    case 'CORN':
      return <Image src={Corn_EMOJI} alt="corn" width={36} height={36} />;
    case 'BANANA':
      return <Image src={Banana_EMOJI} alt="banana" width={36} height={36} />;
    case 'CREAM':
      return <Image src={Cream_EMOJI} alt="cream" width={36} height={36} />;
    case 'PORRIDGE':
      return <Image src={Porridge_EMOJI} alt="porridge" width={36} height={36} />;
    default:
      return null;
  }
};

const getEmojiShapeIcon = (shape: DefecationTryShapeKey) => {
  switch (shape) {
    case 'RABBIT':
      return <Image src={Rabbit_IILUST} alt="rabbit" width={36} height={36} />;
    case 'ROCK':
      return <Image src={Water_IILUST} alt="water" width={36} height={36} />;
    case 'CORN':
      return <Image src={Corn_IILUST} alt="corn" width={36} height={36} />;
    case 'BANANA':
      return <Image src={Banana_IILUST} alt="banana" width={36} height={36} />;
    case 'CREAM':
      return <Image src={Cream_IILUST} alt="cream" width={36} height={36} />;
    case 'PORRIDGE':
      return <Image src={Porridge_IILUST} alt="porridge" width={36} height={36} />;
    default:
      return null;
  }
};

export { getRealShapeIcon, getEmojiShapeIcon };


