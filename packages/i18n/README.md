# @kgcentral/i18n

Package đa ngôn ngữ cho KGCentral, xây dựng trên **i18next**.

## Ngôn ngữ hỗ trợ

- 🇻🇳 **Tiếng Việt** (`vi`) - mặc định
- 🇬🇧 **English** (`en`)

## Sử dụng

```typescript
import { initI18n } from '@kgcentral/i18n';

const i18n = await initI18n();

i18n.t('common:appName');      // "KGCentral"
i18n.t('common:loading');      // "Đang tải..."
i18n.t('auth:login');          // "Đăng nhập"

// Chuyển ngôn ngữ
await i18n.changeLanguage('en');
i18n.t('common:loading');      // "Loading..."
```

## Namespaces

### `common` (mặc định)

| Key | vi | en |
|-----|----|----|
| `appName` | KGCentral | KGCentral |
| `loading` | Đang tải... | Loading... |
| `error` | Đã xảy ra lỗi | An error occurred |
| `retry` | Thử lại | Retry |
| `save` | Lưu | Save |
| `cancel` | Hủy | Cancel |
| `confirm` | Xác nhận | Confirm |
| `delete` | Xóa | Delete |
| `edit` | Sửa | Edit |
| `create` | Tạo | Create |
| `search` | Tìm kiếm | Search |
| `noData` | Không có dữ liệu | No data |
| `success` | Thành công | Success |
| `failed` | Thất bại | Failed |

### `nav`

| Key | vi | en |
|-----|----|----|
| `home` | Trang chủ | Home |
| `dashboard` | Bảng điều khiển | Dashboard |
| `settings` | Cài đặt | Settings |
| `profile` | Hồ sơ | Profile |
| `logout` | Đăng xuất | Logout |

### `auth`

| Key | vi | en |
|-----|----|----|
| `login` | Đăng nhập | Login |
| `register` | Đăng ký | Register |
| `logout` | Đăng xuất | Logout |
| `email` | Email | Email |
| `password` | Mật khẩu | Password |
| `forgotPassword` | Quên mật khẩu? | Forgot password? |
| `noAccount` | Chưa có tài khoản? | Don't have an account? |
| `hasAccount` | Đã có tài khoản? | Already have an account? |

## Sử dụng bởi

- `@kgcentral/backend`
