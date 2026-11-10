import { useLocalSearchParams } from 'expo-router';

import PlaceholderScreen from '@/components/PlaceholderScreen';

export default function EditUserScreen() {
  const { id } = useLocalSearchParams();

  return (
    <PlaceholderScreen
      description={`Màn hình chỉnh sửa hồ sơ có id "${id ?? ''}" sẽ được triển khai ở giai đoạn CRUD.`}
      title="Chỉnh sửa người dùng"
    />
  );
}
