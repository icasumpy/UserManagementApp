# UserManagementApp

Ứng dụng quản lý người dùng viết bằng **React Native + Expo Router + Firebase**.

> Trạng thái hiện tại: **scaffold ban đầu**. Các màn hình CRUD, luồng xác thực hoàn chỉnh và giao diện cuối cùng chưa được triển khai.

## Tính năng dự kiến

- Đăng ký / đăng nhập / đăng xuất bằng Firebase Authentication.
- Dashboard quản trị.
- Xem danh sách người dùng.
- Thêm, sửa, xóa hồ sơ người dùng.
- Chọn và upload ảnh đại diện.

## Công nghệ

- Expo SDK 58
- React Native 0.88
- React 19
- Expo Router 58
- Firebase JS SDK 13 (Authentication, Firestore, Storage)
- JavaScript / JSX cho phần code mới

## Yêu cầu môi trường

- Node.js LTS và npm.
- Một project Firebase đã bật Authentication, Firestore và Storage.
- File `.env` ở thư mục gốc (không commit).

Các biến môi trường cần có:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=...
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
EXPO_PUBLIC_FIREBASE_APP_ID=...
```

Không đưa giá trị thật của `.env` lên Git hoặc vào tài liệu.

## Chạy dự án

```bash
npm install
npx expo start
```

Sau đó chọn:

- `a` để mở Android emulator/thiết bị Android.
- `i` để mở iOS simulator (macOS).
- `w` để mở web.
- Quét mã QR để mở bằng Expo Go nếu không dùng native module bổ sung.

### Kiểm tra

```bash
npx tsc --noEmit
npx expo-doctor
```

> Lưu ý: typecheck hiện còn lỗi có sẵn trong component template `src/components/app-tabs.web.tsx` (không thuộc phạm vi scaffold). Xem mục "Vấn đề cần xử lý tiếp theo" trong [PROGRESS.md](./PROGRESS.md).

Nếu dự án đã cấu hình ESLint:

```bash
npx expo lint
```

## Cấu trúc thư mục

```text
src/
  app/                     # Expo Router routes
    _layout.tsx            # Root layout template hiện tại
    index.tsx              # Màn hình template hiện tại
    login.jsx
    register.jsx
    (admin)/
      _layout.jsx
      dashboard.jsx
      users.jsx
      add-user.jsx
      edit-user/
        [id].jsx
  components/              # Component dùng chung
  services/                # Firebase, auth, user, storage
  hooks/                   # Hook dùng chung
  constants/               # Màu sắc, theme
assets/
  images/
  icons/
```

Template hiện tại dùng `src/app/` thay vì `app/` ở root. Không tạo thêm thư mục route thứ hai.

## Bản đồ route

| Route | Trạng thái |
| --- | --- |
| `/` | Màn hình template Expo hiện tại |
| `/login` | Scaffold |
| `/register` | Scaffold |
| `/dashboard` (nhóm `(admin)`) | Scaffold |
| `/users` (nhóm `(admin)`) | Scaffold |
| `/add-user` (nhóm `(admin)`) | Scaffold |
| `/edit-user/[id]` (nhóm `(admin)`) | Scaffold |

> Các route mới chưa được gắn vào root navigator. Root layout template vẫn dùng `NativeTabs` và chỉ khai báo tab `index`, `explore`; cần refactor root layout sang `Stack` cùng auth guard ở bước tiếp theo.

## Dữ liệu người dùng

Chỉ sử dụng các trường:

- `username`
- `email`
- `image`

`password` chỉ gửi tới Firebase Authentication, không lưu trong Firestore. Document Firestore dùng UID của tài khoản làm ID, không thêm trường `role`, `status`, `createdAt`... khi chưa có yêu cầu.

## Dịch vụ và trạng thái triển khai

- `src/services/firebase.js`: khởi tạo app, Auth, Firestore, Storage từ biến môi trường.
- `src/services/authService.js`: scaffold, chưa triển khai.
- `src/services/userService.js`: scaffold, chưa triển khai CRUD.
- `src/services/storageService.js`: scaffold, chưa upload ảnh.
- `src/hooks/useAuth.js`: theo dõi trạng thái đăng nhập Firebase.
- Các component `CustomButton`, `CustomInput`, `UserCard`, `Loading` là nền tảng UI, chưa được dùng trong màn hình thật.

## Giới hạn hiện tại

- Chưa có CRUD người dùng.
- Chưa có luồng đăng nhập/đăng ký hoàn chỉnh.
- Chưa có Firestore/Storage Security Rules.
- Chưa có giao diện hoàn chỉnh hoặc validation đầy đủ.
- Chưa có test.

Xem thêm [PROGRESS.md](./PROGRESS.md) và [AGENTS.md](./AGENTS.md).

## Tài liệu tham khảo

- Expo: https://docs.expo.dev/
- Expo Router: https://docs.expo.dev/router/introduction/
- Firebase JS SDK: https://firebase.google.com/docs/web/setup
- Cloud Firestore: https://firebase.google.com/docs/firestore
- Firebase Storage: https://firebase.google.com/docs/storage
