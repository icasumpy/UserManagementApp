/**
 * Lớp dịch vụ xác thực (Firebase Authentication).
 *
 * Đây là scaffold: các hàm bên dưới chưa được triển khai để tránh vô tình
 * thay đổi luồng đăng nhập khi dự án chưa hoàn thiện giao diện.
 *
 * Quy ước dữ liệu:
 * - password chỉ được gửi tới Firebase Authentication, KHÔNG lưu vào Firestore.
 * - Hồ sơ người dùng chỉ gồm username, email và image.
 */

const NOT_IMPLEMENTED_MESSAGE = 'Chức năng xác thực chưa được triển khai.';

function notImplemented() {
  throw new Error(NOT_IMPLEMENTED_MESSAGE);
}

/**
 * Đăng ký tài khoản bằng email/password.
 *
 * @param {{ email: string, password: string, username: string }} _payload
 * @returns {Promise<unknown>}
 */
export function register(_payload) {
  return notImplemented();
}

/**
 * Đăng nhập bằng email/password.
 *
 * @param {{ email: string, password: string }} _credentials
 * @returns {Promise<unknown>}
 */
export function login(_credentials) {
  return notImplemented();
}

/** Đăng xuất khỏi Firebase Authentication. */
export function logout() {
  return notImplemented();
}

/**
 * Gửi email đặt lại mật khẩu.
 *
 * @param {string} _email
 * @returns {Promise<void>}
 */
export function resetPassword(_email) {
  return notImplemented();
}

/**
 * Đăng ký theo dõi trạng thái đăng nhập.
 * Trả về hàm unsubscribe khi được triển khai.
 *
 * @param {(user: unknown) => void} _callback
 * @returns {() => void}
 */
export function subscribeToAuthState(_callback) {
  return notImplemented();
}

const authService = {
  register,
  login,
  logout,
  resetPassword,
  subscribeToAuthState,
};

export default authService;
