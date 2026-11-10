/**
 * Lớp dịch vụ quản lý hồ sơ người dùng (Cloud Firestore).
 *
 * Đây là scaffold, chưa triển khai CRUD.
 *
 * Quy ước dữ liệu:
 * - ID document là UID của Firebase Authentication, không lưu lại thành field.
 * - Document người dùng chỉ chứa: username, email, image.
 * - password do Firebase Authentication quản lý, không lưu trong Firestore.
 */

const NOT_IMPLEMENTED_MESSAGE = 'Chức năng quản lý người dùng chưa được triển khai.';

function notImplemented() {
  throw new Error(NOT_IMPLEMENTED_MESSAGE);
}

/**
 * Lấy danh sách hồ sơ người dùng.
 *
 * @returns {Promise<Array<{ id: string, username: string, email: string, image: string }>>}
 */
export function getUsers() {
  return notImplemented();
}

/**
 * Lấy một hồ sơ người dùng theo UID.
 *
 * @param {string} _uid
 * @returns {Promise<{ id: string, username: string, email: string, image: string } | null>}
 */
export function getUserById(_uid) {
  return notImplemented();
}

/**
 * Tạo document hồ sơ sau khi tài khoản Authentication đã được tạo.
 *
 * @param {string} _uid
 * @param {{ username: string, email: string, image?: string }} _profile
 * @returns {Promise<void>}
 */
export function createUserProfile(_uid, _profile) {
  return notImplemented();
}

/**
 * Cập nhật hồ sơ người dùng.
 *
 * @param {string} _uid
 * @param {{ username?: string, email?: string, image?: string }} _profile
 * @returns {Promise<void>}
 */
export function updateUserProfile(_uid, _profile) {
  return notImplemented();
}

/**
 * Xóa hồ sơ người dùng.
 * Việc xóa tài khoản Authentication cần được xử lý riêng ở tầng xác thực.
 *
 * @param {string} _uid
 * @returns {Promise<void>}
 */
export function deleteUserProfile(_uid) {
  return notImplemented();
}

const userService = {
  getUsers,
  getUserById,
  createUserProfile,
  updateUserProfile,
  deleteUserProfile,
};

export default userService;
