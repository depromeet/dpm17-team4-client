import type { DefecationTryShapeKey } from "../types";

//NOTE(taehyeon): 아이콘 assets 작업 완료 시 추후 변경

const getRealShapeIcon = (shape: DefecationTryShapeKey) => {
	switch (shape) {
		case "RABBIT":
			return <div className="w-9 h-9 bg-gray-600" />;
		case "STONE":
			return <div className="w-9 h-9 bg-gray-600" />;
		case "CORN":
			return <div className="w-9 h-9 bg-gray-600" />;
		case "BANANA":
			return <div className="w-9 h-9 bg-gray-600" />;
		case "CREAM":
			return <div className="w-9 h-9 bg-gray-600" />;
		case "PORRIDGE":
			return <div className="w-9 h-9 bg-gray-600" />;
		default:
			return null;
	}
};

const getEmojiShapeIcon = (shape: DefecationTryShapeKey) => {
	switch (shape) {
		case "RABBIT":
			return <div className="w-9 h-9 bg-gray-600" />;
		case "STONE":
			return <div className="w-9 h-9 bg-gray-600" />;
		case "CORN":
			return <div className="w-9 h-9 bg-gray-600" />;
		case "BANANA":
			return <div className="w-9 h-9 bg-gray-600" />;
		case "CREAM":
			return <div className="w-9 h-9 bg-gray-600" />;
		case "PORRIDGE":
			return <div className="w-9 h-9 bg-gray-600" />;
		default:
			return null;
	}
};

export { getRealShapeIcon, getEmojiShapeIcon };
