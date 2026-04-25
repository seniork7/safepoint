# Safepoint

A public safety data API for Canadian developers, providing structured access to alerts, incidents, recalls, and other safety information from official Canadian government sources.

> **Status:** In active development. Weather alerts pipeline is live; additional content types in progress.

---

## Why this exists

Public safety information in Canada is scattered across multiple federal and provincial agencies - Environment Canada, Health Canada, CFIA, CCCS, WSIB, CCOHS - each with its own data format, update cadence, and access pattern. Developers building civic apps, dashboards, community tools, or content platforms typically have to scrape, normalize, and stitch these sources together themselves.

Safepoint centralizes this data behind a single REST API with consistent schemas, pagination, and filtering, so consumers can focus on what they're building instead of how they're sourcing data.

---

## Tech stack

- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Scheduling:** `node-cron` for periodic data fetches
- **Frontend (docs site):** React, TypeScript, Tailwind CSS
- **Hosting:** Render (API), Netlify (docs)

---

## Architecture

### Endpoint structure

Endpoints are organized by **content type**, with **category** as a query parameter:

```
/v1/alerts?category=weather&location=toronto&limit=20&offset=0
```

This keeps the URL space flat and predictable, while letting consumers filter by domain.

### Content types

`alerts` `tips` `resources` `incidents` `recalls` `statistics` `regulations` `guidelines`

### Categories

`fire` `flood` `tornado` `weather` `chemical` `occupational` `cybersecurity` `vehicle` `food` `consumer`

### Data sources

Pulled from official Canadian government APIs:

- **Environment Canada** (`api.weather.gc.ca`) — weather alerts
- **Health Canada / CFIA** — health and food recalls
- **CCCS** — cybersecurity advisories
- **WSIB / CCOHS** — occupational safety

### Project structure

```
safepoint/
├── controllers/
├── middleware/
├── models/
├── routes/
└── utils/
    ├── cron/
    ├── fetchers/
    └── transformers/
```

---

## What's built so far

The **weather alerts pipeline** is complete and serves as the reference implementation for the remaining content types:

- Ontario cities reference map with in-memory caching (`getCities`)
- Weather fetcher using `Promise.all` with `on*` wildcard filter for Ontario regions
- Mongoose schema for weather alerts
- `bulkWrite` upsert for deduplication across fetches
- Hourly `node-cron` job + startup fetch on server boot (`saveWeatherAlerts('startup')`)
- `paginate` middleware attaching `req.limit` / `req.offset` / `req.location`
- `getAlerts` controller returning a pagination envelope: `previous`, `next`, `total`, `data`, `disclaimer`

---

## Roadmap

### MVP (in progress)

- Rate limiting via `express-rate-limit`
- Build out the remaining seven content type pipelines following the weather alerts pattern

### Post-MVP

- Admin dashboard
- Expansion beyond Ontario to additional provinces

---

## Sample response

`GET /api/v1/alerts?category=weather&location=toronto&limit=1&offset=0`

```json
{
	"previous": null,
	"total": 167,
	"category": "weather",
	"next": "https://api.safepoint.kevonsenior.com/api/v1/alerts?category=weather&offset=2&limit=2",
	"data": [
		{
			"sourceID": "on-142_e",
			"city": "Toronto",
			"region": "Toronto and York Region",
			"category": "weather",
			"locationCoordinates": [43.7, -79.42],
			"currentConditions": {
				"temperature": 14,
				"humidity": 72,
				"windSpeed": 19,
				"windGust": 0,
				"windChill": 0
			},
			"todayForecast": "Mainly cloudy. 40 percent chance of showers in the afternoon. Wind becoming northwest 20 km/h in the afternoon. High 16.",
			"warnings": [],
			"source": {
				"name": "Environment and Climate Change Canada",
				"url": "https://api.weather.gc.ca"
			},
			"lastUpdated": "2026-04-24T14:00:00.000Z"
		}
	],
	"disclaimer": "This information was gather from Environment and Climate Change Canada, please do your due diligence to verify the data before use."
}
```

---

## Deployment

- **API:** [`api.safepoint.kevonsenior.com`](https://api.safepoint.kevonsenior.com) — Render
- **DNS:** configured through Netlify, pointing the API subdomain to Render

---
