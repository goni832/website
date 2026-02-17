mkdir -p set16_thumbs

curl -s https://mobalytics.gg/tft/champions \
  | grep -oE '/tft/champions/[a-z0-9]+' \
  | sed 's#/tft/champions/##' \
  | sort -u \
  | while read -r slug; do
      url="https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set16/${slug}.jpg"
      echo "Downloading $url"
      wget -q -nc -P set16_thumbs "$url" || true
    done
