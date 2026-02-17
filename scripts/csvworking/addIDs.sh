{
  echo "ID,$(head -n 1 sorted.csv)"
  paste -d, ~/website/slugs.txt <(tail -n +2 sorted.csv)
} > final.csv

