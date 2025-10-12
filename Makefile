# Makefile for simplified Docker infrastructure setup

.PHONY: help
help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-20s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.PHONY: git-hooks
git-hooks:
	git config core.hooksPath .githooks

# ========== Development Commands ==========

.PHONY: start
start: ## Start infrastructure and run turbo dev (recommended)
	docker-compose up -d && pnpm dev

.PHONY: infra
infra: ## Start only infrastructure services (PostgreSQL + Redis)
	docker-compose up -d

.PHONY: infra-logs
infra-logs: ## Show infrastructure logs
	docker-compose logs -f

# ========== Database Commands ==========

.PHONY: db-push
db-push: ## Push database schema
	pnpm db:push

.PHONY: db-studio
db-studio: ## Open Drizzle Studio
	pnpm db:studio

.PHONY: db-reset
db-reset: ## Reset database (WARNING: destructive)
	docker-compose down -v
	docker-compose up -d postgres
	sleep 10
	pnpm db:push

# ========== Utility Commands ==========

.PHONY: ps
ps: ## Show running containers
	docker-compose ps

.PHONY: down
down: ## Stop infrastructure services
	docker-compose down

.PHONY: clean
clean: ## Stop services and remove volumes (WARNING: data loss)
	docker-compose down -v

.PHONY: prune
prune: ## Remove all unused Docker resources
	docker system prune -af --volumes

# ========== CI Commands ==========

.PHONY: ci-build-nextjs
ci-build-nextjs: ## Build Next.js for CI
	docker build -f apps/nextjs/Dockerfile \
		--build-arg SOPS_KMS_KEY="$(SOPS_KMS_KEY)" \
		--tag voytravel-nextjs:latest .

.PHONY: ci-build-api
ci-build-api: ## Build Python API for CI
	docker build -f apps/travel-assistant-api/Dockerfile \
		--build-arg ENV=production \
		--build-arg SOPS_KMS_KEY="$(SOPS_KMS_KEY)" \
		--tag voytravel-api:latest .

.PHONY: test-build
test-build: ## Test production builds locally
	$(MAKE) ci-build-nextjs
	$(MAKE) ci-build-api
	@echo "✅ Production builds completed successfully!"



# ========== Env File Commands =============

.PHONY: env-decrypt-dev
env-decrypt-dev:
	@[ -f apps/nextjs/.env.development.sops ] || { echo "No apps/nextjs/.env.development.sops"; exit 1; }
	sops -d apps/nextjs/.env.development.sops > apps/nextjs/.env.development
.PHONY: env-encrypt-dev
env-encrypt-dev:
	@[ -f apps/nextjs/.env.development ] || { echo "No apps/nextjs/.env.development"; exit 1; }
	sops -e -i apps/nextjs/.env.development
.PHONY: env-decrypt-prod
env-decrypt-prod:
	@[ -f apps/nextjs/.env.production.sops ] || { echo "No apps/nextjs/.env.production.sops"; exit 1; }
	sops -d apps/nextjs/.env.production.sops > apps/nextjs/.env.production
.PHONY: env-decrypt-prod
env-encrypt-prod:
	@[ -f apps/nextjs/.env.production ] || { echo "No apps/nextjs/.env.production"; exit 1; }
	sops -e -i apps/nextjs/.env.production
