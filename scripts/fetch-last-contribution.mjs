import { writeFile, mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'

const USERNAME = 'ahmedabb104'
const OUTPUT = 'public/last-commit.json'

const query = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`

async function write(date) {
  await mkdir(dirname(OUTPUT), { recursive: true })
  await writeFile(OUTPUT, JSON.stringify({ date }) + '\n')
  console.log(`Wrote ${OUTPUT}: ${date ?? 'null'}`)
}

const token = process.env.GH_TOKEN
if (!token) {
  console.error('GH_TOKEN not set; writing null')
  await write(null)
  process.exit(0)
}

const res = await fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'User-Agent': `${USERNAME}-site`,
  },
  body: JSON.stringify({ query, variables: { login: USERNAME } }),
})

if (!res.ok) {
  console.error(`GraphQL HTTP ${res.status}: ${await res.text()}`)
  await write(null)
  process.exit(0)
}

const body = await res.json()
if (body.errors) {
  console.error('GraphQL errors:', JSON.stringify(body.errors))
  await write(null)
  process.exit(0)
}

const weeks = body?.data?.user?.contributionsCollection?.contributionCalendar?.weeks
const days = (weeks ?? []).flatMap((w) => w.contributionDays)
days.sort((a, b) => b.date.localeCompare(a.date))
const latest = days.find((d) => d.contributionCount > 0)

await write(latest?.date ?? null)
