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

Test Report:
http://localhost:9323/#?testId=19ece5bbff5f74ec2ef5-8d4c90f1e3dcaa930919

Search tests
Bookstore UI - Add and Delete book
bookstore/bookstore.ui.spec.ts:3
34.4s
demoqa-bookstore
Filter steps
Before Hooks
3.8s
GET demoqa.com/BookStore/v1/Books— api/bookstore.api.ts:22
164ms
Navigate demoqa.com/login— ../src/pages/bookstore.page.ts:7
2.8s
Fill "test_1790235953636" getByPlaceholder('UserName')— ../src/pages/bookstore.page.ts:11
1.1s
Fill "Test@1234!Aa" getByPlaceholder('Password')— ../src/pages/bookstore.page.ts:12
1.2s
Click getByRole('button', { name: 'Login' })— ../src/pages/bookstore.page.ts:13
1.1s
Expect "toBeVisible" getByText('test_1790235953636').first()— ../src/pages/bookstore.page.ts:14
2.0s
Navigate demoqa.com/books— ../src/pages/bookstore.page.ts:18
1.4s
Wait for timeout— ../src/pages/bookstore.page.ts:19
5.0s
Evaluate— ../src/pages/bookstore.page.ts:21
63ms
Click getByRole('link', { name: 'Git Pocket Guide' }).first()— ../src/pages/bookstore.page.ts:26
1.1s
Wait for timeout— ../src/pages/bookstore.page.ts:28
2.0s
Evaluate— ../src/pages/bookstore.page.ts:29
8ms
Evaluate— ../src/pages/bookstore.page.ts:35
6ms
Wait for timeout— ../src/pages/bookstore.page.ts:39
1.0s
Evaluate— ../src/pages/bookstore.page.ts:46
12ms
Wait for timeout— ../src/pages/bookstore.page.ts:51
3.0s
Accept dialog— ../src/pages/bookstore.page.ts:43
12ms
Navigate demoqa.com/profile— ../src/pages/bookstore.page.ts:55
1.4s
Wait for timeout— ../src/pages/bookstore.page.ts:56
2.0s
Evaluate— ../src/pages/bookstore.page.ts:60
37ms
Wait for timeout— ../src/pages/bookstore.page.ts:63
2.0s
Expect "toBeVisible" getByText('Git Pocket Guide').first()— ../src/pages/bookstore.page.ts:64
28ms
Evaluate— ../src/pages/bookstore.page.ts:68
2ms
Wait for timeout— ../src/pages/bookstore.page.ts:72
1.0s
Evaluate— ../src/pages/bookstore.page.ts:77
22ms
Wait for timeout— ../src/pages/bookstore.page.ts:81
1.0s
Click locator('#closeSmallModal-ok')— ../src/pages/bookstore.page.ts:83
1.0s
DELETE demoqa.com/Account/v1/User/eac1d902-d1e0-445e-9da2-7382295a6b9e— api/bookstore.api.ts:34
286ms
After Hooks
197ms
stdout
