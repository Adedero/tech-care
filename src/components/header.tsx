import Icon from "@/components/icon";
import Image from 'next/image';

const links : { id: number, name: string; icon: string; active: boolean }[] = [
  { id: 1, name: "Overview", icon: "home", active: false },
  { id: 2, name: "Patients", icon: "group", active: true },
  { id: 3, name: "Schedule", icon: "calendar", active: false },
  { id: 4, name: "Message", icon: "message", active: false },
  { id: 5, name: "Transactions", icon: "credit-card", active: false },
];

export default function Header() {
  return (
    <header className="h-fit bg-[--unnamed-color-ffffff] rounded-full px-6 py-2 flex items-center justify-between">
      <div>
        <Icon icon="logo" width="160" height="auto" />
      </div>

      <nav className="flex items-center gap-3">
        {links.map(link => (
          <div
            key={link.id}
            className={`body-emphasized-14pt cursor-pointer flex items-center gap-2 py-2 px-4 ${link.active ? 'bg-[--activestate_bg_1] rounded-full' : ''}`}>
            <Icon icon={link.icon} />
            <p>{link.name}</p>
          </div>
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