# 🔐 Báo Cáo Đánh Giá Bảo Mật - KGCentral

**Ngày đánh giá:** 28/03/2026  
**Người đánh giá:** Giảng viên hướng dẫn đồ án tốt nghiệp  
**Phiên bản:** 1.0.0

---

## 📊 Tóm Tắt Điều Hành

Đã phát hiện **20 lỗ hổng bảo mật** với mức độ nghiêm trọng từ CRITICAL đến LOW:

| Mức độ | Số lượng | % |
|--------|----------|---|
| 🔴 CRITICAL | 5 | 25% |
| 🟠 HIGH | 6 | 30% |
| 🟡 MEDIUM | 5 | 25% |
| 🟢 LOW | 4 | 20% |

**Ưu tiên khắc phục:** Phải fix tất cả CRITICAL trước khi deploy production.

> 🆕 **Update 28/03/2026:** Phát hiện thêm 1 lỗ hổng CRITICAL - No JWT authentication guards on endpoints.

---

## 🔴 CRITICAL - Nghiêm Trọng (5 lỗ hổng)

### 1. Không có JWT Authentication Guards trên Protected Endpoints

**Files:** `apps/backend/src/app/users/users.controller.ts`, `apps/backend/src/app/auth/auth.controller.ts`  
**CWE:** CWE-306 (Missing Authentication for Critical Function)  
**Discovered:** 28/03/2026

```typescript
// ❌ HIỆN TẠI - Không có @UseGuards
@Controller('users')
export class UsersController {
    @Get()  // Bất kỳ ai cũng gọi được!
    async list(): Promise<UsersListResponse> {
        const users = await prisma.user.findMany({
            select: { id, email, username, name, avatar, role, locale }
        });
        return { users };
    }
    
    @Get(':id')  // Không cần login!
    async getById(@Param('id') id: string) {
        return await prisma.user.findUnique({ where: { id } });
    }
}
```

**Tác động:**
- 🔴 **User enumeration** - Attacker có thể liệt kê tất cả users
- 🔴 **IDOR vulnerability** - Truy cập thông tin bất kỳ user nào
- 🔴 **Data exposure** - Email, username, role của tất cả users bị lộ
- 🔴 **Privacy violation** - Không cần authentication để xem danh sách

**Khắc phục:**
```typescript
// ✅ SỬA - Implement JWT Guard

// 1. Tạo JWT Guard: src/guards/jwt-auth.guard.ts
import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.replace('Bearer ', '');
        
        if (!token) {
            throw new UnauthorizedException('Missing authentication token');
        }
        
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET || 'fallback');
            request.user = payload;
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}

// 2. Apply guard to controller
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)  // Bảo vệ toàn bộ controller
export class UsersController {
    @Get()
    async list(@Request() req): Promise<UsersListResponse> {
        // Chỉ authenticated users mới gọi được
        console.log('Authenticated user:', req.user.id);
        const users = await prisma.user.findMany({...});
        return { users };
    }
}
```

**Priority:** 🔴 **CRITICAL** - Phải fix trước khi deploy

---

### 2. JWT Secret yếu trong docker-compose.yml

**File:** `docker-compose.yml` (line 28)  
**CWE:** CWE-798 (Use of Hard-coded Credentials)

```yaml
# ❌ HIỆN TẠI
JWT_SECRET=change-this-secret-in-production
```

**Tác động:**
- Attacker có thể forge JWT tokens
- Authentication bypass hoàn toàn
- Truy cập trái phép vào tài khoản người dùng

**Khắc phục:**
```yaml
# ✅ SỬA
backend:
  environment:
    - JWT_SECRET=${JWT_SECRET_PROD}

# .env (KHÔNG commit vào git)
JWT_SECRET_PROD=<sử dụng openssl rand -base64 64>
```

---

### 3. Default Database Credentials

**File:** `docker-compose.yml` (lines 52-54)  
**CWE:** CWE-259 (Use of Hard-coded Password)

```yaml
# ❌ HIỆN TẠI
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres  # Password mặc định!
```

