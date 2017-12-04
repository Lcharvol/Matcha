find ./node_modules/webpack/. -type f -name "*.js" -exec sed -i '' 's/console.log.*$//g' {} \;
