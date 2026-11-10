# AGENTS.md

Tài liệu hướng dẫn cho AI agent và lập trình viên làm việc trong repository này.

## 1. Tổng quan dự án

**UserManagementApp** là ứng dụng quản lý người dùng xây dựng bằng React Native + Expo Router + Firebase. Ứng dụng hướng tới hai nhóm màn hình:

- Xác thực: đăng nhập, đăng ký.
- Quản trị: dashboard, danh sách người dùng, thêm/sửa người dùng.

Trạng thái hiện tại là **scaffold ban đầu**. Chưa triển khai CRUD, chưa hoàn thiện giao diện và chưa nối luồng xác thực vào điều hướng.

## 2. Công nghệ

| Thành phần | Phiên bản / ghi chú |
| --- | --- |
| Expo SDK | 58.0.23 |
| React Native | 0.88.1 |
| React | 19.3.0 |
| Expo Router | 58.0.30 |
| Firebase JS SDK | 13.2.0 (Auth, Firestore, Storage) |
| Ngôn ngữ | JavaScript + JSX cho code mới; template gốc vẫn là TypeScript |
| Package manager | npm (`package-lock.json`) |
| Lưu trữ cục bộ | `@react-native-async-storage/async-storage` |
| Chọn ảnh | `expo-image-picker` |

Không tự ý thêm dependency. Nếu thật sự cần, ưu tiên module chính thức của Expo và cài bằng `npx expo install <package>` để chọn đúng phiên bản tương thích SDK.

## 3. Expo thay đổi theo từng SDK — không dựa vào trí nhớ

Trước khi viết code liên quan tới Expo, EAS hoặc React Native API:

1. Đọc phiên bản `expo` trong `package.json`.
2. Mở tài liệu đúng phiên bản: `https://docs.expo.dev/versions/v58.0.0/`.
3. Tra cứu thêm tại `https://docs.expo.dev/llms.txt` và đi tới trang cụ thể cần dùng. Không trả lời API từ ký ức.

Tài liệu liên quan:

- Expo Router: https://docs.expo.dev/router/introduction.md
- Native Tabs (SDK 58): https://docs.expo.dev/router/advanced/native-tabs.md
- Firebase JS SDK: https://firebase.google.com/docs/web/setup

## 4. Kiến trúc thư mục

Template hiện tại dùng `src/app/` làm thư mục route gốc. **Không tạo thêm `app/` ở root**, vì Expo Router sẽ có hai thư mục route và dễ gây xung đột. Cấu trúc `app/` trong yêu cầu ban đầu được ánh xạ sang `src/app/`.

```text
src/
  app/
    _layout.tsx              # Root layout hiện tại (template NativeTabs)
    index.tsx                # Màn hình template hiện tại
    login.jsx                # Route scaffold
    register.jsx             # Route scaffold
    (admin)/
      _layout.jsx            # Stack cho nhóm quản trị
      dashboard.jsx
      users.jsx
      add-user.jsx
      edit-user/
        [id].jsx
  components/
    CustomButton.jsx
    CustomInput.jsx
    UserCard.jsx
    Loading.jsx
    PlaceholderScreen.jsx    # Khung tạm dùng cho các route scaffold
    ...                      # Component template TypeScript hiện có
  services/
    firebase.js
    authService.js
    userService.js
    storageService.js
  hooks/
    useAuth.js
    ...                      # Hook template hiện có
  constants/
    colors.js
    theme.ts                 # Theme template hiện có
assets/
  images/
  icons/
```

Quy tắc:

- Mọi file trong `src/app/` là route. Không đặt logic nghiệp vụ, service hoặc component dùng chung trong thư mục này.
- `_layout` định nghĩa navigator; route group `(admin)` không xuất hiện trong URL.
- Component dùng chung đặt trong `src/components/`.
- Import nội bộ dùng alias `@/` trỏ tới `src/`.

### Hiện trạng điều hướng

Root layout `src/app/_layout.tsx` vẫn dùng `NativeTabs` của template và chỉ khai báo tab `index`, `explore`. Các route `login`, `register`, `(admin)/*` đã có file nhưng **chưa được gắn vào navigator**. Không tự ý xóa/ghi đè layout template; việc chuyển root layout sang `Stack` và thêm auth guard là một bước riêng cần được xác nhận.

## 5. Quy ước code

- Code mới dùng JavaScript/JSX (`.js`, `.jsx`). Không chuyển các file template `.ts`/`.tsx` sang JS nếu chưa được yêu cầu.
- Component React dùng function component; tên file và tên component dùng PascalCase: `CustomButton.jsx`.
- Hook bắt đầu bằng `use`: `useAuth.js`.
- Route đặt tên kebab-case theo URL: `add-user.jsx`; dynamic route dùng `[id].jsx`.
- Dùng 2 khoảng trắng thụt lề, dấu nháy đơn, có dấu chấm phẩy cuối câu lệnh.
- Không viết JSX quá lớn trong route; tách component và hook khi có logic.
- Xử lý đủ trạng thái loading, rỗng và lỗi khi triển khai chức năng.
- Ưu tiên `Pressable`/component RN có sẵn; thêm `accessibilityRole`, `accessibilityLabel`, `accessibilityState` cho phần tử tương tác.
- Không dùng `any` mới trong file TypeScript; không thêm TypeScript cho code mới nếu không cần.
- Không đặt secret, API key thật hoặc thông tin tài khoản trong source code, comment hay tài liệu.

