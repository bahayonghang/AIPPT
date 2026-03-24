set shell := ["pwsh.exe", "-NoLogo", "-NoProfile", "-Command"]

default:
  @just --list

docs:
  cd docs; npm run docs:dev

docs-build:
  cd docs; npm run docs:build

docs-preview:
  cd docs; npm run docs:preview

ci:
  node --check skills/aippt/scripts/_shared.mjs
  node --check skills/aippt/scripts/build-prompt-bundle.mjs
  node --check skills/aippt/scripts/validate-artifacts.mjs
  node --check skills/aippt/scripts/validate-svg.mjs
  node --check skills/aippt/scripts/build-preview.mjs
  cd docs; npm run docs:build
