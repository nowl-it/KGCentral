# ĐỒ ÁN TỐT NGHIỆP
# Đề tài: Xây dựng nền tảng quản lý tập trung tích hợp AI cho thiết bị IoT Edge Computing

---

## 1. Đặt Vấn Đề

### 1.1. Bối cảnh

Trong bối cảnh chuyển đổi số mạnh mẽ, Internet of Things (IoT) đang trở thành xu hướng tất yếu trong nhiều lĩnh vực: nông nghiệp thông minh, giám sát an ninh, nhà thông minh, quản lý kho bãi, và tự động hóa công nghiệp. Theo báo cáo của Statista, số lượng thiết bị IoT trên toàn cầu dự kiến vượt **30 tỷ** vào năm 2030.

Song song đó, trí tuệ nhân tạo (AI) - đặc biệt là Computer Vision và Deep Learning - đã đạt được những bước tiến vượt bậc, cho phép máy tính nhận dạng hình ảnh, phát hiện vật thể, và phân loại dữ liệu với độ chính xác cao.

Tuy nhiên, việc triển khai AI trên thiết bị edge (biên) như Raspberry Pi vẫn còn nhiều thách thức:

- **Tài nguyên hạn chế**: RAM ít (1–8 GB), không có GPU chuyên dụng, CPU tốc độ thấp.
- **Quản lý phân tán**: Khi có nhiều thiết bị, việc cập nhật model, giám sát trạng thái, và thu thập kết quả trở nên phức tạp.
- **Thiếu giao diện quản lý**: Các giải pháp hiện tại thường yêu cầu thao tác qua dòng lệnh (CLI), không thân thiện với người dùng cuối.
- **Rào cản ngôn ngữ**: Phần lớn các nền tảng quốc tế chưa hỗ trợ tiếng Việt, gây khó khăn cho người dùng trong nước.

### 1.2. Vấn đề cần giải quyết

Hiện nay chưa có một nền tảng mã nguồn mở, nhẹ, hỗ trợ tiếng Việt, cho phép:

1. **Quản lý tập trung** nhiều thiết bị IoT từ một giao diện web duy nhất.
2. **Triển khai và quản lý model AI** trên các thiết bị edge một cách dễ dàng.
3. **Chạy AI inference trực tiếp trên thiết bị** (on-device) thay vì phụ thuộc cloud - giảm độ trễ, tiết kiệm băng thông, bảo mật dữ liệu.
4. **Tối ưu cho phần cứng giới hạn** của Raspberry Pi và các SBC (Single Board Computer) tương tự.

---

## 2. Mục Tiêu Đề Tài

### 2.1. Mục tiêu tổng quát

Xây dựng **KGCentral** - một nền tảng web quản lý tập trung, tích hợp dịch vụ AI inference, được thiết kế tối ưu cho các thiết bị IoT edge computing (cụ thể là Raspberry Pi), với giao diện thân thiện và hỗ trợ đa ngôn ngữ.

### 2.2. Mục tiêu cụ thể

| # | Mục tiêu | Mô tả |
|---|----------|--------|
| 1 | **Xây dựng Backend API** | REST API hoàn chỉnh với xác thực, phân quyền, quản lý người dùng |
| 2 | **Xây dựng Frontend** | Giao diện web responsive, hỗ trợ dark/light mode, đa ngôn ngữ |
| 3 | **Xây dựng AI Service** | Dịch vụ inference chạy trên CPU, hỗ trợ load/unload model linh hoạt |
| 4 | **Tối ưu cho Raspberry Pi** | Giới hạn RAM, inference trên CPU, container nhẹ |
| 5 | **Hỗ trợ tiếng Việt** | Toàn bộ giao diện và API messages song ngữ Việt–Anh |
| 6 | **Containerization & Deployment** | Docker Compose và Kubernetes (K3s) cho triển khai dễ dàng |

---

## 3. Phạm Vi Đề Tài

### 3.1. Trong phạm vi

- Xây dựng hệ thống web fullstack (Frontend + Backend + AI Service).
- Quản lý người dùng (đăng ký, đăng nhập, phân quyền Admin/User).
- Dịch vụ AI inference hỗ trợ phân loại ảnh (image classification) và phát hiện vật thể (object detection).
- Quản lý model AI: load, unload, liệt kê, xem trạng thái.
- Giao diện đa ngôn ngữ (Tiếng Việt và Tiếng Anh).
- Đóng gói và triển khai bằng Docker.
- Deploy trên Raspberry Pi thực tế.

### 3.2. Ngoài phạm vi

- Training model AI (sử dụng pre-trained models).
- Hỗ trợ GPU inference.
- Mobile application (chỉ responsive web).
- Real-time streaming video.

---

## 4. Kiến Trúc Hệ Thống

### 4.1. Tổng quan kiến trúc

Hệ thống được thiết kế theo kiến trúc **Microservices**, gồm 3 service chính giao tiếp qua REST API:

