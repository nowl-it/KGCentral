# TODO - Danh Sách Khắc Phục

Dựa trên kết quả đánh giá bảo mật và chất lượng code.

---

## 🔴 CRITICAL - Ưu tiên cao nhất (Phải fix trước khi demo)

### Security

- [ ] **Thay đổi JWT_SECRET** 
  - File: `docker-compose.yml`, `devops/k8s/base/secrets.yaml`
  - Action: Generate random 256-bit key: `openssl rand -base64 64`
  - Không commit vào git, dùng environment variables

- [ ] **Thay đổi Database Password**
  - File: `docker-compose.yml` 
  - Action: Generate strong password (32+ chars)
  - Update `DATABASE_URL` accordingly

- [ ] **Implement Kubernetes Sealed Secrets**
  - Install Sealed Secrets controller
  - Encrypt `devops/k8s/base/secrets.yaml`
  - Hoặc dùng External Secrets Operator

- [ ] **Thêm JWT Authentication Guards**
  - File: `apps/backend/src/guards/jwt-auth.guard.ts` (tạo mới)
  - Apply `@UseGuards(JwtAuthGuard)` cho:
    - `apps/backend/src/app/users/users.controller.ts`
    - Tất cả protected endpoints

### Testing

- [ ] **Setup Jest cho Backend**
  ```bash
  pnpm --filter @kgcentral/backend add -D jest @types/jest ts-jest supertest @types/supertest
  ```
  - Tạo `jest.config.js`
  - Write tests cho `auth.controller.ts`
  - Write tests cho `users.controller.ts`
  - Target: 50% coverage minimum

- [ ] **Setup Vitest cho Frontend**
  ```bash
  pnpm --filter @kgcentral/frontend add -D vitest @testing-library/react @testing-library/jest-dom
  ```
  - Tạo `vitest.config.ts`
  - Write tests cho components
  - Target: 60% coverage minimum

---

## 🟠 HIGH - Ưu tiên cao (1 tuần)

### Security

- [ ] **Tăng Password Requirements**
  - File: `apps/backend/src/app/auth/auth.controller.ts`
  - Min 12 chars, uppercase, lowercase, number, special char
  ```typescript
  password: z.string()
    .min(12)
    .regex(/[A-Z]/, "Must have uppercase")
    .regex(/[a-z]/, "Must have lowercase")
    .regex(/[0-9]/, "Must have number")
    .regex(/[^A-Za-z0-9]/, "Must have special char")
  ```

- [ ] **Implement Rate Limiting**
  ```bash
  pnpm --filter @kgcentral/backend add @nestjs/throttler
  ```
  - Add to `app.module.ts`
  - Protect `/auth/login` endpoint (5 attempts/minute)

- [ ] **Input Validation cho tất cả DTOs**
  - Validate `:id` params (CUID length = 25)
  - Sanitize user inputs
  - Use `class-validator` decorators

- [ ] **CORS Configuration**
  - File: `apps/backend/src/main.ts`
  - Whitelist specific origins only
  - No wildcard `*` in production

- [ ] **HTTPS/TLS Enforcement**
  ```bash
  pnpm --filter @kgcentral/backend add helmet
  ```
  - Add Helmet middleware
  - HSTS headers
  - Force HTTPS redirect in production

- [ ] **CSRF Protection**
  - Implement for cookie-based sessions
  - SameSite cookies

### Code Quality

- [ ] **Extract Service Layer**
  - Tạo `apps/backend/src/app/auth/auth.service.ts`
  - Tạo `apps/backend/src/app/users/users.service.ts`
  - Move business logic từ controllers

- [ ] **Global Exception Filter**
  - File: `apps/backend/src/filters/http-exception.filter.ts` (tạo mới)
  - Consistent error response format
  - Apply globally in `main.ts`

- [ ] **Structured Logging**
  ```bash
  pnpm --filter @kgcentral/backend add winston winston-daily-rotate-file
  ```
  - Setup Winston logger
  - Request/response middleware
  - Database query logging

---

## 🟡 MEDIUM - Ưu tiên trung bình (2 tuần)

### Security

- [ ] **Password Reset with Token Expiration**
  - Prisma schema: `PasswordReset` model
  - Token expires after 1 hour
  - Email service integration

- [ ] **Account Lockout Mechanism**
  - Lock account sau 5 failed login attempts
  - Unlock sau 15 phút
  - Notify user via email

- [ ] **Email Verification**
  - Prisma schema: `emailVerified` field
  - Send verification email on register
  - Verify endpoint

### Performance

- [ ] **Pagination cho tất cả List Endpoints**
  - `GET /users?page=1&limit=10`
  - Return `{ data, meta: { total, page, limit, pages } }`

- [ ] **Redis Caching**
  ```bash
  pnpm --filter @kgcentral/backend add ioredis
  ```
  - Cache user list (5 phút TTL)
  - Cache static data

- [ ] **Database Query Optimization**
  - Add indexes cho frequently queried columns
  - Use `include` thay vì N+1 queries
  - Query profiling

### API Design

- [ ] **Standardize API Responses**
  - Tạo `ApiResponse<T>` type trong `packages/types`
  - Global interceptor để format responses
  - Consistent error format

- [ ] **API Versioning Strategy**
  - Header-based versioning: `X-API-Version`
  - Support multiple versions

---

## 🟢 LOW - Ưu tiên thấp (Khi có thời gian)

### Security

- [ ] **Security Headers**
  - Helmet với full configuration
  - CSP, X-Frame-Options, etc.

- [ ] **Request ID Tracking**
  - UUID cho mỗi request
  - Header: `X-Request-ID`
  - Log correlation

- [ ] **Sanitize Sensitive Data trong Logs**
  - Redact `DATABASE_URL`, `JWT_SECRET`, passwords

### DevOps

- [ ] **CI/CD Pipeline**
  - File: `.github/workflows/ci.yml` (tạo mới)
  - Run tests on push
  - Run lint
  - Build verification

- [ ] **Pre-commit Hooks**
  ```bash
  pnpm add -D husky lint-staged
  ```
  - Lint code before commit
  - Run type-check

---

## 📚 Documentation Updates

- [x] Create `SECURITY_AUDIT.md` - Báo cáo bảo mật
- [x] Create `CODE_QUALITY_REVIEW.md` - Đánh giá chất lượng
- [x] Update `README.md` - Thêm links đến reports
- [ ] Update `PROPOSAL.md` - Thêm security & testing sections
- [ ] Create `TESTING.md` - Testing strategy & coverage reports
- [ ] Create `DEPLOYMENT.md` - Production deployment guide

---

## Tracking Progress

**Tổng số items:** 35  
**Completed:** 3 (8.6%)  
**Critical remaining:** 7  
**High remaining:** 8  
**Medium remaining:** 9  
**Low remaining:** 8

**Estimated time:**
- Critical: 1-2 tuần
- High: 1 tuần
- Medium: 2 tuần
- Low: 1 tuần
- **Total: 5-6 tuần** (làm full-time)

---

## Notes

- **Ưu tiên:** Critical > High > Medium > Low
- **Trước khi demo:** Hoàn thành tất cả Critical items
- **Trước khi deploy production:** Hoàn thành Critical + High items
- **Cho điểm A:** Hoàn thành tất cả items + documentation

---

Cập nhật: 28/03/2026
