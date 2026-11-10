# PROGRESS.md

Cập nhật lần cuối: 2026-11-10

## Trạng thái tổng quan

**Giai đoạn:** Scaffold ban đầu  
**CRUD:** Chưa triển khai  
**Giao diện hoàn chỉnh:** Chưa triển khai  
**Cấu hình Firebase:** Giữ nguyên, chỉ đọc từ `.env`

## Đã hoàn thành

- [x] Kiểm tra cấu trúc dự án và các file cấu hình hiện có.
- [x] Xác định Expo SDK 58, Expo Router 58 và Firebase 13.2.0 đã được cài.
- [x] Ánh xạ cấu trúc `app/` yêu cầu sang `src/app/` của template hiện tại.
- [x] Tạo các route scaffold: `login`, `register`, `(admin)/dashboard`, `(admin)/users`, `(admin)/add-user`, `(admin)/edit-user/[id]`.
- [x] Tạo `(admin)/_layout.jsx` bằng `Stack` của Expo Router.
- [x] Tạo component nền: `CustomButton`, `CustomInput`, `UserCard`, `Loading`, `PlaceholderScreen`.
- [x] Tạo `constants/colors.js`.
- [x] Tạo scaffold dịch vụ Firebase: `firebase.js`, `authService.js`, `userService.js`, `storageService.js`.
- [x] Tạo hook `useAuth` theo dõi trạng thái Firebase Authentication.
- [x] Tạo thư mục `assets/icons/` (có `.gitkeep`).
- [x] Cập nhật `AGENTS.md`, tạo `PROGRESS.md`, cập nhật `README.md`.
- [x] Không cài thêm package, không sửa `.env`, `package.json`, `app.json`, `.gitignore`.
- [x] `npx expo install --check`: dependencies đang tương thích.
- [x] `npx expo export --platform web`: bundle thành công, tất cả route scaffold được nhận diện.

## File đã giữ nguyên

Các file template đang hoạt động và file cấu hình:

- `src/app/_layout.tsx`
- `src/app/index.tsx`
- `src/app/explore.tsx`
- Toàn bộ component/hook/theme TypeScript có sẵn trong `src/`
- `package.json`, `package-lock.json`
- `app.json`, `.env`, `.gitignore`, `tsconfig.json`
- `assets/images/*`

Không tạo `src/app/_layout.jsx` hoặc `src/app/index.jsx` vì:

1. Root route thực tế là `src/app/`, không phải `app/` ở root.
2. `_layout.tsx` và `index.tsx` đã tồn tại và đang hoạt động; tạo file cùng route khác extension sẽ gây xung đột.
3. Yêu cầu hiện tại là không xóa/ghi đè file đang hoạt động.

## Chưa triển khai

- [ ] Chuyển root layout từ NativeTabs template sang Stack và gắn các route mới.
- [ ] Auth guard / redirect theo trạng thái đăng nhập.
- [ ] Đăng ký, đăng nhập, đăng xuất, đặt lại mật khẩu.
- [ ] Tạo Firestore profile sau khi đăng ký.
- [ ] CRUD người dùng (đọc danh sách, thêm, sửa, xóa).
- [ ] Chọn và upload ảnh đại diện.
- [ ] Firestore Security Rules và Storage Rules.
- [ ] Giao diện hoàn chỉnh cho tất cả màn hình.
- [ ] Validation và xử lý lỗi chi tiết.
- [ ] Kiểm thử, cấu hình ESLint (nếu cần).
- [ ] Kiểm tra `.env` trên môi trường build/EAS.

## Vấn đề cần xử lý tiếp theo

1. **Điều hướng chưa được nối:** root layout hiện tại là `NativeTabs` và chỉ có tab `index`, `explore`. Các route `login`, `register`, `(admin)/*` chưa hiển thị hoặc không thể điều hướng tới.
2. **Template TypeScript còn tồn tại:** code mới là JS/JSX, nhưng template gốc vẫn là TS/TSX. Cần quyết định thời điểm chuyển đổi hoặc giữ nguyên.
3. **Service chỉ là scaffold:** gọi `authService`, `userService`, `storageService` sẽ throw lỗi "chưa triển khai".
4. **Firebase chưa có rules:** chưa thể coi dữ liệu là an toàn cho production.
5. **Password không lưu Firestore:** chỉ lưu `username`, `email`, `image`; password do Firebase Auth xử lý.
6. **`useAuth` cần được kiểm tra trên thiết bị thật:** hook mới chỉ theo dõi auth state, chưa có màn hình sử dụng.
7. **Chưa có ESLint config:** `npx expo lint` có thể yêu cầu cài thêm package; chỉ thực hiện khi có yêu cầu.
8. **Chưa kiểm tra giá trị `.env`:** các biến môi trường đã có tên đúng, nhưng chưa xác minh project Firebase/rules/Storage bucket hoạt động.
9. **Typecheck còn lỗi template có sẵn:** `npx tsc --noEmit` báo lỗi type tại `src/components/app-tabs.web.tsx` (prop `ref` của `Pressable`/`TabTriggerSlotProps`). File này không thuộc phạm vi scaffold và chưa được sửa để tránh ghi đè code template đang hoạt động. Các file JS/JSX mới đã được bundle thành công.
10. **Chưa có phân quyền admin:** route group `(admin)` chỉ là tổ chức thư mục, không bảo vệ quyền truy cập. Nếu cần phân quyền thật, nên dùng Firebase Custom Claims thay vì thêm trường `role` vào hồ sơ người dùng.

## Milestone tiếp theo

- [ ] Milestone 1: Refactor root Stack + auth guard + nối route.
- [ ] Milestone 2: Hoàn thiện auth flow.
- [ ] Milestone 3: CRUD người dùng và upload ảnh.
- [ ] Milestone 4: Rules, validation, testing, UI polish.

## Quyết định kỹ thuật đã chốt

- Giữ `src/app/` làm route root theo template Expo SDK 58.
- Code mới dùng JavaScript/JSX.
- Dùng Firebase modular SDK v13.
- Không mở rộng schema người dùng ngoài `username`, `email`, `password`, `image`.
- `password` chỉ dùng cho Authentication; Firestore chỉ lưu `username`, `email`, `image`.
- Không thay đổi cấu hình Firebase trong `.env`/`app.json`.
