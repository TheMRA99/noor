export type RootTabParamList = {
  HomeTab: undefined;
  QuranTab: undefined;
  HadithTab: undefined;
  StoriesTab: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  Bookmarks: undefined;
};

export type QuranStackParamList = {
  SurahList: undefined;
  Reader: {
    chapterId: number;
    chapterNameSimple: string;
    chapterNameArabic: string;
    initialAyah?: number;
  };
};

export type HadithStackParamList = {
  HadithHome: undefined;
};

export type StoriesStackParamList = {
  StoriesHome: undefined;
};
