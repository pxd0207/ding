import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await fetch(
    `https://plausible.io/api/v1/stats/realtime/visitors?site_id=ding.one`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.PLAUSIBLE_API_TOKEN}`
      }
    }
  )

  const data = await result.json()

  if (!result.ok) {
    return res
      .status(500)
      .json({ error: 'Error retrieving realtime visitors' })
  }

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=60'
  )

  return res.status(200).json({ visitors: data })
}