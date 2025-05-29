'use client'
import { useEffect, useState } from "react";

type Match = {
  id: number;
  date: string;
  venue: string | null;
  status: { long: string };
  league: { name: string; logo: string };
  country: { name: string; flag: string };
  teams: {
    home: { name: string; logo: string };
    away: { name: string; logo: string };
  };
  scores: {
    home: { total: number };
    away: { total: number };
  };
};

const Home = () => {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    fetch('/api/matches')
      .then(res => res.json())
      .then(data => setMatches(data));
  }, []);

  return (
    <main className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8 flex items-center gap-3 text-gray-800">
          <span role="img" aria-label="basketball">🏀</span>
          BasketBall Matches — {new Date().toISOString().split('T')[0]}
        </h1>

        <ul className="space-y-6">
          {matches.map((match) => (
            <li
              key={match.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-4 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 border-b pb-3 gap-3">
                <div className="flex items-center gap-2">
                  <img src={match.league.logo} alt={match.league.name} className="w-7 h-7 sm:w-8 sm:h-8 object-contain" />
                  <span className="text-base sm:text-lg font-semibold text-gray-800">
                    {match.league.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src={match.country.flag}
                    alt={match.country.name}
                    className="w-5 h-3.5 sm:w-6 sm:h-4 object-contain rounded-sm border"
                  />
                  <span className="text-sm text-gray-600">{match.country.name}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={match.teams.home.logo}
                    alt={match.teams.home.name}
                    className="w-9 h-9 sm:w-10 sm:h-10 object-contain rounded-full border"
                  />
                  <span className="text-base font-medium text-gray-900">
                    {match.teams.home.name}
                  </span>
                </div>

                <div className="text-xl sm:text-2xl font-bold text-gray-900">
                  {match.scores.home.total}
                  <span className="mx-2 text-gray-400">:</span>
                  {match.scores.away.total}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-base font-medium text-gray-900">
                    {match.teams.away.name}
                  </span>
                  <img
                    src={match.teams.away.logo}
                    alt={match.teams.away.name}
                    className="w-9 h-9 sm:w-10 sm:h-10 object-contain rounded-full border"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <span role="img" aria-label="calendar">📅</span>
                  {new Date(match.date).toLocaleString()}
                </span>
                {match.venue && (
                  <span className="flex items-center gap-1">
                    <span role="img" aria-label="stadium">🏟</span>
                    {match.venue}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <span role="img" aria-label="status">🕹</span>
                  Status: {match.status.long}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default Home