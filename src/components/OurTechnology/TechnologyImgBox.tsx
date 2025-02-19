interface TechnologyImgBoxProps {
  bgImage: string;
}

export const TechnologyImgBox: React.FC<TechnologyImgBoxProps> = ({
  bgImage,
}) => {
  return (
    <div
      className="py-60 bg-no-repeat bg-cover bg-fixed"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* ourTechnolgyimg */}
    </div>
  );
};
