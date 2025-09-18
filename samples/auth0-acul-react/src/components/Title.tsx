interface TitleProps {
  screenTexts: {
    title?: string;
    description?: string;
  };
}

export const Title: React.FC<TitleProps> = ({ screenTexts }) => (
  <div>
    <h2 className="text-center text-xl font-semibold text-gray-900">
      {screenTexts?.title}
    </h2>
    <p className="mt-2 text-center text-sm text-gray-500">
      {screenTexts?.description}
    </p>
  </div>
); 