import { SetMetadata } from '@nestjs/common';

/** 自身のデータのみを操作可能とすることを示すデコレータ */
export const Self = (...args: string[]) => SetMetadata('self', true);
