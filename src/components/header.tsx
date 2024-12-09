'use client';
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Icon from "@/components/icon";
import Image from 'next/image';

const links : { id: number, path: string; name: string; icon: string }[] = [
  { id: 1, path: "/", name: "Overview", icon: "home"},
  { id: 2, path: "/patients", name: "Patients", icon: "group"},
  { id: 3, path: "/schedule", name: "Schedule", icon: "calendar"},
  { id: 4, path: "/message", name: "Message", icon: "message"},
  { id: 5, path: "transactions", name: "Transactions", icon: "credit-card"},
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="h-fit bg-[--unnamed-color-ffffff] rounded-full px-6 py-2 flex items-center justify-between">
      <div>
        <Icon icon="logo" width="160" height="auto" />
      </div>

      <nav className="flex items-center gap-3">
        {links.map(link => (
          <Link
            key={link.id}
            href={link.path}
            className={
              `body-emphasized-14pt cursor-pointer flex items-center gap-2 py-2 px-4
              ${pathname === link.path || pathname.startsWith(link.path + '/')? 'bg-[--activestate_bg_1] rounded-full' : ''}`
              }
            >
            <Icon icon={link.icon} />
            <p>{link.name}</p>
          </Link>
        ))}
      </nav>

      <div className="flex gap-3">
        <div className="flex items-center gap-3">
          <Image
            width="44"
            height="44"
            src="/assets/jose-simmons-44.png"
            alt="senior woman doctor"
          />
          <div>
            <p className="body-emphasized-14pt">Dr. Jose Simmons</p>
            <p className="body-secondary-info-14pt">General Practitioner</p>
          </div>
        </div>
        <div className="w-[1px] bg-[--unnamed-color-ededed]"></div>
        <div className="flex items-center gap-3">
          <Icon icon="settings" />
          <Icon icon="more-vertical" />
        </div>
      </div>
    </header>
  )
}