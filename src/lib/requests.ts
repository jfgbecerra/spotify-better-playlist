import {
    Album,
    Artist,
    AuthSession,
    Category,
    Playlist,
    Track,
    TrackAnalysis,
} from '@/types/types';
import { customGet } from '@/utils/serverUtils';

export const getUserPlaylists = async (
session: AuthSession
): Promise<Album[]> => {
return customGet(
    'https://api.spotify.com/v1/me/playlists',
    session
).then((resp) => resp);
};
