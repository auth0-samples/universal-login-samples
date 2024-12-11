export const PasskeyButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button
      onClick={onClick}
      className="w-full bg-gray-600 text-white py-2 px-4 rounded-md border border-gray-500 hover:bg-gray-700 transition duration-300 flex items-center justify-center"
    >
      <svg
        className="w-5 h-5 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          d="M12 11c1.65 0 3-1.35 3-3s-1.35-3-3-3-3 1.35-3 3 1.35 3 3 3zm0 2c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0 2c3.13 0 6 1.57 6 2v1H6v-1c0-.43 2.87-2 6-2z"
          fill="currentColor"
        />
      </svg>
      Continue with passkeys
    </button>
  );