**Tác động:**
- Xâm nhập database
- Đánh cắp dữ liệu
- Thăng cấp đặc quyền

**Khắc phục:**
```yaml
# ✅ SỬA
db:
  environment:
    - POSTGRES_USER=${DB_USER:-postgres}
    - POSTGRES_PASSWORD=${DB_PASSWORD}  # Tối thiểu 32 ký tự
    - POSTGRES_DB=${DB_NAME:-kgcentral}
```

---

### 4. Kubernetes Secrets ở dạng Plain Text

**File:** `devops/k8s/base/secrets.yaml`  
**CWE:** CWE-311 (Missing Encryption of Sensitive Data)

```yaml
# ❌ HIỆN TẠI
kind: Secret
stringData:
  database-url: "postgresql://postgres:postgres@postgres:5432/kgcentral"
  jwt-secret: "change-this-secret-in-production"
```

**Tác động:**
- Bất kỳ ai có quyền truy cập k8s đều đọc được secrets
- Credentials lộ trong config management
- Không rotation được

**Khắc phục:**
```bash
# ✅ SỬA - Sử dụng Sealed Secrets
kubectl apply -f https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.24.0/controller.yaml

# Encrypt secrets
kubeseal --format yaml < secrets.yaml > sealed-secrets.yaml

# Hoặc sử dụng External Secrets Operator
```

---

### 5. Thiếu Authentication trên AI Service Endpoints

**Files:** `apps/ai-service/src/routes/inference.py`, `models.py`  
**CWE:** CWE-306 (Missing Authentication for Critical Function)  
**Discovered:** 28/03/2026

```python
# ❌ HIỆN TẠI - Không có authentication
@router.post("/", response_model=InferenceResponse)
async def predict(request: InferenceRequest):
    # Bất kỳ ai cũng gọi được inference endpoint!
    return InferenceResponse(
        success=True,
        model_name=request.model_name,
        output={"prediction": "mock_result", "confidence": 0.95}
    )
```

**Tác động:**
- API abuse - Unlimited inference calls
- Resource exhaustion
- Cost implications (nếu sử dụng paid AI services)

**Khắc phục:**
```python
# ✅ SỬA - Thêm API key hoặc JWT verification
from fastapi import Header, HTTPException
import jwt

async def verify_token(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing authorization header")
    
    token = authorization.replace("Bearer ", "")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        return payload
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

@router.post("/")
async def predict(
    request: InferenceRequest,
    user = Depends(verify_token)  # Require authentication
):
    # Chỉ authenticated users mới gọi được
    ...
```

---

## 🟠 HIGH - Cao (6 lỗ hổng)

### 6. Yêu cầu Password quá yếu

**File:** `apps/backend/src/app/auth/auth.controller.ts` (line 12)  
**CWE:** CWE-521 (Weak Password Requirements)

```typescript
// ❌ HIỆN TẠI
password: z.string().min(6),  // Chỉ 6 ký tự!
```

**Khắc phục:**
```typescript
// ✅ SỬA
const passwordSchema = z.string()
    .min(12, "Mật khẩu phải có ít nhất 12 ký tự")
    .regex(/[A-Z]/, "Phải có ít nhất 1 chữ hoa")
    .regex(/[a-z]/, "Phải có ít nhất 1 chữ thường")
    .regex(/[0-9]/, "Phải có ít nhất 1 số")
    .regex(/[^A-Za-z0-9]/, "Phải có ít nhất 1 ký tự đặc biệt");
```

---

### 7. Thiếu Rate Limiting

**File:** `apps/backend/src/main.ts`  
**CWE:** CWE-770 (Allocation of Resources Without Limits)

**Tác động:**
- Brute force attacks trên `/auth/login`
- DDoS attacks
- API abuse

**Khắc phục:**
```typescript
// ✅ SỬA
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

// app.module.ts
@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,  // 1 phút
      limit: 10,   // Tối đa 10 requests
    }]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})

// Hoặc cụ thể cho login:
@Post('login')
@Throttle({ default: { limit: 5, ttl: 60000 } })  // 5 attempts/phút
async login(@Body() body: LoginDto) { ... }
```

