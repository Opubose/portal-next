interface PageTitleProps {
  handleGoBack: () => void;
}

export default function PageTitle({ handleGoBack }: PageTitleProps) {
  return (
    <div className="flex gap-x-4 items-center my-5">
      <div className="cursor-pointer" onClick={() => handleGoBack()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="size-8"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-white font-Gilroy">Add Director</h1>
    </div>
  );
}
