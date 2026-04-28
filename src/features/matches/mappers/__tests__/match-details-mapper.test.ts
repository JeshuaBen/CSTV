import { mapMatchDetailDtoToModel } from '../match-details-mapper';

describe('match details mapper', () => {
  const match = {
    id: 10,
    status: 'running',
    begin_at: '2026-04-27T10:00:00Z',
    scheduled_at: '',
    number_of_games: 3,
    tournament: {
      id: 99,
      name: 'Tournament',
    },
    league: {
      name: 'CBLOL',
      image_url: '',
    },
    serie: {
      name: 'Split 1',
    },
    opponents: [
      {
        opponent: {
          id: 1,
          name: 'FURIA',
          image_url: '',
          players: [
            {
              id: 11,
              name: '',
              first_name: 'Fallback',
              last_name: 'Player',
              image_url: '',
            },
          ],
        },
      },
      {
        opponent: {
          id: 2,
          name: '',
          image_url: null,
          players: [],
        },
      },
    ],
  };

  it('maps match details while keeping current fallback values', () => {
    const detail = mapMatchDetailDtoToModel(match);

    expect(detail).toEqual(
      expect.objectContaining({
        id: 10,
        tournamentId: 99,
        status: 'running',
        statusLabel: 'In Progress',
        leagueName: 'CBLOL',
        leagueImageUrl: null,
        serieName: 'Split 1',
        beginAt: '2026-04-27T10:00:00Z',
        scheduledAt: null,
        numberOfGames: 3,
      }),
    );
    expect(detail.opponents[0]?.players[0]).toEqual({
      id: 11,
      name: 'Fallback Player',
      nickname: 'Unknown',
      imageUrl: null,
    });
    expect(detail.opponents[1]).toEqual({
      id: 2,
      name: 'TBD',
      imageUrl: null,
      players: [],
    });
  });

  it('uses tournament roster players when they are available', () => {
    const detail = mapMatchDetailDtoToModel(match, {
      rosters: [
        {
          id: 1,
          name: 'FURIA',
          image_url: null,
          players: [
            {
              id: 21,
              name: 'Roster Nick',
              first_name: 'Roster',
              last_name: 'Name',
              image_url: 'https://example.com/player.png',
            },
          ],
        },
      ],
    });

    expect(detail.opponents[0]?.players).toEqual([
      {
        id: 21,
        name: 'Roster Nick',
        nickname: 'Roster Nick',
        imageUrl: 'https://example.com/player.png',
      },
    ]);
  });

  it('keeps match players when roster players are missing', () => {
    const detail = mapMatchDetailDtoToModel(match, {
      rosters: [
        {
          id: 1,
          name: 'FURIA',
          image_url: null,
          players: [],
        },
      ],
    });

    expect(detail.opponents[0]?.players[0]).toEqual(
      expect.objectContaining({
        id: 11,
        name: 'Fallback Player',
      }),
    );
  });
});
