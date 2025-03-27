interface EmptyStateProps {
  title: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  icon?: React.ReactNode;
}
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function EmptyState({
  title,
  description,
  buttonText,
  buttonLink,
}: EmptyStateProps) {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
      {/* Icon Container */}
      <div className="relative mb-6">
        <div className="w-[300px] h-[300px] relative flex items-center justify-center">
          <Image
            src="/nodata.svg"
            alt="Empty State"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Content */}
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      {description && (
        <p className="text-gray-500 text-sm mb-6">{description}</p>
      )}
      {buttonText && buttonLink && (
        <Button
          onClick={() => router.push(buttonLink)}
          className="bg-appColor hover:bg-primary/90 text-white text-md font-semibold lg:w-[200px] md:w-[150px] lg:h-[50px] md:h-[40px] w-full rounded-full  transition-colors"
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
}
