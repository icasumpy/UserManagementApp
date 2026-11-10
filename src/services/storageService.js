/**
 * Lớp dịch vụ lưu trữ ảnh người dùng (Firebase Storage + expo-image-picker).
 *
 * Đây là scaffold, chưa triển khai chọn/upload/xóa ảnh.
 * Đường dẫn dự kiến: users/{uid}/avatar.<extension>
 */

const NOT_IMPLEMENTED_MESSAGE = 'Chức năng lưu trữ ảnh chưa được triển khai.';

function notImplemented() {
  throw new Error(NOT_IMPLEMENTED_MESSAGE);
}

/**
 * Mở thư viện ảnh và trả về URI ảnh đã chọn.
 *
 * @returns {Promise<string | null>}
 */
export function pickImageFromLibrary() {
  return notImplemented();
}

/**
 * Upload ảnh đại diện của người dùng lên Firebase Storage.
 *
 * @param {string} _uid
 * @param {string} _localUri
 * @returns {Promise<string>} URL tải ảnh.
 */
export function uploadUserImage(_uid, _localUri) {
  return notImplemented();
}

/**
 * Xóa ảnh đại diện của người dùng khỏi Firebase Storage.
 *
 * @param {string} _uid
 * @returns {Promise<void>}
 */
export function deleteUserImage(_uid) {
  return notImplemented();
}

const storageService = {
  pickImageFromLibrary,
  uploadUserImage,
  deleteUserImage,
};

export default storageService;
