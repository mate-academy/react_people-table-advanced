import { SexFilterType } from '../enums/SexFilterType';

export const getSexFilterType = (type: string): SexFilterType => {
  switch (type) {
    case SexFilterType.Male:
      return SexFilterType.Male;
    case SexFilterType.Female:
      return SexFilterType.Female;
    case SexFilterType.All:
    default:
      return SexFilterType.All;
  }
};
