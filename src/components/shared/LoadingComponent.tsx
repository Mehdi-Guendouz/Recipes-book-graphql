import loader from "@/assets/loader_v2.svg";
const LoadingComponent = ({ className }: { className?: string }) => {
  return (
    <div className="flex items-center justify-center bg-transparent">
      <img src={loader} alt="" className={className} />
    </div>
  );
};

export default LoadingComponent;
