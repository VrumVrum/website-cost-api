# Website Cost API

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Data: CC BY 4.0](https://img.shields.io/badge/Data-CC--BY--4.0-green.svg)](https://creativecommons.org/licenses/by/4.0/)
![No signup](https://img.shields.io/badge/API-free%20%C2%B7%20no%20signup-brightgreen.svg)

A **free, no-signup JSON API** for software and website project cost data — the platform, geographic, pricing-tier and urgency multipliers behind real project estimates, calibrated on **600+ project quotes and public rate benchmarks**.

This is the open data layer powering **[Project Cost Estimator](https://projectcostestimator.com)** — a free website & software development cost calculator.

![Project Cost Estimator — free website and software project cost calculator](https://projectcostestimator.com/opengraph-image)

## Endpoint

```
GET https://projectcostestimator.com/api/cost-data
```

No API key. No signup. CORS-enabled. Returns a [schema.org `Dataset`](https://schema.org/Dataset) object with the full multiplier set and methodology.

## Quick start

**curl**
```bash
curl -s https://projectcostestimator.com/api/cost-data | jq '.data.geographic_multipliers'
```

**JavaScript (fetch)**
```js
const res = await fetch('https://projectcostestimator.com/api/cost-data');
const { data } = await res.json();

// Estimate: WordPress landing page, Eastern-European freelancer
const base = data.base_project_types.landing_page.base_price_usd;   // 300
const geo  = data.geographic_multipliers.eastern_europe.price;      // 0.55
const tier = data.pricing_tier_multipliers.freelancer.global;       // 1.0
console.log(Math.round(base * geo * tier));                         // ~165 USD base
```

**Python**
```python
import requests
data = requests.get("https://projectcostestimator.com/api/cost-data").json()["data"]
base = data["base_project_types"]["landing_page"]["base_price_usd"]      # 300
agency = data["pricing_tier_multipliers"]["agency"]["global"]           # 2.2
print(round(base * agency))                                             # ~660 USD base
```

## What's in the data

The `data` object contains:

| Key | What it holds |
|-----|---------------|
| `base_project_types` | base price, weeks & complexity per project type (landing page, marketing site, web app, e-commerce, …) |
| `platform_multipliers` | WordPress (1.0), Shopify (0.85), Magento, custom, … + hosting & SaaS fees |
| `geographic_multipliers` | south_asia 0.35 · eastern_europe 0.55 · western_europe 1.0 · north_america 1.45 (+ hourly-rate ranges) |
| `pricing_tier_multipliers` | freelancer (1.0) vs agency (2.2), with hourly references |
| `urgency_multipliers` | relaxed / normal / tight / rush — price & timeline effects |
| `client_type_multipliers` | startup / small_business / mid_market / enterprise |
| `project_origin_multipliers` | new build vs redesign vs migration |
| `median_project_cost_usd` | median values per project type |
| `platform_subscription_fees_monthly_usd` | ongoing platform costs |
| `safety_buffer`, `compound_multiplier_cap` | how the engine bounds a stacked estimate |
| `methodology` | how the numbers are derived (transparent, no black box) |

## How an estimate is computed

```
estimate ≈ base_price
         × platform_multiplier
         × geographic_multiplier
         × pricing_tier_multiplier
         × urgency_multiplier
         × client_type_multiplier
         (bounded by compound_multiplier_cap, + safety_buffer)
```

Try it interactively at **[projectcostestimator.com/calculator](https://projectcostestimator.com/calculator)**.

## Use cases

- Pre-fill a budget range in a quoting / proposal tool
- Build your own "cost to build X" widget or Slack bot
- Sanity-check a vendor quote against market rates
- Research: regional rate spreads, platform cost deltas

## Attribution & license

- **Code in this repository:** [MIT](./LICENSE) — do anything, no warranty.
- **The data** (`/api/cost-data`): **CC-BY 4.0**. Free to use commercially; please attribute **Project Cost Estimator (https://projectcostestimator.com)**.

## Links

- 🧮 Free calculator: https://projectcostestimator.com/calculator
- 📚 API docs: https://projectcostestimator.com/api-docs
- 📊 Open dataset (Hugging Face · Zenodo · Kaggle): https://projectcostestimator.com/cost-index
- 🌐 Site: https://projectcostestimator.com

---

Built and maintained by **Florin Florea** · [Project Cost Estimator](https://projectcostestimator.com). Data is refreshed as market rates move. Issues & PRs welcome.