```
┌─────────────────────────────────────────────────────────┐
│                    Người dùng (Browser)                  │
└─────────────────────┬───────────────────────────────────┘
                      │
         ┌────────────▼────────────┐
         │     Frontend (Web UI)   │
         │     Next.js 15 :3000    │
         └────────┬───────┬────────┘
                  │       │
      ┌───────────▼──┐  ┌─▼──────────────┐
      │   Backend    │  │   AI Service    │
      │  NestJS :4000│  │  FastAPI :5000  │
      └──────┬───────┘  └────────┬────────┘
             │                   │
      ┌──────▼───────┐   ┌──────▼────────┐
      │  PostgreSQL  │   │  Model Files  │
      │    :5432     │   │  (on disk)    │
      └──────────────┘   └───────────────┘
```

### 4.2. Mô hình Monorepo

Toàn bộ source code được tổ chức trong một **monorepo** sử dụng pnpm workspaces và Turborepo, giúp:

- **Chia sẻ code** giữa frontend và backend (types, config, i18n).
- **Build song song** với Turborepo - tăng tốc CI/CD.
- **Quản lý phiên bản tập trung** - đảm bảo tính nhất quán.

```
KGCentral/
├── apps/               # Ứng dụng (deployable)
│   ├── frontend/       # Giao diện người dùng
│   ├── backend/        # API server
│   └── ai-service/     # Dịch vụ AI
├── packages/           # Thư viện dùng chung (internal)
│   ├── config/         # Cấu hình chung
│   ├── database/       # Prisma ORM
│   ├── i18n/           # Đa ngôn ngữ
│   ├── types/          # TypeScript types
│   └── ui/             # Design system
└── devops/             # Hạ tầng triển khai
    ├── docker/         # Dockerfiles
    └── k8s/            # Kubernetes manifests
```

---

## 5. Công Nghệ Sử Dụng

### 5.1. Frontend

| Công nghệ | Phiên bản | Vai trò |
|-----------|-----------|---------|
| Next.js | 15.x | Framework React fullstack (App Router) |
| React | 19.x | Thư viện UI |
| Tailwind CSS | 4.x | CSS utility-first framework |
| shadcn/ui | 4.x | Component library (accessible, customizable) |
| next-themes | 0.4.x | Quản lý dark/light mode |
| i18next | 24.x | Đa ngôn ngữ phía client |

### 5.2. Backend

| Công nghệ | Phiên bản | Vai trò |
|-----------|-----------|---------|
| NestJS | 11.x | Framework Node.js (architecture, DI, decorators) |
| Prisma | 6.x | ORM - type-safe database access |
| Zod | 3.x | Schema validation cho request/response |
| PostgreSQL | 17.x | Relational database |

### 5.3. AI Service

| Công nghệ | Phiên bản | Vai trò |
|-----------|-----------|---------|
| FastAPI | ≥ 0.115 | Python web framework (async, auto-docs) |
| PyTorch | ≥ 2.5 | Deep learning framework (inference) |
| Pydantic | ≥ 2.10 | Data validation & settings management |
| uvicorn | ≥ 0.34 | ASGI server |

### 5.4. DevOps

| Công nghệ | Vai trò |
|-----------|---------|
| Docker | Container hóa từng service |
| Docker Compose | Orchestration cho development |
| Kubernetes (K3s) | Orchestration cho production (lightweight) |
| Kustomize | Quản lý cấu hình K8s theo môi trường |
| Turborepo | Monorepo build system |

### 5.5. Lý do chọn công nghệ

- **Next.js 15 + React 19**: Server Components giảm JS gửi về client → nhanh hơn trên Pi.
- **NestJS**: Kiến trúc module rõ ràng, dễ mở rộng, hỗ trợ TypeScript native.
- **FastAPI**: Framework Python nhanh nhất, auto-generate API docs (Swagger/OpenAPI).
- **PyTorch**: Hệ sinh thái pre-trained models phong phú, hỗ trợ ARM (Raspberry Pi).
- **K3s**: Kubernetes nhẹ (~40MB binary), thiết kế cho IoT/edge, chạy tốt trên Raspberry Pi.
- **PostgreSQL**: Ổn định, miễn phí, có thể chạy trên Pi với cấu hình giới hạn RAM.

---

## 6. Chức Năng Chính

### 6.1. Quản lý người dùng

- Đăng ký tài khoản mới.
- Đăng nhập / Đăng xuất.
- Phân quyền: **Admin** (quản lý toàn hệ thống) và **User** (sử dụng cơ bản).
- Quản lý hồ sơ cá nhân (tên, email, ngôn ngữ ưa thích).

### 6.2. Quản lý Model AI

- Xem danh sách model đã cài đặt.
- Load / Unload model vào bộ nhớ.
- Xem thông tin model: tên, loại, phiên bản, trạng thái.

### 6.3. AI Inference

- Upload dữ liệu đầu vào (ảnh).
- Chạy inference trên model đã load.
- Nhận kết quả: prediction, confidence score, thời gian xử lý.
- Hỗ trợ: phân loại ảnh (classification), phát hiện vật thể (detection).

