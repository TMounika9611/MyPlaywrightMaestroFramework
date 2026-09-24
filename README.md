# Playwright RBAC Framework - SauceDemo
RBAC implementation - Role Based Access Control with isolated auth and testDir separation.

## Architecture
tests/
|----auth/
| |----auth.standard.setup.ts ->
standard_user (Team Lead)
| |----auth.problem.setup.ts ->
problem_user (Team Member) ->
| |----auth.perf.setup.ts ->
performance_glitch_user (Supervisor)
|-----standard/ -> Team Lead tests @smoke @regression
|-----problem/ -> Team Member tests @regression
|-----performance/ -> Supervisor tests @sanity
playwright/.auth/ -> storageState JSON (gitignored)

No if-else, no hardcoded login in tests. Each role has its own `storageState` and `testDir`.

##RBAC Design

- `setup-*` projects authenticate once and save `storageState`
- `sauce-*` projects depend on setup projects
- Tests reuse auth JSON, run in parallel
- Auth files gitignored for security

## Run Commands

**Team Lead only (smoke):**
```bash
npx playwright test --project=sauce-standard --grep=smoke --headed
```

All roles regression:
```bash
npx playwright test --project=sauce-standard --project=sauce-problem --project=sauce-perf --grep=regression
```

Full RBAC demo (all 3 auths+ all tests):
```bash
npx playwright test
```

Slow headed demo:
npx playwright test --project=sauce-standard --grep=smoke --headed --workers=1

Best Practices:
- storageState reused, no repeated logins
- test.slow() for performance_glitch_user
- Tags @smoke @sanity @regression for selective runs
- playwright/.auth/gitignored

BookStore API:
```bash
npx playwright test --project=demoqa-bookstore --headed
```
Generic Playwright Typescript Hybrid Framework (UI + API)
- Covers: UI POM + API Interception + Collections (for Service Cloud Case Referral pattern)