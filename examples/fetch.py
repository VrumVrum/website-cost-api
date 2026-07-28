# pip install requests — no key needed.
import requests
data = requests.get("https://projectcostestimator.com/api/cost-data").json()["data"]
base = data["base_project_types"]["landing_page"]["base_price_usd"]  # 300
agency = data["pricing_tier_multipliers"]["agency"]["global"]        # 2.2
print("Landing page (agency), base USD:", round(base * agency))