### 6.4. Dashboard

- Tổng quan trạng thái hệ thống.
- Thống kê: số lượng inference, tỷ lệ thành công, thời gian trung bình.
- Giám sát tài nguyên thiết bị (CPU, RAM).

### 6.5. Đa ngôn ngữ

- Giao diện hỗ trợ Tiếng Việt (mặc định) và Tiếng Anh.
- API messages song ngữ.
- Người dùng tự chọn ngôn ngữ ưa thích.

### 6.6. Giao diện

- Responsive design: hoạt động tốt trên desktop, tablet, mobile.
- Dark mode / Light mode / System theme.
- Design system nhất quán (shadcn/ui).

---

## 7. Cơ Sở Dữ Liệu

### 7.1. Sơ đồ ER

```
┌──────────────────────────────┐
│            User              │
├──────────────────────────────┤
│ id         : String (PK)    │
│ email      : String (UNIQUE)│
│ name       : String?        │
│ password   : String         │
│ role       : Role (ENUM)    │
│ locale     : String         │
│ createdAt  : DateTime       │
│ updatedAt  : DateTime       │
└──────────────────────────────┘

┌──────────────────┐
│    Role (Enum)   │
├──────────────────┤
│ ADMIN            │
│ USER             │
└──────────────────┘
```

> **Ghi chú**: Schema sẽ được mở rộng thêm các bảng: `Device`, `Model`, `InferenceLog`, `Session` trong quá trình phát triển.

### 7.2. Công nghệ

- **PostgreSQL 17** - Database engine.
- **Prisma ORM** - Type-safe query builder, auto-generate TypeScript types từ schema.
- Giới hạn RAM **256 MB** cho PostgreSQL khi chạy trên Raspberry Pi.

---

## 8. Kế Hoạch Thực Hiện

| Giai đoạn | Thời gian | Nội dung |
|-----------|-----------|----------|
| **GĐ 1: Phân tích & Thiết kế** | Tuần 1–2 | Phân tích yêu cầu, thiết kế kiến trúc, thiết kế CSDL, wireframe UI |
| **GĐ 2: Hạ tầng & Nền tảng** | Tuần 3–4 | Setup monorepo, shared packages, Docker, CI/CD |
| **GĐ 3: Backend Core** | Tuần 5–7 | Auth (JWT + bcrypt), User CRUD, API middleware, error handling |
| **GĐ 4: AI Service** | Tuần 8–10 | Tích hợp PyTorch, load model, inference pipeline, tối ưu CPU |
| **GĐ 5: Frontend** | Tuần 11–13 | Dashboard, auth pages, model management UI, inference UI |
| **GĐ 6: Tích hợp & Tối ưu** | Tuần 14–15 | Kết nối toàn bộ services, tối ưu performance cho Pi |
| **GĐ 7: Testing & Deploy** | Tuần 16–17 | Test trên Raspberry Pi thật, viết unit/integration tests |
| **GĐ 8: Hoàn thiện** | Tuần 18–20 | Viết báo cáo, chuẩn bị demo, bảo vệ |

---

## 9. Kết Quả Dự Kiến

### 9.1. Sản phẩm

1. **Hệ thống web** hoàn chỉnh chạy được trên Raspberry Pi.
2. **API documentation** tự động (Swagger/OpenAPI).
3. **Docker images** sẵn sàng deploy.
4. **Kubernetes manifests** cho triển khai production.
5. **Source code** có cấu trúc rõ ràng, có documentation.

### 9.2. Demo

- Chạy trên Raspberry Pi 4 (4 GB RAM).
- Phân loại ảnh real-time qua giao diện web.
- Quản lý model (load/unload) qua web.
- Đa ngôn ngữ Việt–Anh.

### 9.3. Đóng góp

- Cung cấp giải pháp **mã nguồn mở** cho cộng đồng edge AI tại Việt Nam.
- Chứng minh khả năng chạy AI inference trên phần cứng giới hạn.
- Mô hình tham khảo cho kiến trúc microservices trên thiết bị IoT.

---

## 10. Tài Liệu Tham Khảo

1. Next.js Documentation - https://nextjs.org/docs
2. NestJS Documentation - https://docs.nestjs.com
3. FastAPI Documentation - https://fastapi.tiangolo.com
4. PyTorch for Raspberry Pi - https://pytorch.org/tutorials
5. K3s - Lightweight Kubernetes - https://k3s.io
6. Prisma ORM Documentation - https://www.prisma.io/docs
7. shadcn/ui - https://ui.shadcn.com
8. Turborepo - https://turbo.build
9. Raspberry Pi Documentation - https://www.raspberrypi.com/documentation

---

> **Sinh viên thực hiện**: _[Họ và tên]_  
> **Mã sinh viên**: _[MSSV]_  
> **Giáo viên hướng dẫn**: _[Họ và tên GVHD]_  
> **Trường / Khoa**: _[Tên trường / khoa]_  
> **Năm**: 2026
