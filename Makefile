.PHONY: setup run clean sdk-install sdk-test api-install api-dev api-build api-test test-install test-run install test

# Python SDK commands
sdk-install:
	cd apps/python-sdk && pip install -e .
	pip install pytest

sdk-test:
	cd apps/python-sdk && python -m pytest

# API Service commands
api-install:
	cd apps/api && npm install

api-start:
	cd apps/api && npm start

api-build:
	cd apps/api && npm run build

api-test:
	cd apps/api && npm run test

# Test Suite commands 
test-install:
	cd apps/test-suite && npm install

test-run:
	cd apps/test-suite && npm run test:unit

# Global commands
install: sdk-install api-install test-install

test: sdk-test api-test test-run

clean:
	find . -type d -name "node_modules" -exec rm -rf {} +
	find . -type d -name "__pycache__" -exec rm -rf {} +
	find . -type d -name ".pytest_cache" -exec rm -rf {} +
	find . -type f -name "*.pyc" -exec rm -f {} +
	find . -type d -name ".coverage" -exec rm -rf {} +
	find . -type f -name ".DS_Store" -exec rm -f {} +
