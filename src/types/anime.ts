export interface Episodes {
  sub: number;
  dub?: number;
}

export interface HomePageAnimeRes {
  spotlightAnimes: SpotlightAnime[];
  trendingAnimes: TrendingAnime[];
  latestEpisodeAnimes: LatestEpisodeAnime[];
  topUpcomingAnimes: TopUpcomingAnime[];
  top10Animes: Top10Animes;
  topAiringAnimes: TopAiringAnime[];
  mostPopularAnimes: MostPopularAnime[];
  mostFavoriteAnimes: MostFavoriteAnime[];
  latestCompletedAnimes: LatestCompletedAnime[];
  genres: string[];
}

export interface SpotlightAnime {
  rank: number;
  id: string;
  name: string;
  description: string;
  poster: string;
  jname: string;
  episodes: Episodes;
  type: string;
  otherInfo: string[];
}

export interface TrendingAnime {
  rank: number;
  id: string;
  name: string;
  jname: string;
  poster: string;
}

export interface LatestEpisodeAnime {
  id: string;
  name: string;
  jname: string;
  poster: string;
  duration: string;
  type: string;
  rating: unknown;
  episodes: Episodes;
}

export interface TopUpcomingAnime {
  id: string;
  name: string;
  jname: string;
  poster: string;
  duration: string;
  type: string;
  rating?: string;
  episodes: TopUpcomingAnimeEpisodes;
}

export interface TopUpcomingAnimeEpisodes {
  sub: unknown;
  dub: unknown;
}

export interface Top10Animes {
  today: Today[];
  week: Week[];
  month: Month[];
}

export interface Today {
  id: string;
  rank: number;
  name: string;
  jname: string;
  poster: string;
  episodes: Episodes;
}

export interface Week {
  id: string;
  rank: number;
  name: string;
  jname: string;
  poster: string;
  episodes: Episodes;
}

export interface Month {
  id: string;
  rank: number;
  name: string;
  jname: string;
  poster: string;
  episodes: Episodes;
}

export interface TopAiringAnime {
  id: string;
  name: string;
  jname: string;
  poster: string;
  episodes: Episodes;
  type: string;
}

export interface MostPopularAnime {
  id: string;
  name: string;
  jname: string;
  poster: string;
  episodes: MostPopularAnimeEpisodes;
  type: string;
}

export interface MostPopularAnimeEpisodes {
  sub: number;
  dub: number;
}

export interface MostFavoriteAnime {
  id: string;
  name: string;
  jname: string;
  poster: string;
  episodes: Episodes;
  type: string;
}

export interface LatestCompletedAnime {
  id: string;
  name: string;
  jname: string;
  poster: string;
  episodes: Episodes;
  type: string;
}

// aaa
export interface AnimeInfoRes {
  success: boolean;
  data: AnimeInfo;
}

export interface AnimeInfo {
  anime: Anime;
  seasons: Season[];
  mostPopularAnimes: MostPopularAnime[];
  relatedAnimes: RelatedAnime[];
  recommendedAnimes: RecommendedAnime[];
}

export interface Anime {
  info: Info;
  moreInfo: MoreInfo;
}

export interface Info {
  id: string;
  anilistId: number;
  malId: number;
  name: string;
  poster: string;
  description: string;
  stats: Stats;
  promotionalVideos: PromotionalVideo[];
  charactersVoiceActors: CharactersVoiceActor[];
}

export interface Stats {
  rating: string;
  quality: string;
  episodes: Episodes;
  type: string;
  duration: string;
}

export interface PromotionalVideo {
  title: string;
  source: string;
  thumbnail: string;
}

export interface CharactersVoiceActor {
  character: Character;
  voiceActor: VoiceActor;
}

export interface Character {
  id: string;
  poster: string;
  name: string;
  cast: string;
}

export interface VoiceActor {
  id: string;
  poster: string;
  name: string;
  cast: string;
}

export interface MoreInfo {
  japanese: string;
  aired: string;
  premiered: string;
  duration: string;
  status: string;
  malscore: string;
  genres: string[];
  studios: string;
  producers: string[];
}

export interface Season {
  id: string;
  name: string;
  title: string;
  poster: string;
  isCurrent: boolean;
}

export interface MostPopularAnime {
  id: string;
  name: string;
  jname: string;
  poster: string;
  episodes: MostPopularAnimeEpisode;
  type: string;
}

export interface MostPopularAnimeEpisode {
  sub: number;
  dub: number;
}

export interface RelatedAnime {
  id: string;
  name: string;
  jname: string;
  poster: string;
  episodes: Episodes;
  type: string;
}

export interface RecommendedAnime {
  id: string;
  name: string;
  jname: string;
  poster: string;
  duration: string;
  type: string;
  rating?: string;
  episodes: Episodes;
}

export interface AnimeEpisodesRes {
  success: boolean;
  data: AnimeEpisodes;
}

export interface AnimeEpisodes {
  totalEpisodes: number;
  episodes: Episode[];
}

export interface Episode {
  title: string;
  episodeId: string;
  number: number;
  isFiller: boolean;
}

// streams
export type AnimeStreamRes = {
  streams: {
    title: string;
    data: {
      name: string;
      sources: Source[];
    }[];
  }[];
  intro: Intro | undefined;
  outro: Outro | undefined;
  subtitles: Subtitle[];
};

export interface Intro {
  start: number;
  end: number;
}

export interface Outro {
  start: number;
  end: number;
}

export interface Source {
  url: string;
  isM3U8: boolean;
  type: string;
}

export interface Subtitle {
  url: string;
  lang: string;
}

// Search suggestions

export interface AnimeSearchSuggestionRes {
  success: boolean;
  data: AnimeSearchData;
}

export interface AnimeSearchData {
  suggestions: SearchSuggestion[];
}

export interface SearchSuggestion {
  id: string;
  name: string;
  jname: string;
  poster: string;
  moreInfo: string[];
}

// Search data
export interface AnimeSearchRes {
  success: boolean;
  data: AnimeSearchData;
}

export interface AnimeSearchData {
  animes: AnimeSearchAnime[];
  mostPopularAnimes: MostPopularAnime[];
  searchQuery: string;
  searchFilters: unknown;
  totalPages: number;
  hasNextPage: boolean;
  currentPage: number;
}

export interface AnimeSearchAnime {
  id: string;
  name: string;
  jname: string;
  poster: string;
  duration: string;
  type: string;
  rating?: string;
  episodes: Episodes;
}
