import {
  getMatchStatusLabel,
  mapApiStatusToMatchStatus,
  mapMatchDtoToCardModel,
} from '../match-list-mapper';

describe('match list mapper', () => {
  it('maps api statuses to app statuses and labels', () => {
    expect(mapApiStatusToMatchStatus('running')).toBe('running');
    expect(mapApiStatusToMatchStatus('live')).toBe('running');
    expect(mapApiStatusToMatchStatus('finished')).toBe('finished');
    expect(mapApiStatusToMatchStatus('canceled')).toBe('finished');
    expect(mapApiStatusToMatchStatus('postponed')).toBe('finished');
    expect(mapApiStatusToMatchStatus('unknown')).toBe('scheduled');
    expect(mapApiStatusToMatchStatus(null)).toBe('scheduled');

    expect(getMatchStatusLabel('running')).toBe('In Progress');
    expect(getMatchStatusLabel('finished')).toBe('Ended');
    expect(getMatchStatusLabel('scheduled')).toBe('Scheduled');
  });

  it('keeps current fallbacks for missing or invalid match data', () => {
    const match = mapMatchDtoToCardModel({
      id: Number.NaN,
      status: undefined,
      begin_at: '',
      scheduled_at: '   ',
      number_of_games: Number.NaN,
      league: {
        id: undefined,
        name: '',
        image_url: '',
      },
      serie: {
        name: '',
      },
      opponents: [
        {
          opponent: {
            id: Number.NaN,
            name: '',
            image_url: '',
          },
        },
        {},
      ],
    });

    expect(match).toEqual({
      id: 0,
      status: 'scheduled',
      statusLabel: 'Scheduled',
      league: {
        id: 0,
        name: 'Unknown League',
        imageUrl: null,
        serieName: null,
      },
      opponents: [{ id: 0, name: 'TBD', imageUrl: null }, null],
      beginAt: null,
      scheduledAt: null,
      numberOfGames: null,
    });
  });
});