---

### 8. Thiếu Input Sanitization cho User Input

**File:** `apps/backend/src/app/users/users.controller.ts`  
**CWE:** CWE-20 (Improper Input Validation)

```typescript
// ❌ HIỆN TẠI
@Get(':id')
async get(@Param('id') id: string) {
    // Không validate 'id' format!
    const user = await prisma.user.findUnique({ where: { id } });
}
```

**Khắc phục:**
```typescript
// ✅ SỬA
import { IsString, Length } from 'class-validator';

class GetUserDto {
    @IsString()
    @Length(25, 25)  // CUID length = 25
    id: string;
}

@Get(':id')
async get(@Param() params: GetUserDto) {
    const user = await prisma.user.findUnique({ 
        where: { id: params.id } 
    });
    
    if (!user) {
        throw new NotFoundException('User not found');
    }
    
    return user;
}
```

---

### 8. CORS Configuration quá rộng

**File:** `apps/backend/src/main.ts` (line 14)  
**CWE:** CWE-942 (Overly Permissive Cross-domain Whitelist)

```typescript
// ❌ HIỆN TẠI - Nếu không set CORS_ORIGINS
app.enableCors({
    origin: '*',  // Cho phép TẤT CẢ domains!
    credentials: true,
});
```

**Khắc phục:**
```typescript
// ✅ SỬA
app.enableCors({
    origin: (origin, callback) => {
        const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || [
            'http://localhost:3000',
        ];
        
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Explicit methods
    allowedHeaders: ['Content-Type', 'Authorization'],
});
```

---

### 9. Thiếu HTTPS/TLS Enforcement

**File:** `apps/backend/src/main.ts`  
**CWE:** CWE-319 (Cleartext Transmission of Sensitive Information)

**Khắc phục:**
```typescript
// ✅ SỬA - Thêm Helmet middleware
import helmet from 'helmet';

app.use(helmet({
    hsts: {
        maxAge: 31536000,  // 1 năm
        includeSubDomains: true,
        preload: true,
    },
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
        },
    },
}));

// Force HTTPS redirect
app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'production' && !req.secure) {
        return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
});
```

---

### 10. Thiếu CSRF Protection

**File:** `apps/backend/src/main.ts`  
**CWE:** CWE-352 (Cross-Site Request Forgery)

**Khắc phục:**
```typescript
// ✅ SỬA
import * as csurf from 'csurf';

// Chỉ cần nếu có cookie-based sessions
app.use(csurf({ cookie: true }));

// Hoặc sử dụng SameSite cookies
app.use(cookieParser());
app.use(session({
    cookie: {
        sameSite: 'strict',  // Hoặc 'lax'
        secure: true,         // HTTPS only
        httpOnly: true,       // Không truy cập từ JS
    },
}));
```

---

## 🟡 MEDIUM - Trung Bình (5 lỗ hổng)

### 11. Thiếu Request/Response Logging

**File:** `apps/backend/src/main.ts`  
**Impact:** Khó phát hiện attacks, debug issues

**Khắc phục:**
```typescript
// ✅ SỬA - Thêm logger middleware
import { Logger, Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP');
    
    use(req: Request, res: Response, next: NextFunction) {
        const { method, originalUrl, ip } = req;
        const userAgent = req.get('user-agent') || '';
        const start = Date.now();
        
        res.on('finish', () => {
            const { statusCode } = res;
            const duration = Date.now() - start;
            
            this.logger.log(
                `${method} ${originalUrl} ${statusCode} ${duration}ms - ${userAgent} ${ip}`
            );
        });
        
        next();
    }
}

// app.module.ts
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
```

---

### 12. Password Reset không có Token Expiration

**Issue:** Nếu implement password reset, cần có token expiry

