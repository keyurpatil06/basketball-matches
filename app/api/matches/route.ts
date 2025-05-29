export async function GET() {
  const today = new Date().toISOString().split('T')[0];

  const res = await fetch(
    `https://v1.basketball.api-sports.io/games?date=${today}`,
    {
      headers: {
        'x-rapidapi-key': process.env.BASKETBALL_API_KEY!,
        'x-rapidapi-host': 'v1.basketball.api-sports.io',
      },
      cache: 'no-store',
    }
  );

  const json = await res.json();
  return Response.json(json.response);
}