#!/bin/bash
cd "/Users/user/Downloads/- LIMITLESS PROJECTS/LIMITLESS/DEMO/miller-mechanical/public/assets/"

# Rename screenshot to workshop.jpg
for f in Screenshot*; do
  if [ -f "$f" ]; then
    cp "$f" workshop.jpg
    echo "Copied '$f' -> workshop.jpg"
  fi
done

# Rename logo file
for f in *logo-transparent*; do
  if [ -f "$f" ] && [ "$f" != "logo-transparent.png" ]; then
    cp "$f" logo-transparent.png
    echo "Copied '$f' -> logo-transparent.png"
  fi
done

echo "Done!"
ls -la