## 6. Dữ liệu người dùng

Chỉ cho phép các trường sau:

```js
{
  username: string,
  email: string,
  image: string,
}
```

Quy ước bắt buộc:

- `password` chỉ gửi tới Firebase Authentication, **không lưu vào Firestore** và không hiển thị lại.
- Không thêm `role`, `status`, `createdAt`, `updatedAt`, `phone`, `address`... nếu chưa được yêu cầu rõ ràng.
- ID document Firestore là UID của Firebase Authentication, không lưu UID thành field.
- `image` lưu URL ảnh trên Firebase Storage; đường dẫn dự kiến `users/{uid}/avatar.<ext>`.
- Việc phân quyền admin hiện chỉ là route group `(admin)`, chưa phải trường dữ liệu.

## 7. Firebase

- Cấu hình chỉ đọc từ biến môi trường `EXPO_PUBLIC_*` trong `.env`.
- **Không sửa `.env`**, không hardcode cấu hình Firebase, không đổi project Firebase nếu chưa được yêu cầu.
- Không commit `.env`; chỉ tài liệu hóa tên biến.
- Khởi tạo Firebase tập trung tại `src/services/firebase.js`.
- Mọi thao tác Firestore/Auth/Storage đặt trong `src/services/`, không gọi trực tiếp rải rác trong màn hình.
- Các service hiện là scaffold và sẽ throw lỗi "chưa triển khai" nếu được gọi. Đây là chủ ý.
- Khi triển khai thật, cần cấu hình Firestore Security Rules và Storage Rules. Không để rules mở công khai.

Các biến môi trường đang được dùng:

```text
EXPO_PUBLIC_FIREBASE_API_KEY
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN
EXPO_PUBLIC_FIREBASE_PROJECT_ID
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
EXPO_PUBLIC_FIREBASE_APP_ID
```

## 8. Bảo mật và xử lý lỗi

- Không log token, mật khẩu, nội dung `.env` hoặc dữ liệu nhạy cảm.
- Thông báo lỗi cho người dùng phải thân thiện; log kỹ thuật có thể giữ ở mức `console.warn`/`console.error` trong development.
- Xác thực dữ liệu đầu vào trước khi gọi service (email, mật khẩu, username, kích thước/định dạng ảnh).
- Không bỏ qua lỗi của Firebase; luôn có nhánh xử lý và trạng thái UI tương ứng.
- Không dùng mật khẩu mặc định hoặc thông tin đăng nhập mẫu trong code production.

## 9. Quy tắc thay đổi file

- Đọc `git status` trước khi sửa để tránh ghi đè thay đổi chưa commit của người dùng.
- Không xóa/ghi đè các file template đang hoạt động nếu chưa được yêu cầu.
- Không chỉnh `package.json`, `package-lock.json`, `app.json`, `.env`, `.gitignore` khi chỉ làm scaffold.
- Khi cần thay đổi cấu hình native, sửa `app.json` hoặc config plugin; không tạo/sửa tay thư mục `ios/`, `android/` (Continuous Native Generation).
- Giữ thay đổi nhỏ, đúng phạm vi; không refactor ngoài yêu cầu.

## 10. Lệnh và kiểm tra

```bash
npm install                 # cài dependency
npx expo start              # chạy dev server
npx tsc --noEmit            # kiểm tra TypeScript của các file hiện có
npx expo-doctor             # kiểm tra cấu hình/dependency
```

Khi ESLint đã được cấu hình trong dự án:

```bash
npx expo lint
```

Lưu ý: `npx expo lint` có thể đề nghị cài ESLint nếu dự án chưa có cấu hình. Không cài thêm package chỉ để làm scaffold khi chưa được yêu cầu.

Trước khi báo hoàn thành một thay đổi:

1. `npx tsc --noEmit` phải pass (nếu thay đổi có ảnh hưởng TS).
2. Kiểm tra bundle/route nếu thêm route mới.
3. Ghi rõ phần đã làm, phần chưa làm và rủi ro còn lại.
4. Cập nhật `PROGRESS.md` khi thay đổi trạng thái milestone.

## 11. Định nghĩa hoàn thành

Một chức năng chỉ được coi là hoàn thành khi:

- Có giao diện sử dụng được trên mobile và không vỡ layout cơ bản.
- Có loading, empty state, error state.
- Dữ liệu người dùng tuân thủ đúng ba trường `username`, `email`, `image`.
- Service tương ứng đã được triển khai và không còn throw "chưa triển khai".
- Có kiểm tra typecheck/lint phù hợp và không tạo lỗi mới.
