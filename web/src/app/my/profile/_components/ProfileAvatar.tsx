'use client';

import { CameraIcon } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import defaultProfileImage from '@/assets/my/profile-image-1.png';

interface ProfileAvatarProps {
  currentImage?: string;
  onImageChange?: (imageUrl: string) => void;
}

export const ProfileAvatar = ({
  currentImage,
  onImageChange,
}: ProfileAvatarProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(
    currentImage || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 파일 타입 검증
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 선택할 수 있습니다.');
        return;
      }

      // 파일 크기 검증 (5MB 제한)
      if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB 이하여야 합니다.');
        return;
      }

      // 이미지 미리보기 생성
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewImage(result);
        onImageChange?.(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center py-8">
      <div className="relative">
        <button
          type="button"
          className="w-[4.5rem] h-[4.5rem] rounded-full overflow-hidden cursor-pointer"
          onClick={handleAvatarClick}
        >
          <Image
            src={previewImage || defaultProfileImage}
            alt="Profile"
            width={72}
            height={72}
            className="w-[4.5rem] h-[4.5rem] rounded-full object-cover"
          />
        </button>
        <button
          type="button"
          className="absolute -bottom-0.5 -right-0.5 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors"
          onClick={handleAvatarClick}
        >
          <CameraIcon className="w-4 h-4 text-white" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};
