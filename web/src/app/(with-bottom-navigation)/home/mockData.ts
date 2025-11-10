import type { StaticImageData } from 'next/image';
import bgBad from '@/assets/home/bg_bad.png';
import bgGood from '@/assets/home/bg_good.png';
import bgNormal from '@/assets/home/bg_normal.png';
import bgVeryBad from '@/assets/home/bg_very_bad.png';
import bgVeryGood from '@/assets/home/bg_very_good.png';

interface HomeMockDataType {
  backgroundImageUrl: {
    veryBad: StaticImageData;
    bad: StaticImageData;
    normal: StaticImageData;
    good: StaticImageData;
    veryGood: StaticImageData;
  };
}

const HOMEMOCKDATA: HomeMockDataType = {
  backgroundImageUrl: {
    veryBad: bgVeryBad,
    bad: bgBad,
    normal: bgNormal,
    good: bgGood,
    veryGood: bgVeryGood,
  },
};