**Khắc phục:**
```typescript
// ✅ SỬA
interface ResetToken {
    token: string;
    expiresAt: Date;
    userId: string;
}

// Prisma schema
model PasswordReset {
    id        String   @id @default(cuid())
    token     String   @unique
    userId    String
    expiresAt DateTime
    createdAt DateTime @default(now())
    user      User     @relation(fields: [userId], references: [id])
}

// Controller
async requestReset(@Body('email') email: string) {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60);  // 1 giờ
    
    await prisma.passwordReset.create({
        data: { token, userId: user.id, expiresAt },
    });
}
```

---

### 13. Thiếu Account Lockout sau Failed Login Attempts

**File:** `apps/backend/src/app/auth/auth.controller.ts`  
**CWE:** CWE-307 (Improper Restriction of Excessive Authentication Attempts)

**Khắc phục:**
```typescript
// ✅ SỬA - Thêm lockout mechanism
interface LoginAttempt {
    email: string;
    attempts: number;
    lockedUntil?: Date;
}

const loginAttempts = new Map<string, LoginAttempt>();

async login(@Body() body: LoginDto) {
    const { email, password } = body;
    
    const attempt = loginAttempts.get(email);
    if (attempt?.lockedUntil && attempt.lockedUntil > new Date()) {
        throw new UnauthorizedException(
            `Account locked until ${attempt.lockedUntil.toISOString()}`
        );
    }
    
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
        const current = loginAttempts.get(email) || { email, attempts: 0 };
        current.attempts++;
        
        if (current.attempts >= 5) {
            current.lockedUntil = new Date(Date.now() + 15 * 60 * 1000);  // 15 phút
        }
        
        loginAttempts.set(email, current);
        throw new UnauthorizedException('Invalid credentials');
    }
    
    // Reset attempts on success
    loginAttempts.delete(email);
    
    // Return token...
}
```

---

### 14. Thiếu Email Verification

**Issue:** Users có thể đăng ký với email không thuộc về họ

**Khắc phục:**
```typescript
// ✅ SỬA
// Prisma schema
model User {
    emailVerified Boolean @default(false)
    verificationToken String? @unique
}

// Controller
async register(@Body() body: RegisterDto) {
    const verificationToken = crypto.randomBytes(32).toString('hex');
    
    const user = await prisma.user.create({
        data: {
            ...body,
            emailVerified: false,
            verificationToken,
        },
    });
    
    // Send email (sử dụng Nodemailer hoặc SendGrid)
    await sendVerificationEmail(user.email, verificationToken);
    
    return { message: 'Please check your email to verify account' };
}

@Get('verify/:token')
async verifyEmail(@Param('token') token: string) {
    const user = await prisma.user.findUnique({ 
        where: { verificationToken: token } 
    });
    
    if (!user) {
        throw new NotFoundException('Invalid token');
    }
    
    await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: true, verificationToken: null },
    });
    
    return { message: 'Email verified successfully' };
}
```

---

### 15. API Không có Pagination - Potential DoS

**File:** `apps/backend/src/app/users/users.controller.ts`  
**CWE:** CWE-770 (Resource Exhaustion)

```typescript
// ❌ HIỆN TẠI
@Get()
async list() {
    const users = await prisma.user.findMany();  // Lấy TẤT CẢ users!
}
```

**Khắc phục:**
```typescript
// ✅ SỬA
class ListUsersDto {
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page: number = 1;
    
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit: number = 10;
}

@Get()
async list(@Query() query: ListUsersDto) {
    const { page, limit } = query;
    const skip = (page - 1) * limit;
    
    const [users, total] = await Promise.all([
        prisma.user.findMany({ skip, take: limit }),
        prisma.user.count(),
    ]);
    
    return {
        data: users,
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
}
```

---

## 🟢 LOW - Thấp (4 lỗ hổng)

### 16. Thiếu Security Headers

**Khắc phục:**
```bash
pnpm --filter @kgcentral/backend add helmet
```

```typescript
// ✅ main.ts
import helmet from 'helmet';

app.use(helmet({
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: true,
    crossOriginResourcePolicy: { policy: 'same-site' },
    originAgentCluster: true,
    referrerPolicy: { policy: 'no-referrer' },
    strictTransportSecurity: {
        maxAge: 31536000,
        includeSubDomains: true,
    },
    xContentTypeOptions: true,
    xDnsPrefetchControl: true,
    xDownloadOptions: true,
    xFrameOptions: { action: 'deny' },
    xPermittedCrossDomainPolicies: true,
    xXssProtection: true,
}));
```

