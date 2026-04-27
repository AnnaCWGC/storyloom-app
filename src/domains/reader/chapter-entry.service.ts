import { env } from '@/config/env';
import { apiClient } from '@/services/apiClient';

import { ChapterEntryDTO } from './reader.types';

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const chapterEntryService = {
  async registerChapterEntry(
    payload: ChapterEntryDTO,
  ): Promise<ChapterEntryDTO> {
    if (env.USE_MOCKS) {
      await delay(120);
      return payload;
    }

    return apiClient<ChapterEntryDTO>('/chapter-entry', {
      method: 'POST',
      body: payload,
    });
  },
};
