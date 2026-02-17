mkdir -p set16_thumbs
touch slugs.txt

curl -s https://mobalytics.gg/tft/champions \
  | grep -oE '/tft/champions/[a-z0-9]+' \
  | sed 's#/tft/champions/##' \
  | sort -u > slugs.txt
  
      