---

### 17. Không có Request ID cho Tracing

**Khắc phục:**
```typescript
// ✅ SỬA
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const requestId = req.headers['x-request-id'] || uuidv4();
        req['requestId'] = requestId;
        res.setHeader('X-Request-ID', requestId);
        next();
    }
}
```

---

### 18. Database Connection String Exposure trong Logs

**Issue:** Nếu log DATABASE_URL, sẽ lộ credentials

**Khắc phục:**
```typescript
// ✅ SỬA
function sanitizeEnv(env: Record<string, any>) {
    const sensitive = ['DATABASE_URL', 'JWT_SECRET', 'PASSWORD'];
    const sanitized = { ...env };
    
    for (const key of sensitive) {
        if (sanitized[key]) {
            sanitized[key] = '***REDACTED***';
        }
    }
    
    return sanitized;
}

console.log('Environment:', sanitizeEnv(process.env));
```

---

### 19. Thiếu API Versioning Strategy

**Issue:** Hiện tại hard-code `/api/v1`, khó deprecate

**Khắc phục:**
```typescript
// ✅ SỬA - Sử dụng header-based versioning
app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'X-API-Version',
    defaultVersion: '1',
});

@Controller('users')
export class UsersController {
    @Get()
    @Version('1')
    async listV1() { ... }
    
    @Get()
    @Version('2')
    async listV2() { ... }  // New version với breaking changes
}
```

---

## ✅ Checklist Khắc Phục

### Critical (Bắt buộc trước khi deploy production)

- [ ] Thay đổi JWT_SECRET thành random 256-bit key
- [ ] Thay đổi database password thành strong password (32+ chars)
- [ ] Sử dụng Sealed Secrets hoặc External Secrets cho K8s
- [ ] Thêm JWT Authentication Guard cho tất cả protected endpoints

### High (Khắc phục trong 1 tuần)

- [ ] Tăng password requirements lên min 12 chars + complexity
- [ ] Implement rate limiting (ThrottlerModule)
- [ ] Thêm input validation cho tất cả DTOs
- [ ] Cấu hình CORS whitelist cụ thể
- [ ] Enable HTTPS/TLS + HSTS headers
- [ ] Implement CSRF protection

### Medium (Khắc phục trong 2 tuần)

- [ ] Thêm request/response logging middleware
- [ ] Implement password reset với token expiration
- [ ] Thêm account lockout sau 5 failed attempts
- [ ] Implement email verification
- [ ] Thêm pagination cho list endpoints

### Low (Khắc phục khi có thời gian)

- [ ] Cài đặt Helmet middleware với full config
- [ ] Thêm request ID tracking
- [ ] Sanitize sensitive data trong logs
- [ ] Implement API versioning strategy

---

## 📚 Tài Liệu Tham Khảo

- [OWASP Top 10 2021](https://owasp.org/Top10/)
- [NestJS Security Best Practices](https://docs.nestjs.com/security/authentication)
- [CWE Top 25 Most Dangerous Software Weaknesses](https://cwe.mitre.org/top25/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)

---

## 🎓 Kết Luận Từ Giảng Viên

**Đánh giá chung:** Project có foundation tốt nhưng **KHÔNG NÊN deploy production** cho đến khi fix ít nhất tất cả lỗ hổng CRITICAL.

**Điểm mạnh:**
- ✅ Sử dụng bcrypt cho password hashing
- ✅ Prisma ORM ngăn SQL injection
- ✅ Zod validation cho inputs
- ✅ Modern tech stack

**Cần cải thiện:**
- ❌ Authentication/Authorization chưa đầy đủ
- ❌ Secrets management chưa đúng cách
- ❌ Thiếu nhiều security best practices

**Khuyến nghị:** Hoàn thành checklist Critical + High trước khi demo đồ án.
