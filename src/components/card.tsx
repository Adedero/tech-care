import Image from "next/image";
import Icon from "@/components/icon";

interface CardProps {
  header?: string;
  headerIcon?: string;
  headerClassName?: string;
  headerImage?: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
  className?: string;
  children?: React.ReactNode;
}

export default function Card(props: CardProps) {
  return (
    <div className={`bg-[--unnamed-color-ffffff] rounded-[16px] overflow-hidden ${props.className}`}>
      <header
        className={
          `card-title-24pt py-3 px-4 flex items-center ${props.headerIcon ? 'flex-col justify-between' : ''} ${props.headerClassName}`
        }
      >
        {props.headerImage &&
          (
            <div className="w-fit mb-3 grid place-content-center">
              <Image
                width={props.headerImage.width}
                height={props.headerImage.height}
                src={props.headerImage.src}
                alt={props.headerImage.alt}
              />
            </div>
          )
        }
        <p>{props.header}</p>
        {props.headerIcon && (<Icon icon={props.headerIcon} />)}
      </header>

      {props.children}

    </div>
  );
}
