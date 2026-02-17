{ head -n 1 ~/website/tft16.csv; tail -n +2 ~/website/tft16.csv | sort -t, -k1,1; } > sorted.csv
