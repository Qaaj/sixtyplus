#!/usr/bin/env bash

curl -X POST -H "Content-Type: application/json" -H "tickers: ["TSLA"]" -H "Cache-Control: no-cache" -H "Postman-Token: d9ec2d5c-e17c-d7c2-ff64-50537bed23ef" -d '{"key":"top_secret_key_boy"}' 'http://sixtyplus-test.herokuapp.com/api/saveAnalystRatings';
