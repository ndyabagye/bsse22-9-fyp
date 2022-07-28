import Search from "../components/Header/search";

export default function Header() {
  return (
    <div className="h-16 w-full bg-red-600 grid grid-cols-9">
        <div className="col-span-2 flex items-center">Car shop Logo</div>
        <div className="col-span-5 flex items-center"><Search/></div>
        <div className="col-span-2 flex items-center">Menu</div>
    </div>
  )
}
