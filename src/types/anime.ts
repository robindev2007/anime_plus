export interface TrendingAnimeRes {
  code: number;
  message: string;
  page: Page;
  results: AnimeT[];
}

interface Page {
  currentPage: number;
  hasNextPage: boolean;
  lastPage: number;
  perPage: number;
  total: number;
}

export interface AnimeT {
  averageScore?: number;
  bannerImage?: string;
  coverImage: CoverImage;
  description: string;
  duration?: number;
  episodes?: number;
  format: string;
  genres: string[];
  id: number;
  idMal: number;
  meanScore?: number;
  nextAiringEpisode?: NextAiringEpisode;
  season: string;
  seasonYear: number;
  status: string;
  tags: Tag[];
  title: Title;
  trailer?: Trailer;
}

interface CoverImage {
  color?: string;
  extraLarge: string;
  large: string;
  medium: string;
}

interface NextAiringEpisode {
  airingAt: number;
  episode: number;
  timeUntilAiring: number;
}

interface Tag {
  id: number;
  name: string;
}

interface Title {
  english?: string;
  native: string;
  romaji: string;
  userPreferred: string;
}

interface Trailer {
  id: string;
  site: string;
  thumbnail: string;
}

export interface AnimeInfoResT {
  code: number;
  message: string;
  id: number;
  idMal: number;
  id_provider: IdProvider;
  title: Title;
  dub: boolean;
  description: string;
  coverImage: CoverImage;
  bannerImage: string;
  genres: string[];
  tags: Tag[];
  status: string;
  format: string;
  episodes: number;
  year: number;
  season: string;
  duration: number;
  startIn: StartIn;
  endIn: EndIn;
  nextair: Nextair;
  score: Score;
  popularity: number;
  siteUrl: string;
  trailer: Trailer;
  studios: Studio[];
  relation: Relation[];
}

export interface IdProvider {
  idGogo: string;
  idGogoDub: string;
  idZoro: string;
  idPahe: string;
}

export interface StartIn {
  day: number;
  month: number;
  year: number;
}

export interface EndIn {
  day: string;
  month: string;
  year: string;
}

export interface Nextair {
  airingAt: number;
  episode: number;
  timeUntilAiring: number;
}

export interface Score {
  averageScore: number;
  decimalScore: number;
}

export interface Studio {
  name: string;
}

export interface Relation {
  averageScore: number;
  bannerImage: string;
  coverImage: CoverImage2;
  duration?: number;
  episodes?: number;
  format: string;
  genres: string[];
  id: number;
  idMal: number;
  season?: string;
  status: string;
  tags: Tag2[];
  title: Title2;
  type: string;
}

export interface CoverImage2 {
  color: string;
  large: string;
  medium: string;
}

export interface Tag2 {
  id: number;
  name: string;
}

export interface Title2 {
  english: string;
  native: string;
  romaji: string;
  userPreferred: string;
}

//
export interface AnimeEpisodeRes {
  code: number;
  message: string;
  title: string;
  id: string;
  totalEpisodes: string;
  episodes: Episode[];
}

export interface Episode {
  title: string;
  id: string;
  episode: number;
}

// streams

export interface AnimeStreamRes {
  info: Info;
  stream: Stream;
  iframe: Iframe[];
  plyr: Plyr;
  nspl: Nspl;
}

export interface Info {
  title: string;
  id: string;
  episode: string;
}

export interface Stream {
  multi?: Multi;
  tracks: string;
}

export interface Multi {
  main: Main;
  backup: Backup;
}

export interface Main {
  url: string;
  isM3U8: boolean;
  quality: string;
}

export interface Backup {
  url: string;
  isM3U8: boolean;
  quality: string;
}

export interface Iframe {
  name: string;
  iframe: string;
}

export interface Plyr {
  main: string;
  backup: string;
}

export interface Nspl {
  main: string;
  backup: string;
}

// search results

export interface AnimeSearchResultRes {
  code: number;
  message: string;
  page: SearchResultPage;
  results: Result[];
}

export interface SearchResultPage {
  currentPage: number;
  hasNextPage: boolean;
  lastPage: number;
  perPage: number;
  total: number;
}

export interface Result {
  averageScore?: number;
  bannerImage?: string;
  coverImage: CoverImage;
  episodes?: number;
  format?: string;
  genres: string[];
  id: number;
  idMal: number;
  nextAiringEpisode: string;
  season?: string;
  seasonYear?: number;
  status: string;
  tags: Tag[];
  title: Title;
}
