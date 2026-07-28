#!/usr/bin/env bash
# Free — no key, no signup.
curl -s https://projectcostestimator.com/api/cost-data | jq '.data.geographic_multipliers'
