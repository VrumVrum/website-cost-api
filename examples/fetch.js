// Node 18+ / browser — no key needed.
const res = await fetch('https://projectcostestimator.com/api/cost-data');
const { data } = await res.json();
const base = data.base_project_types.landing_page.base_price_usd; // 300
const geo  = data.geographic_multipliers.eastern_europe.price;    // 0.55
console.log('Landing page (EU freelancer), base USD:', Math.round(base * geo));
